import React, { useEffect, useRef, useState } from "react";
import Peaks from "peaks.js";
import { map } from "lodash";
import "./WaveTab.scss";
import { listSegmentByAudio } from "../../api/segment";
import * as Tone from "tone";

import Konva from "konva";
import SegmentModal from "../../modals/SegmentModal";
import Player from "../Player/Player";
import { truncate2decimal } from "../../utils/truncate";

export default function WaveTab(props) {
  const { audio, onAddSegment, onClose, deleteSegment, updateSegment } = props;
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [peaksInstance, setPeaksInstance] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";

  useEffect(() => {
    if (deleteSegment) {
      console.log("Aqui borrar el segmento", deleteSegment);
      const segmentToDelete = deleteSegment.selected;
      console.log("segmentos", peaksInstance.segments.getSegments());
      peaksInstance.segments.removeById(segmentToDelete.id);
      console.log("segmentos", peaksInstance.segments.getSegments());
    }
  }, [deleteSegment]);

  useEffect(() => {
    return () => {
      console.log("Cerrado del Audio");
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

  useEffect(() => {
    console.log("cambio el audio");

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
        showPlayheadTime: false,
        createSegmentLabel: createSegmentLabel,
      };

      Peaks.init(options, function (err, peaks) {
        console.log("tag Audio", audioContainer);

        if (err) {
          console.error(err.message);
        }

        //peaksInstance = peaks;
        setPeaksInstance(peaks);

        peaks.on("zoomview.dblclick", addSegment);
        peaks.on("segments.dragend", dragEndSegment);

        // evento que se ejecuta al finalizar el drag
        //peaks.on("segments.dragstart", dragStartSegment);
        // evento que se ejecuta constantemente
        //peaks.on("segments.dragged", draggedSegment);

        loadSegments(peaks);
      });
    }
  }, [audio]);

  const loadSegments = (peaks) => {
    console.log("cargando segmentos");
    listSegmentByAudio(audio?.id).then((response) => {
      map(response?.data, (segment) => {
        console.log("segmento", segment);
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

  const addSegment = (currentTime) => {
    console.log("Add segment");

    setOpenSegmentModal(true);
  };

  const dragEndSegment = (segment, inMarker) => {
    console.log("draged End", segment, "inmarler", inMarker);
    updateSegment(segment);
  };

  return audio ? (
    <div className="wave-tab">
      <h1>{audio?.name}</h1>
      <div id="peaks-container">
        <div id="zoomview-container" ref={zoomviewContainer}></div>
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
