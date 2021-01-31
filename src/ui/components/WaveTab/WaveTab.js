import React, { useEffect, useRef } from "react";
import Peaks from "peaks.js";

import "./WaveTab.scss";
import { Button } from "semantic-ui-react";
import { getMaxId } from "../../api/segment";

export default function WaveTab(props) {
  const { audio, onAddSegment } = props;
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";
  let peaksInstance;

  const segmentClick = (segment) => {
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
  };

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
        pointMarkerColor: "#006eb0",
        showPlayheadTime: true,
      };

      Peaks.init(options, function (err, peaks) {
        console.log("tag Audio", audioContainer);

        if (err) {
          console.error(err.message);
        }

        peaksInstance = peaks;

        peaksInstance.on("zoomview.dblclick", addSegment);

        /*peaksInstance.on("segments.click", segmentClick);
        peaksInstance.on("overview.dblclick", addSegment);
        peaksInstance.on("player.seeked", playerSeeked);
        peaksInstance.on("player.timeupdate", playerSeeked);
        peaksInstance.on("segments.mouseenter", mouseEnter);
        peaksInstance.on("segments.mouseleave", mouseLeave);*/
      });
    }
  }, [audio]);

  const addSegment = (currentTime) => {
    console.log("Add segment");

    getMaxId()
      .then((response) => {
        console.log("newId", response);

        const newIdToAdd = response.data.segmentId + 1;

        peaksInstance.segments.add({
          id: newIdToAdd,
          startTime: peaksInstance.player.getCurrentTime(),
          endTime: peaksInstance.player.getCurrentTime() + 5,
          labelText: "Test segment ",
          editable: true,
        });

        onAddSegment(peaksInstance.segments.getSegment(newIdToAdd));
      })
      .catch((err) => {
        console.log("error en segmento", err);
      });
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
        <Button onClick={() => addSegment()}>Agregar Segmento</Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
