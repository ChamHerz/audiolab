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

module.exports = {
  newIpp,
  listIpp,
};
