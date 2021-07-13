import { createDataAudioById } from "../api/audio.js";

export const runner = (oneAudio) => {
  return new Promise((resolve, reject) => {
    try {
      const child_process = window.require("child_process");
      const { spawn } = child_process;

      const filename = oneAudio.name.split(".").slice(0, -1).join(".");

      let child = spawn(
        "audio\\audiowaveform.exe",
        ["-i", oneAudio.path, "-o", ".\\data\\" + filename + ".dat", "-b", "8"],
        { detached: true, stdio: ["ignore", "ignore", "ignore"] }
      );

      console.log("creado de spawn", child);

      child.unref();

      /*child.stderr.on("data", function (data) {
        console.log(`stderr: ${data}`);
      });*/

      /*child.on("close", function (data) {
        console.log(`Terminado: ${data}`);
        resolve(oneAudio);
      });*/
    } catch (error) {
      console.log("Se produjo un error");
      console.log(error);
      reject(`Fallo en creacion .data`);
    }
  });
};
