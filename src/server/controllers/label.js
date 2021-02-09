const { Label } = require("../sequelize");
const { labelService } = require("../services/label");
const { audioService } = require("../services/audio");

async function getMaxId(req, res) {
  const label = await labelService.getMaxId();

  if (label) {
    res.status(200).send({ labelId: label });
  } else {
    res.status(200).send({ labelId: 0 });
  }
}

async function newLabel(req, res) {
  const label = new Label();

  const { labelText, time, color, audioId } = req.body;

  if (!audioId) {
    res.status(404).send({ message: "audioId no puede ser vacio" });
    return;
  }

  const audio = await audioService.findOne(audioId);

  if (!audio) {
    res.status(404).send({ message: "audioId no encontrado" });
    return;
  }

  label.labelText = labelText;
  label.time = time;
  label.color = color;
  label.deleted = false;
  label.id_audio = audio.id;

  if (!labelText) {
    res.status(404).send({ message: "El labelText no puede ser vacio" });
  } else if (!time) {
    res.status(404).send({ message: "El time no puede ser vacio" });
  } else if (!color) {
    res.status(404).send({ message: "El color no puede ser vacio" });
  } else {
    Label.create(label.dataValues)
      .then((newLabel) => res.status(200).send(newLabel))
      .catch((err) => {
        console.log(err);
        if (err.errors) {
          res.status(500).send({ message: "Error en la tabla Labels" });
        }
      });
  }
}

function listLabelByAudioId(req, res) {
  const { audioId } = req.params;
  Label.findAll({
    where: {
      id_audio: audioId,
      deleted: false,
    },
  })
    .then((labels) => res.status(200).send(labels))
    .catch((err) => {
      res.status(500).send({ message: "Error al cargar etiquetas" });
    });
}

function deleteLabel(req, res) {
  const { labelId } = req.params;
  const labelIdInt = parseInt(labelId);
  Label.update(
    {
      deleted: true,
    },
    { where: { id: labelIdInt } }
  )
    .then((label) => res.status(200).send(label))
    .catch((err) => {
      res.status(500).send({ message: "Error al borrar la etiqueta" });
    });
}

function updateLabel(req, res) {
  const { id, labelText, time, color } = req.body;
  const labelId = parseInt(id);

  Label.findByPk(labelId).then((label) => {
    return label
      .update({
        labelText: labelText,
        time: time,
        color: color,
      })
      .then(() => {
        res.status(200).send(label);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al editar la etiqueta" });
      });
  });
}

module.exports = {
  getMaxId,
  newLabel,
  listLabelByAudioId,
  deleteLabel,
  updateLabel,
};
