import React, { useEffect, useRef, useState } from "react";
import Peaks from "peaks.js";
import { map } from "lodash";
import { listSegmentByAudio } from "../../api/segment";
import * as Tone from "tone";
import Konva from "konva";
import SegmentModal from "../../modals/SegmentModal";
import Player from "../Player/Player";
import { truncate2decimal } from "../../utils/truncate";

import "./WaveTab.scss";
import LabelModal from "../../modals/LabelModal";
import { listLabelByAudio } from "../../api/label";

export default function WaveTab(props) {
  const {
    audio,
    onAddSegment,
    onClose,
    deleteSegment,
    deleteLabel,
    updateSegment,
    updateLabel,
    onAddLabel,
  } = props;
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [openLabelModal, setOpenLabelModal] = useState(false);
  const [peaksInstance, setPeaksInstance] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  let zoomviewContainer = React.createRef();
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";

  useEffect(() => {
    if (deleteSegment) {
      const segmentToDelete = deleteSegment.selected;
      peaksInstance.segments.removeById(segmentToDelete.id);
    }
  }, [deleteSegment]);

  useEffect(() => {
    if (deleteLabel) {
      const labelToDelete = deleteLabel.selected;
      peaksInstance.points.removeById(labelToDelete.id);
    }
  }, [deleteLabel]);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, []);

  function createSegmentLabel(options) {
    if (options.view === "overview") {
      return null;
    }

    let label = new Konva.Label({
      x: 12,
      y: 16,
    });

    label.add(
      new Konva.Tag({
        fill: "black",
        pointerDirection: "none",
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowOpacity: 0.3,
      })
    );

    label.add(
      new Konva.Text({
        text: options.segment.labelText,
        fontSize: 14,
        fontFamily: "Calibri",
        fill: "white",
        padding: 8,
      })
    );

    return label;
  }

  const playerSeeked = (numberTime) => {
    //console.log("click", numberTime);
  };

  useEffect(() => {
    if (audio?.name) {
      filename = audio.name.split(".").slice(0, -1).join(".");

      const player = {
        externalPlayer: new Tone.Player({
          url: audio.path,
        }).toDestination(),
        eventEmitter: null,

        init: function (eventEmitter) {
          this.eventEmitter = eventEmitter;

          this.externalPlayer.sync();
          this.externalPlayer.start();

          Tone.connectSeries(this.externalPlayer, Tone.Master);

          eventEmitter.emit("player.canplay");

          Tone.Transport.scheduleRepeat(() => {
            let time = this.getCurrentTime();
            eventEmitter.emit("player.timeupdate", time);

            if (time >= this.getDuration()) {
              Tone.Transport.stop();
            }
          }, 0.25);
        },
        destroy: function () {
          Tone.context.dispose();
          this.externalPlayer = null;
          this.eventEmitter = null;
        },
        play: function () {
          setPlaying(true);
          Tone.Transport.start(Tone.now(), this.getCurrentTime());
          this.eventEmitter.emit("player.play", this.getCurrentTime());
        },
        pause: function () {
          setPlaying(false);
          Tone.Transport.pause();
          this.eventEmitter.emit("player.pause", this.getCurrentTime());
        },
        isPlaying: function () {
          return Tone.Transport.state === "started";
        },
        seek: function (time) {
          Tone.Transport.seconds = time;

          this.eventEmitter.emit("player.seeked", this.getCurrentTime());
          this.eventEmitter.emit("player.timeupdate", this.getCurrentTime());
        },

        isSeeking: function () {
          return false;
        },
        getCurrentTime: function () {
          setCurrentTime(
            truncate2decimal(
              this.externalPlayer.toSeconds(Tone.Transport.position)
            )
          );
          setDuration(truncate2decimal(this.externalPlayer.buffer.duration));
          return this.externalPlayer.toSeconds(Tone.Transport.position);
        },
        getDuration: function () {
          return this.externalPlayer.buffer.duration;
        },
      };

      /*
       * CustomPointMarker
       */

      function CustomPointMarker(options) {
        this._options = options;
      }

      CustomPointMarker.prototype.init = function (group) {
        this._group = group;

        this._label = new Konva.Label({
          x: 0.5,
          y: 0.5,
        });

        var handleWidth = 10;
        var handleHeight = 20;
        var handleX = -(handleWidth / 2) + 0.5; // Place in the middle of the marker

        if (this._options.draggable) {
          this._handle = new Konva.Rect({
            x: handleX,
            y: 0,
            width: handleWidth,
            height: handleHeight,
            fill: this._options.color,
          });
        }

        this._tag = new Konva.Tag({
          fill: this._options.color,
          stroke: this._options.color,
          strokeWidth: 1,
          pointerDirection: "down",
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: "round",
          shadowColor: "black",
          shadowBlur: 10,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowOpacity: 0.3,
        });

        this._label.add(this._tag);

        this._text = new Konva.Text({
          text: this._options.point.labelText,
          fontFamily: "Calibri",
          fontSize: 14,
          padding: 5,
          fill: "white",
        });

        this._label.add(this._text);

        // Vertical Line - create with default y and points, the real values
        // are set in fitToView().
        this._line = new Konva.Line({
          x: 0,
          y: 0,
          stroke: this._options.color,
          strokeWidth: 1,
        });

        group.add(this._label);
        group.add(this._line);

        this.fitToView();

        this.bindEventHandlers();
      };

      CustomPointMarker.prototype.bindEventHandlers = function () {
        var self = this;

        if (self._handle) {
          self._handle.on("mouseover touchstart", function () {
            console.log("entro");
            // Position text to the left of the marker
            self._time.setX(-24 - self._time.getWidth());
            self._time.show();
            self._options.layer.draw();
          });

          self._handle.on("mouseout touchend", function () {
            self._time.hide();
            self._options.layer.draw();
          });

          this._group.on("dragstart", function () {
            self._time.setX(-24 - self._time.getWidth());
            self._time.show();
            self._options.layer.draw();
          });

          this._group.on("dragend", function () {
            self._time.hide();
            self._options.layer.draw();
          });
        }
      };

      CustomPointMarker.prototype.fitToView = function () {
        var height = this._options.layer.getHeight();

        var labelHeight = this._text.height() + 2 * this._text.padding();
        var offsetTop = 14;
        var offsetBottom = 26;

        this._group.y(offsetTop + labelHeight + 0.5);

        this._line.points([
          0.5,
          0,
          0.5,
          height - labelHeight - offsetTop - offsetBottom,
        ]);
      };

      /*
       * SimplePointMarker
       */

      function SimplePointMarker(options) {
        this._options = options;
      }

      SimplePointMarker.prototype.init = function (group) {
        this._group = group;

        // Vertical Line - create with default y and points, the real values
        // are set in fitToView().
        this._line = new Konva.Line({
          x: 0,
          y: 0,
          stroke: this._options.color,
          strokeWidth: 1,
        });

        group.add(this._line);

        this.fitToView();
      };

      SimplePointMarker.prototype.fitToView = function () {
        var height = this._options.layer.getHeight();

        this._line.points([0.5, 0, 0.5, height]);
      };

      function createPointMarker(options) {
        if (options.view === "zoomview") {
          return new CustomPointMarker(options);
        } else {
          return new SimplePointMarker(options);
        }
      }

      const options = {
        containers: {
          zoomview: zoomviewContainer.current,
          overview: overviewContainer.current,
        },
        /*mediaElement: audioContainer.current,*/
        player: player,
        dataUri: {
          arraybuffer: "data/" + filename + ".dat",
        },
        keyboard: true,
        showPlayheadTime: true,
        emitCueEvents: true,
        zoomWaveformColor: "rgba(0, 225, 20, 1)", //color de onda superior
        overviewWaveformColor: "rgba(0,0,0,0.5)", //color de onda inferior
        overviewHighlightColor: "white", //color rectangulo inferior (zoom)
        playheadColor: "rgba(0, 0, 0, 1)", //color del play cabezal
        playheadTextColor: "#fff", //texto en el cabeza
        axisGridlineColor: "#fff", //color de la grilla
        axisLabelColor: "#aaa", //numeros de la grilla
        createSegmentLabel: createSegmentLabel,
        createPointMarker: createPointMarker,
      };

      Peaks.init(options, function (err, peaks) {
        if (err) {
          console.error(err.message);
        }

        //peaksInstance = peaks;
        setPeaksInstance(peaks);

        peaks.on("zoomview.dblclick", addSegment);
        peaks.on("segments.dragend", dragEndSegment);
        peaks.on("points.dragend", dragEndPoint);
        peaks.on("player.seeked", playerSeeked);

        // evento que se ejecuta al finalizar el drag
        //peaks.on("segments.dragstart", dragStartSegment);
        // evento que se ejecuta constantemente
        //peaks.on("segments.dragged", draggedSegment);

        loadSegments(peaks);
        loadLabels(peaks);
      });
    }
  }, [audio]);

  const loadSegments = (peaks) => {
    listSegmentByAudio(audio?.id).then((response) => {
      map(response?.data, (segment) => {
        peaks.segments.add({
          id: segment.id,
          startTime: segment.startTime,
          endTime: segment.endTime,
          labelText: segment.labelText,
          color: segment.color,
          editable: true,
        });
      });
    });
  };

  const loadLabels = (peaks) => {
    listLabelByAudio(audio?.id).then((response) => {
      map(response?.data, (label) => {
        peaks.points.add({
          id: label.id,
          time: label.time,
          labelText: label.labelText,
          color: label.color,
          editable: true,
        });
      });
    });
  };

  const addSegment = (currentTime) => {
    setOpenSegmentModal(true);
  };

  const dragEndSegment = (segment, inMarker) => {
    updateSegment(segment);
  };

  const dragEndPoint = (label) => {
    updateLabel(label);
  };

  const onContextMenu = (e) => {
    if (e.type === "contextmenu") {
      setOpenLabelModal(true);
    }
  };

  return audio ? (
    <div className="wave-tab">
      <h1>{audio?.name}</h1>
      <div id="peaks-container">
        <div
          id="zoomview-container"
          ref={zoomviewContainer}
          onContextMenu={onContextMenu}
          tabIndex="0"
        ></div>
        <div id="overview-container" ref={overviewContainer}></div>
      </div>

      <div id="demo-controls">
        <Player
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          peaksInstance={peaksInstance}
        />
        {peaksInstance ? (
          <>
            <SegmentModal
              openSegmentModal={openSegmentModal}
              setOpenSegmentModal={setOpenSegmentModal}
              peaks={peaksInstance}
              onAddSegment={onAddSegment}
            />
            <LabelModal
              openLabelModal={openLabelModal}
              setOpenLabelModal={setOpenLabelModal}
              peaks={peaksInstance}
              onAddLabel={onAddLabel}
            />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
