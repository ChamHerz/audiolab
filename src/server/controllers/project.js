const { Project, ProjectIpp } = require("../sequelize");
let _ = require("lodash");
const { projectService } = require("../services/project");
const { ippService } = require("../services/ipp");

function newProject(req, res) {
  const project = new Project();

  const { name, description } = req.body;
  project.name = name;
  project.description = description;
  project.deleted = false;

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
  Project.findAll({
    attributes: ["id", "name", "description"],
    where: {
      deleted: false,
    },
  })
    .then((projects) => res.status(200).send(projects))
    .catch((err) => {
      res.status(500).send({ message: "Error al cargar proyectos" });
    });
}

async function addIppToProject(req, res) {
  const { projectId } = req.params;
  const projectIdInt = parseInt(projectId);

  const project = await projectService.findOne(projectIdInt);

  if (!project) {
    res.status(404).send({ message: "projectId no encontrado" });
    return;
  }

  console.log("PROJECT ENCONTRADO", project);

  const { id } = req.body;
  const ipp = await ippService.findOne(id);

  if (!ipp) {
    res.status(404).send({ message: "ippId no encontrado" });
    return;
  }

  console.log("IPP ENCONTRADO", ipp);

  const projectIpp = {
    project_id: project.id,
    ipp_id: ipp.id,
  };

  const saveProjectIpp = await ProjectIpp.create(
    projectIpp,
    { w: 1 },
    { returning: true }
  );

  console.log("saveProjectIpp", saveProjectIpp);
  res.status(200).send(saveProjectIpp);
}

async function findAllByIpp(req, res) {
  const { id } = req.params;
  const ippId = parseInt(id);

  const ipp = await ippService.findOneComplete(ippId);
  console.log("ipp encontrada", ipp);

  if (!ipp) {
    res.status(404).send({ message: "ippId no encontrado" });
    return;
  }

  res.status(200).send(ipp);
}

async function deleteProject(req, res) {
  const { projectId } = req.params;
  const projectIdInt = parseInt(projectId);

  const projectToDelete = await projectService.findOne(projectIdInt);
  if (!projectToDelete) {
    res.status(404).send({ message: "Proyecto no encontrado" });
    return;
  }

  Project.update(
    {
      deleted: true,
    },
    {
      where: { id: projectIdInt },
    }
  )
    .then((project) => res.status(200).send(project))
    .catch((err) => {
      res.status(500).send({ message: "Erro al borra el proyecto" });
    });
}

module.exports = {
  newProject,
  listProject,
  addIppToProject,
  findAllByIpp,
  deleteProject,
};
