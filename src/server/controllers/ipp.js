const { Ipp } = require("../sequelize");

function newIpp(req, res) {
  const ipp = new Ipp();
  const { processNumber, startDate, functionalUnit, court, crime } = req.body;

  ipp.processNumber = processNumber;
  ipp.startDate = startDate;
  ipp.functionalUnit = functionalUnit;
  ipp.court = court;
  ipp.crime = crime;
  ipp.isDeleted = false;

  if (!processNumber) {
    res.status(404).send({ message: "El número de proceso es obligatorio" });
  } else {
    console.log("add ipp,", ipp.dataValues);
    Ipp.create(ipp.dataValues)
      .then((newIpp) => res.status(200).send(newIpp))
      .catch((err) => {
        if (err.errors) {
          if (_.some(err.errors, { message: "processNumber must be unique" })) {
            res
              .status(500)
              .send({ message: "Ya existe un ipp con ese número." });
          } else {
            res.status(500).send({ message: "Error en la base." });
          }
        }
      });
  }
}

function listIpp(req, res) {
  Ipp.findAll({
    attributes: [
      "id",
      "processNumber",
      "startDate",
      "functionalUnit",
      "court",
      "crime",
      "id_project",
    ],
    where: {
      isDeleted: 0,
    },
  })
    .then((ipp) => res.status(200).send(ipp))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error al cargar ipp" });
    });
}

function deleteIpp(req, res) {
  const ipp = new Ipp();

  const { id } = req.body;
  ipp.id = id;

  Ipp.update(
    { isDeleted: 1 },
    {
      where: {
        id: ipp.id,
      },
    }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.status(500).send({ message: "Error al borrar la ipp" });
    });
}

function updateIpp(req, res) {
  const {
    id,
    processNumber,
    startDate,
    functionalUnit,
    court,
    crime,
  } = req.body;
  const ippId = parseInt(id);

  Ipp.findByPk(ippId).then((ipp) => {
    return ipp
      .update({
        processNumber: processNumber,
        startDate: startDate,
        functionalUnit: functionalUnit,
        court: court,
        crime: crime,
      })
      .then(() => {
        res.status(200).send(ipp);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al editar la ipp" });
      });
  });
}

function updateProjectIpp(req, res) {
  const { id_project } = req.body;
  const ippId = parseInt(id);

  Ipp.findByPk(ippId).then((ipp) => {
    return ipp
      .update({
        id_project: id_project
      })
      .then(() => {
        res.status(200).send(ipp)
      })
      .catch((err) => {
         res.status(500).send({ message: "Error al asignar proyecto a la IPP"})
      });
  });
}

module.exports = {
  newIpp,
  listIpp,
  deleteIpp,
  updateIpp,
  updateProjectIpp
};
