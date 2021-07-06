const { Ipp } = require("../sequelize");

async function findOneService(ippId) {
  let oneIpp = null;
  await Ipp.findAll({
    raw: true,
    where: {
      id: ippId,
    },
  })
    .then((ipp) => {
      oneIpp = ipp[0];
    })
    .catch((err) => {
      oneIpp = null;
    });
  return oneIpp;
}

const ippService = {
  findOne: findOneService,
};

module.exports = {
  ippService,
};
