const { Segment } = require("../sequelize");
const { audioService } = require("../services/audio");

async function newSegment(req, res) {
  const segment = new Segment();

  const { labelText, startTime, endTime, color, audioId } = req.body;

  if (!audioId) {
    res.status(404).send({ message: "audioId no puede ser vacio" });
    return;
  }

  const audio = await audioService.findOne(audioId);

  if (!audio) {
    res.status(404).send({ message: "audioId no encontrado" });
    return;
  }

  segment.labelText = labelText;
  segment.startTime = startTime;
  segment.endTime = endTime;
  segment.color = color;
  segment.deleted = false;
  segment.id_audio = audio.id;

  if (!labelText) {
    res.status(404).send({ message: "El labelText no puede ser vacio" });
  } else if (!startTime) {
    res.status(404).send({ message: "El startTime no puede ser vacio" });
  } else if (!endTime) {
    res.status(404).send({ message: "El endTime no puede ser vacio" });
  } else if (!color) {
    res.status(404).send({ message: "El color no puede ser vacio" });
  } else {
    Segment.create(segment.dataValues)
      .then((newSegment) => res.status(200).send(newSegment))
      .catch((err) => {
        if (err.errors) {
          res.status(500).send({ message: "Error en la tabla Segments" });
        }
      });
  }
}

module.exports = {
  newSegment,
};
