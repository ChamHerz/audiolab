import { createDataAudioById } from "../api/audio.js";

export const runner = (oneAudio) => {
  return new Promise((resolve, reject) => {
    try {
      const child_process = window.require("child_process");
      const { spawn } = child_process;

      console.log("oneAudio", oneAudio);

      const filename = oneAudio.name.split(".").slice(0, -1).join(".");

      //let child = spawn("audio\\test.bat", { shell: true });
      let child = spawn(
        "audio\\audiowaveform.exe",
        [
          "-i",
          oneAudio.path,
          "-o",
          "public\\data\\" + filename + ".dat",
          "-b",
          "8",
        ],
        { shell: false }
      );
      //let child = spawn("audio\\test.bat", { });

      child.stderr.on("data", function (data) {
        console.log(`stderr: ${data}`);
      });

      child.on("exit", function (data) {
        console.log(`Terminado: ${data}`);
        createDataAudioById(oneAudio.id)
          .then((response) => {
            resolve(`data audio creado!`);
          })
          .catch((error) => {
            reject(`Fallo en base: ${error}`);
          });
      });
    } catch (error) {
      console.log("Se produjo un error");
      console.log(error);
      reject(`Fallo en creacion .data`);
    }
  });
};
