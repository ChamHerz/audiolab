import React, { useEffect, useRef, useState } from "react";
import Peaks from "peaks.js";
import { map } from "lodash";

import "./WaveTab.scss";
import { getMaxId, listSegmentByAudio } from "../../api/segment";

import Konva from "konva";
import SegmentModal from "../../modals/SegmentModal";

export default function WaveTab(props) {
  const { audio, onAddSegment, onClose, deleteSegment, updateSegment } = props;
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [peaksInstance, setPeaksInstance] = useState(null);
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";
  /*let peaksInstance;*/

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

  /*const segmentClick = (segment) => {
    console.log("segment click", segment);
  };

  const mouseEnter = (segment) => {
    console.log("SegmentEnter", segment);
  };

  const mouseLeave = (segment) => {
    console.log("SegmentLeave", segment);
  };

  const zoomviewDblClick = (time) => {
    console.log("zoomviewDblClick", time);
  };

  const playerSeeked = (time) => {
    console.log("playerSeeked", time);
  };

  const timeUpdate = (time) => {
    console.log("timeUpdate", time);
  };*/

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

      //console.log("audio file:", audio.path.replace(":", ""));

      const options = {
        containers: {
          zoomview: zoomviewContainer.current,
          overview: overviewContainer.current,
        },
        mediaElement: audioContainer.current,
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

        /*peaksInstance.on("segments.click", segmentClick);
        peaksInstance.on("overview.dblclick", addSegment);
        peaksInstance.on("player.seeked", playerSeeked);
        peaksInstance.on("player.timeupdate", playerSeeked);
        peaksInstance.on("segments.mouseenter", mouseEnter);
        peaksInstance.on("segments.mouseleave", mouseLeave);*/
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
        <audio id="audio" controls="controls" ref={audioContainer}>
          <source src={audio.path} type={audio.type} />
          {/*<source src={soundOgg} type="audio/ogg" />*/}
        </audio>
        {peaksInstance ? (
          <SegmentModal
            openSegmentModal={openSegmentModal}
            setOpenSegmentModal={setOpenSegmentModal}
            peaks={peaksInstance}
            onAddSegment={onAddSegment}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
