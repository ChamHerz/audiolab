const { Segment } = require("../sequelize");
const Sequelize = require("sequelize");

async function getMaxIdService() {
  let id = 0;
  await Segment.max("id")
    .then((segment) => {
      id = segment.id;
    })
    .catch((err) => {
      console.log("error", err);
    });
  return id;
}

const segmentService = {
  getMaxId: getMaxIdService,
};

module.exports = {
  segmentService,
};
