const { Audio } = require("../sequelize");
let _ = require("lodash");
const { projectService } = require("../services/project");

async function newAudio(req, res) {
  const audio = new Audio();

  const { projectId, name, path, size, type, lastModifiedDate } = req.body;

  if (!projectId) {
    res.status(404).send({ message: "projectId no puede ser vacio" });
    return;
  }

  project = await projectService.findOne(projectId);

  console.log("projecto encontrado", project);

  if (!project) {
    res.status(404).send({ message: "projectId no encontrado" });
    return;
  }

  audio.name = name;
  audio.path = path;
  audio.size = size;
  audio.type = type;
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
          console.log(err);
          res.status(500).send({ message: "Error en la base" });
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

module.exports = {
  newAudio,
  listAudio,
};
