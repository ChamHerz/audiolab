const { Audio } = require("../sequelize");

async function findOneService(audioId) {
  let oneAudio = null;
  await Audio.findAll({
    raw: true,
    where: {
      id: audioId,
    },
  })
    .then((audio) => {
      oneAudio = audio[0];
    })
    .catch((err) => {
      oneAudio = null;
    });
  return oneAudio;
}

async function findAllByProjectService(projectId) {
  let audioArray = [];
  await Audio.findAll({
    where: {
      id_project: projectId,
      deleted: false,
    },
  })
    .then((response) => {
      console.log("findAllByProjectService", response);
      audioArray = response;
    })
    .catch((err) => {
      console.log("error", err);
    });
  return audioArray;
}

const audioService = {
  findOne: findOneService,
  findAllByProject: findAllByProjectService,
};

module.exports = {
  audioService,
};
