import React, { useEffect, useRef } from "react";
import Peaks from "peaks.js";

import "./WaveTab.scss";
import { Button } from "semantic-ui-react";

export default function WaveTab(props) {
  const { audio, onAddSegment } = props;
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";
  let peaksInstance;

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
      });
    }
  }, [audio]);

  const addSegment = () => {
    console.log("Add segment");
    peaksInstance.segments.add({
      startTime: peaksInstance.player.getCurrentTime(),
      endTime: peaksInstance.player.getCurrentTime() + 10,
      labelText: "Test segment ",
      editable: true,
      id: "seg01",
    });

    onAddSegment(peaksInstance.segments.getSegment("seg01"));
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
