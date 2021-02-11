const { Segment } = require("../sequelize");

async function getMaxIdService() {
  let oneSegment = null;
  await Segment.max("id")
    .then((segment) => {
      if (segment) {
        oneSegment = segment;
      } else {
        oneSegment = null;
      }
    })
    .catch((err) => {
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
