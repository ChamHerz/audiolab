const { Project } = require("../sequelize");
const { Ipp } = require("../sequelize.js");

async function findOneService(projectId) {
  let oneProject = null;
  await Project.findAll({
    raw: true,
    where: {
      id: projectId,
    },
  })
    .then((project) => {
      oneProject = project[0];
      /*console.log("encontre", project[0].dataValues);
      return project[0].dataValues;*/
    })
    .catch((err) => {
      oneProject = null;
    });
  return oneProject;
}

async function findOneCompleteService(projectId) {
  let oneProject = null;
  await Project.findAll({
    include: [
      {
        model: Ipp,
        as: "ipps",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ],
    where: {
      id: projectId,
    },
  })
    .then((project) => {
      oneProject = project[0];
    })
    .catch((err) => {
      oneProject = null;
    });
  return oneProject;
}

const projectService = {
  findOne: findOneService,
  findOneComplete: findOneCompleteService,
};

module.exports = {
  projectService,
};
