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
  }
}

module.exports = {
  newIpp,
};
