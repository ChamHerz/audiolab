const { Audio } = require("../sequelize");
const { Interlocutor } = require("../sequelize");
let _ = require("lodash");
const { projectService } = require("../services/project");
const { audioService } = require("../services/audio");

async function newAudio(req, res) {
  const audio = new Audio();

  const { projectId, name, path, size, type, lastModifiedDate } = req.body;

  if (!projectId) {
    res.status(404).send({ message: "projectId no puede ser vacio" });
    return;
  }

  const project = await projectService.findOne(projectId);

  if (!project) {
    res.status(404).send({ message: "projectId no encontrado" });
    return;
  }

  audio.name = name;
  audio.path = path;
  audio.size = size;
  audio.type = type;
  audio.deleted = false;
  audio.hasData = false;
  audio.lastModifiedDate = lastModifiedDate;
  audio.id_project = project.id;

  if (!name) {
    res.status(404).send({ message: "El nombre es obligatorio" });
  } else if (!size) {
    res.status(404).send({ message: "El tamaño no puede ser vacio" });
  } else {
    Audio.create(audio.dataValues)
      .then((newAudio) => res.status(200).send(newAudio))
      .catch((err) => {
        if (err.errors) {
          res.status(500).send({ message: "Error en la tabla audio" });
        }
      });
  }
}

function listAudio(req, res) {
  Audio.findAll({ attributes: ["id", "name", "size"] })
    .then((audios) => res.status(200).send(audios))
    .catch((err) => {
      res.status(500).send({ message: "Error al cargar audios" });
    });
}

function listAudioByProjectId(req, res) {
  const { projectId } = req.params;
  Audio.findAll({
    where: {
      id_project: projectId,
      deleted: false,
    },
  })
    .then((audios) => res.status(200).send(audios))
    .catch((err) => {
      res.status(500).send({ message: "Error al cargar audios" });
    });
}

function deleteAudio(req, res) {
  const { audioId } = req.params;
  const audioIdInt = parseInt(audioId);
  Audio.update(
    {
      deleted: true,
    },
    {
      where: { id: audioIdInt },
    }
  )
    .then((audio) => res.status(200).send(audio))
    .catch((err) => {
      res.status(500).send({ message: "Erro al borrar audios" });
    });
}

function createDataAudio(req, res) {
  const { audioId } = req.params;
  const audioIdInt = parseInt(audioId);
  Audio.update(
    {
      hasData: true,
    },
    {
      where: { id: audioIdInt },
    }
  )
    .then((audio) => res.status(200).send(audio))
    .catch((err) => {
      res.status(500).send({ message: "Erro al setear hasData" });
    });
}

async function addInterlocutorToAudio(req, res) {
  const { audioId } = req.params;

  const audio = await audioService.findOne(audioId);

  if (!audio) {
    res.status(404).send({ message: "audioId no encontrado" });
    return;
  }

  console.log("AUDIO ENCONTRADO", audio);

  console.log("BODY", req.body);
  const { id } = req.body;
  const interlocutorId = parseInt(id);

  Audio.findByPk(audioId).then((audio) => {
    return Interlocutor.findByPk(interlocutorId).then((interlocutor) => {
      if (!interlocutor) {
        console.log("NO SE ENCONTRO");
        res.status(404).send({ message: "No se encontro el interlocutor" });
        return;
      }

      console.log("ENCONTRO!!!");
      Audio.addInterlocutor(interlocutor);
      res.status(200).send(audio);
    });
  });
}

module.exports = {
  newAudio,
  listAudio,
  listAudioByProjectId,
  deleteAudio,
  createDataAudio,
  addInterlocutorToAudio,
};
