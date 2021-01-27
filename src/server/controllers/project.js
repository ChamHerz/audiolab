const { Project } = require("../sequelize");
let _ = require("lodash");

function newProject(req, res) {
  const project = new Project();

  const { name, description } = req.body;
  project.name = name;
  project.description = description;

  if (!name) {
    res.status(404).send({ message: "El nombre es obligatorio" });
  } else {
    Project.create(project.dataValues)
      .then((newProject) => res.status(200).send(newProject))
      .catch((err) => {
        if (err.errors) {
          if (_.some(err.errors, { message: "name must be unique" })) {
            res
              .status(500)
              .send({ message: "Ya existe un proyecto con el mismo nombre" });
          } else {
            res.status(500).send({ message: "Error en la base" });
          }
        }
      });
  }
}

function listProject(req, res) {
  Project.findAll({ attributes: ["id", "name", "description"] })
    .then((projects) => res.status(200).send(projects))
    .catch((err) => {
      // TIRA ERROR AL NO ECONTRAR LA TABLA, ESTO NO VA A PASAR CUANDO YA NO SE AUTOCREE LA BASE
      //console.log("Error al cargar proyectos");
      //console.log(err);
      res.status(500).send({ message: "Error al cargar proyectos" });
    });
}

module.exports = {
  newProject,
  listProject,
};
