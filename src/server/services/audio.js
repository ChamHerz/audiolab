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

const audioService = {
  findOne: findOneService,
};

module.exports = {
  audioService,
};
