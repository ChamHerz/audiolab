const { Project } = require("../sequelize");
let _ = require("lodash");

function newProject(req, res) {
  const project = new Project();

  const { name, description } = req.body;
  project.name = name;
  project.description = description;

  if (!name) {
    res.status(404).send({ message: "El nombre es obrigatorio" });
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

module.exports = {
  newProject,
};
