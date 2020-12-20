import React, { useEffect, useRef } from "react";
import Peaks from "peaks.js";

import "./WaveTab.scss";
import soundMp3 from "./TOL_6min_720p_download.mp3";
import soundOgg from "./TOL_6min_720p_download.ogg";
import sound2Mp3 from "./Power_Shutoff.mp3";

export default function WaveTab(props) {
  const { audio } = props;
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);

  console.log("onda", audio);

  useEffect(() => {
    console.log("cambio el audio");

    Peaks.init(options, function (err, peaks) {
      console.log("tag Audio", audioContainer);

      if (err) {
        console.error(err.message);
      }
    });
  }, [audio]);

  const onClick = () => {
    console.log("ok");
  };

  const options = {
    containers: {
      zoomview: zoomviewContainer.current,
      overview: overviewContainer.current,
    },
    mediaElement: audioContainer.current,
    dataUri: {
      arraybuffer: "Power_Shutoff.dat",
      json: "Power_Shutoff.json",
    },
    keyboard: true,
    pointMarkerColor: "#006eb0",
    showPlayheadTime: true,
  };

  return (
    <div className="wave-tab">
      <h1>{audio?.name}</h1>
      <div id="peaks-container">
        <div id="zoomview-container" ref={zoomviewContainer}></div>
        <div id="overview-container" ref={overviewContainer}></div>
      </div>

      <div id="demo-controls">
        <audio id="audio" controls="controls" ref={audioContainer}>
          <source src={sound2Mp3} type="audio/mpeg" />
          {/*<source src={soundOgg} type="audio/ogg" />*/}
        </audio>
      </div>
    </div>
  );
}
