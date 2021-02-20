export const setFullScreen = () => {
  return new Promise((resolve, reject) => {
    try {
      const { remote } = window.require("electron");
      console.log(remote);
      const dialog = remote.dialog;

      console.log(remote.getCurrentWindow());

      const currentWindow = remote.getCurrentWindow();

      currentWindow.setFullScreen(true);

      /*let result = dialog.showOpenDialogSync(remote.getCurrentWindow(), {
        properties: ["openFile", "multiSelections"],
      });
      if (typeof result === "object") {
        console.log("Selected file paths:");
        console.log(result);
      }*/

      //const window = remote.getCurrentWindow();
      //console.log(window);
      //window.setFullScreen(true);
    } catch (error) {
      console.log("Se produjo un error");
      console.log(error);
      reject(`Fallo en creacion .data`);
    }
  });
};
