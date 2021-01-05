import React, { useEffect, useRef } from "react";
import Peaks from "peaks.js";

import "./WaveTab.scss";

export default function WaveTab(props) {
  const { audio } = props;
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";

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
      });
    }
  }, [audio]);

  const onClick = () => {
    console.log("ok");
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
      </div>
    </div>
  ) : (
    <div></div>
  );
}
