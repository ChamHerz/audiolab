const { Label } = require("../sequelize");

async function getMaxIdService() {
  let oneLabel = null;
  await Label.max("id")
    .then((label) => {
      if (label) {
        oneLabel = label;
      } else {
        oneLabel = null;
      }
    })
    .catch((err) => {
      oneLabel = null;
    });
  return oneLabel;
}

const labelService = {
  getMaxId: getMaxIdService,
};

module.exports = {
  labelService,
};
