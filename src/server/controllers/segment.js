const { Segment } = require("../sequelize");
const { audioService } = require("../services/audio");
const { segmentService } = require("../services/segment");

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

async function getMaxId(req, res) {
  const segment = await segmentService.getMaxId();

  if (segment) {
    res.status(200).send({ segmentId: segment });
  } else {
    res.status(200).send({ segmentId: 0 });
  }
}

function listSegmentByAudioId(req, res) {
  const { audioId } = req.params;
  Segment.findAll({
    where: {
      id_audio: audioId,
      deleted: false,
    },
  })
    .then((segments) => res.status(200).send(segments))
    .catch((err) => {
      res.status(500).send({ message: "Error al cargar segmentos" });
    });
}

function deleteSegment(req, res) {
  const { segmentId } = req.params;
  const segmentIdInt = parseInt(segmentId);
  Segment.update(
    {
      deleted: true,
    },
    { where: { id: segmentIdInt } }
  )
    .then((segment) => res.status(200).send(segment))
    .catch((err) => {
      res.status(500).send({ message: "Error al borrar el segmento" });
    });
}

function updateSegment(req, res) {
  const { id, labelText, startTime, endTime, color } = req.body;
  const segmentId = parseInt(id);

  Segment.findByPk(segmentId).then((segment) => {
    return segment
      .update({
        labelText: labelText,
        startTime: startTime,
        endTime: endTime,
        color: color,
      })
      .then(() => {
        res.status(200).send(segment);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al editar el segmento" });
      });
  });
}

module.exports = {
  newSegment,
  getMaxId,
  listSegmentByAudioId,
  deleteSegment,
  updateSegment,
};
