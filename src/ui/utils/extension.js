export const extension = (filename, extension) => {
  return filename.split(".").slice(0, -1).join(".");
};
