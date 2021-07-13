const { Ipp } = require("../sequelize");
const { Project } = require("../sequelize");

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

async function findOneCompleteService(ippId) {
  let oneIpp = null;
  await Ipp.findByPk(ippId, {
    include: [
      {
        model: Project,
        as: "projects",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ],
  })
    .then((ipp) => {
      oneIpp = ipp.dataValues;
    })
    .catch((err) => {
      console.log("error", err);
    });
  return oneIpp;
}

const ippService = {
  findOne: findOneService,
  findOneComplete: findOneCompleteService,
};

module.exports = {
  ippService,
};
