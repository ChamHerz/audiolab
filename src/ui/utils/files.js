const fs = window.require("fs");

export const copyFile = (source, target) => {
  fs.copyFile(source, "images\\" + target, (err) => {
    if (err) throw err;
    console.log("se copio el archivo");
  });
};
