import React, { useEffect, useRef, useState } from "react";
import Peaks from "peaks.js";
import { map } from "lodash";
import { listSegmentByAudio } from "../../api/segment";
import * as Tone from "tone";
import Konva from "konva";
import SegmentModal from "../../modals/SegmentModal";
import Player from "../Player/Player";
import { truncate2decimal } from "../../utils/truncate";
import LabelModal from "../../modals/LabelModal";
import { listLabelByAudio } from "../../api/label";
import path from "path";

import "./WaveTab.scss";
import InterlocutorWave from "../Interlocutors/InterlocutorWave/InterlocutorWave";
import { Button } from "semantic-ui-react";

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
    onDoubleClickSegment,
    onDoubleClickLabel,
    playSegment,
    removeAudio,
    peaksInstance,
    setPeaksInstance,
  } = props;
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [segmentToUpdate, setSegmentToUpdate] = useState(null);
  const [openLabelModal, setOpenLabelModal] = useState(false);
  const [labelToUpdate, setLabelToUpdate] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPeaks, setCurrentPeaks] = useState(null);
  let zoomviewContainer = React.createRef();
  let overviewContainer = useRef(null);
  let filename = "";
  let player = null;
  let p;

  useEffect(() => {
    if (removeAudio) {
      console.log("tengo que remover el audio");
      console.log("peajgs", peaksInstance);
      //player.destroy();
      //peaksInstance.destroy();
      //p.destroy();
      //p = null;
    }
  }, [removeAudio]);

  useEffect(() => {
    if (onDoubleClickLabel) {
      console.log("Mostrar modal etiqueta", onDoubleClickLabel);
      setLabelToUpdate(onDoubleClickLabel);
      setOpenLabelModal(true);
    }
  }, [onDoubleClickLabel]);

  useEffect(() => {
    if (onDoubleClickSegment) {
      setSegmentToUpdate(onDoubleClickSegment);
      setOpenSegmentModal(true);
    }
  }, [onDoubleClickSegment]);

  useEffect(() => {
    if (deleteSegment) {
      const segmentToDelete = deleteSegment.selected;
      peaksInstance.segments.removeById(segmentToDelete.id);
    }
  }, [deleteSegment]);

  useEffect(() => {
    if (playSegment) {
      const segmentToPlay = playSegment.selected;
      const peakSegment = peaksInstance.segments.getSegment(playSegment.id);
      peaksInstance.player.playSegment(segmentToPlay);
    }
  }, [playSegment]);

  useEffect(() => {
    if (deleteLabel) {
      const labelToDelete = deleteLabel.selected;
      peaksInstance.points.removeById(labelToDelete.id);
    }
  }, [deleteLabel]);

  useEffect(() => {
    return () => {
      console.log("se cerro  v  1");

      console.log("peaks", peaksInstance);

      //player.destroy();
      //setCurrentTime(0);
      //console.log("peak", peaksInstance);
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

      //console.log("tone, ", Tone.context.dispose());

      player = {
        externalPlayer: new Tone.Player({
          url: audio.path,
        }).toDestination(),
        eventEmitter: null,

        init: function (eventEmitter) {
          this.eventEmitter = eventEmitter;

          this.externalPlayer.sync();
          this.externalPlayer.start();

          //Tone.connectSeries(this.externalPlayer);

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
          console.log("disponsesssss");
        },
        play: function () {
          console.log("reproduciendo");
          console.log(Tone.Transport);
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

      const options = {
        containers: {
          zoomview: zoomviewContainer.current,
          overview: overviewContainer.current,
        },
        /*mediaElement: audioContainer.current,*/
        player: player,
        //ESTA ES EL PATH PARA PRODUCCION
        /*dataUri: {
          arraybuffer: "../../../data/" + filename + ".dat",
        },*/
        dataUri: {
          arraybuffer: `file://${path.join(
            __dirname,
            "/data/" + filename + ".dat"
          )}`,
        },
        keyboard: true,
        showPlayheadTime: true,
        emitCueEvents: true,
        zoomLevels: [512, 1024, 2048, 4096, 8192, 16384],
        zoomWaveformColor: "rgba(0, 225, 20, 1)", //color de onda superior
        overviewWaveformColor: "rgba(0,0,0,0.5)", //color de onda inferior
        overviewHighlightColor: "white", //color rectangulo inferior (zoom)
        playheadColor: "rgba(0, 0, 0, 1)", //color del play cabezal
        playheadTextColor: "#fff", //texto en el cabeza
        axisGridlineColor: "#fff", //color de la grilla
        axisLabelColor: "#aaa", //numeros de la grilla
        createSegmentLabel: createSegmentLabel,
      };

      console.log("peaks en p", p);

      if (!peaksInstance) {
        p = Peaks.init(options, function (err, peaks) {
          if (err) {
            console.error(err.message);
          }

          //peaksInstance = peaks;
          //setPeaksInstance(peaks);

          peaks.on("zoomview.dblclick", addSegment);
          peaks.on("segments.dragend", dragEndSegment);
          peaks.on("points.dragend", dragEndPoint);
          peaks.on("player.seeked", playerSeeked);

          peaks.player.seek(0);

          // evento que se ejecuta al finalizar el drag
          //peaks.on("segments.dragstart", dragStartSegment);
          // evento que se ejecuta constantemente
          //peaks.on("segments.dragged", draggedSegment);

          loadSegments(peaks);
          loadLabels(peaks);
        });
      }
    }
    console.log("ppppp", p);
    setPeaksInstance(p);
    setCurrentPeaks(p);
  }, [audio]);

  const onDestroy = () => {
    console.log(" aqui testa el peaks", currentPeaks);
    //peaksInstance.destroy();
    currentPeaks.destroy();
    //p.destroy();
    //setPeaksInstance(null);
  };

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
    setSegmentToUpdate(null);
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
      setLabelToUpdate(null);
      setOpenLabelModal(true);
    }
  };

  return audio ? (
    <div className="wave-tab">
      <InterlocutorWave audio={audio} />
      <div id="peaks-container">
        <div
          id="zoomview-container"
          ref={zoomviewContainer}
          onContextMenu={onContextMenu}
          tabIndex="0"
        ></div>
        <div id="overview-container" ref={overviewContainer}></div>
      </div>

      <Button onClick={() => onDestroy()}>Destruir</Button>

      <div id="demo-controls">
        {currentPeaks ? (
          <>
            <Player
              playing={playing}
              currentTime={currentTime}
              duration={duration}
              peaksInstance={currentPeaks}
            />
            <SegmentModal
              openSegmentModal={openSegmentModal}
              segmentToUpdate={segmentToUpdate}
              setOpenSegmentModal={setOpenSegmentModal}
              peaks={currentPeaks}
              onAddSegment={onAddSegment}
              updateSegment={updateSegment}
            />
            <LabelModal
              openLabelModal={openLabelModal}
              labelToUpdate={labelToUpdate}
              setOpenLabelModal={setOpenLabelModal}
              peaks={currentPeaks}
              onAddLabel={onAddLabel}
              updateLabel={updateLabel}
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
