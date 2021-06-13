const { Interlocutor } = require("../sequelize");
let _ = require("lodash");

function newInterlocutor(req, res) {
  const interlocutor = new Interlocutor();
  const { name, lastname, dni, alias, picture } = req.body;
  interlocutor.name = name;
  interlocutor.lastname = lastname;
  interlocutor.dni = dni;
  interlocutor.alias = alias;
  interlocutor.picture = picture;
  interlocutor.isDeleted = false;

  if (!alias) {
    res
      .status(404)
      .send({ message: "El alias del interlocutor es obligatorio." });
  } else {
    console.log("add interlocutor", interlocutor.dataValues);
    Interlocutor.create(interlocutor.dataValues)
      .then((newInterlocutor) => res.status(200).send(newInterlocutor))
      .catch((err) => {
        if (err.errors) {
          if (_.some(err.errors, { message: "dni must be unique" })) {
            res
              .status(500)
              .send({ message: "Ya existe un interlocutor con ese dni." });
          } else {
            res.status(500).send({ message: "Error en la base." });
          }
        }
      });
  }
}

function listInterlocutor(req, res) {
  Interlocutor.findAll({
    attributes: [
      "id",
      "name",
      "lastname",
      "dni",
      "alias",
      "picture",
      "isDeleted",
    ],
    where: { isDeleted: 0 },
  })
    .then((interlocutor) => res.status(200).send(interlocutor))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error al cargar interlocutor." });
    });
}

function deleteInterlocutor(req, res) {
  const interlocutor = new Interlocutor();

  const { id } = req.body;
  interlocutor.id = id;

  Interlocutor.update(
    { isDeleted: 1 },
    {
      where: {
        id: interlocutor.id,
      },
    }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.status(500).send({ message: "Error al borrar el interlocutor." });
    });
}

function updateInterlocutor(req, res) {
  const { id, name, lastname, dni, alias, picture } = req.body;
  const interlocutorId = parseInt(id);

  Interlocutor.findByPk(interlocutorId).then((interlocutor) => {
    return interlocutor
      .update({
        name: name,
        lastname: lastname,
        dni: dni,
        alias: alias,
        picture: picture,
      })
      .then(() => {
        res.status(200).send(interlocutor);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al editar el interlocutor" });
      });
  });
}

module.exports = {
  newInterlocutor,
  listInterlocutor,
  deleteInterlocutor,
  updateInterlocutor,
};
