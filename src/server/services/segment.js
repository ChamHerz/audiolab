const { Segment } = require("../sequelize");
const { audioService } = require("../services/audio.js");
const { map } = require("lodash");

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

async function findAllByAudioService(audioId) {
  let segmentArray = [];
  await Segment.findAll({
    where: {
      id_audio: audioId,
      deleted: false,
    },
  })
    .then((response) => {
      segmentArray = response;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
  return segmentArray;
}

async function findAllByProjectService(projectId) {
  const segmentArray = [];

  const audios = await audioService.findAllByProject(projectId);

  for (const audio of audios) {
    const segments = await findAllByAudioService(audio.id);
    map(segments, (segment) => {
      segmentArray.push({ audio: audio, segment: segment });
    });
  }

  return segmentArray;
}

const segmentService = {
  getMaxId: getMaxIdService,
  findAllByAudio: findAllByAudioService,
  findAllByProject: findAllByProjectService,
};

module.exports = {
  segmentService,
};
