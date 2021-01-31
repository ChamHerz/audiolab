const { Segment } = require("../sequelize");

async function getMaxIdService() {
  let oneSegment = null;
  await Segment.max("id")
    .then((segment) => {
      console.log("SegmentoFind", segment);
      oneSegment = segment;
    })
    .catch((err) => {
      console.log("error", err);
      oneSegment = null;
    });
  return oneSegment;
}

const segmentService = {
  getMaxId: getMaxIdService,
};

module.exports = {
  segmentService,
};
