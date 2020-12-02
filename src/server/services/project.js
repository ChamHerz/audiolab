const { Project } = require("../sequelize");

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

const projectService = {
  findOne: findOneService,
};

module.exports = {
  projectService,
};
