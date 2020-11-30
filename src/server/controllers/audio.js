const { Audio } = require("../sequelize");
let _ = require("lodash");

function newAudio(req, res) {
  const audio = new Audio();

  const { name, size } = req.body;
  audio.name = name;
  audio.size = size;

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
