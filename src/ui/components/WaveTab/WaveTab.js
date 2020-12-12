import React, { useEffect, useRef } from "react";
import WaveformData from "waveform-data";

import "./WaveTab.scss";

export default function WaveTab(props) {
  const { audio } = props;
  const audioContext = new AudioContext();
  const canvas = useRef(null);
  let waveformData = null;

  console.log("onda", audio);

  useEffect(() => {
    console.log("cambio el audio");

    fetch("https://mimp3.info/mp3descargar/mqahbJ+j2ZCfm6OjaJykmKY/beky-g")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const options = {
          audio_context: audioContext,
          array_buffer: buffer,
          scale: 128,
        };

        return new Promise((resolve, reject) => {
          WaveformData.createFromAudio(options, (err, waveform) => {
            if (err) {
              reject(err);
            } else {
              resolve(waveform);
            }
          });
        });
      })
      .then((waveform) => {
        console.log(`Waveform has ${waveform.channels} channels`);
        console.log(`Waveform has length ${waveform.length} points`);

        drawWaveform(canvas, waveform);

        waveformData = waveform;
      });
  }, [audio]);

  const drawWaveform = (canvas, waveform) => {
    const ctx = canvas.current.getContext("2d");

    const scaleY = (amplitude, height) => {
      const range = 256;
      const offset = 128;

      return height - ((amplitude + offset) * height) / range;
    };

    ctx.beginPath();

    const channel = waveform.channel(0);

    // Loop forwards, drawing the upper half of the waveform
    let startY = 20;
    let endY = 20;
    for (let x = 0; x < waveform.length; x++) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      endY = channel.max_sample(x);
      ctx.lineTo(x, endY);
      ctx.stroke();

      //const val = channel.max_sample(x);
      //ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    // Loop backwards, drawing the lower half of the waveform
    for (let x = waveform.length - 1; x >= 0; x--) {
      const val = channel.min_sample(x);

      ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    //ctx.closePath();
    ctx.stroke();
    //ctx.fill();
  };

  const onClick = () => {
    console.log("ok");
    drawWaveform(canvas, waveformData);
  };

  return (
    <div className="wave-tab">
      <h1>{audio?.name}</h1>
      <div id="waveform-container">
        <canvas id="canvas" width="600" height="250" ref={canvas} />
        <input type="button" onClick={() => onClick()} value="Accion" />
      </div>
    </div>
  );
}
