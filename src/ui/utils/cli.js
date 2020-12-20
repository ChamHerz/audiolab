export const cli = () => {
  try {
    const child_process = window.require("child_process");
    const { spawn } = child_process;

    console.log("process", spawn);
    let cmd = "D:\\test.bat";
    let child = spawn(cmd);

    child.on("error", function (err) {
      console.log("error");
    });

    child.stdout.on("data", function (data) {
      console.log("OK");
    });

    /*const electron = window.require("electron");
    const { shell } = electron;
    const path = require("path");

    shell.openPath("D:\\test.bat");
    console.log("opath," + __dirname + "test.bat");*/
  } catch (error) {
    console.log(error);
  }
};
