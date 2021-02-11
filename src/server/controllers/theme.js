const { Theme } = require("../sequelize");
let _ = require("lodash");

function newTheme( req, res ) {
    const theme = new Theme();

    const { name , description } = req.body;
    theme.name = name;
    theme.description = description;

    if(!name) {
        res.status(404).send({ message: "El nombre del tema es obligatorio."});
    } else {
        Theme.create( theme.dataValues)
            .then((newTheme) => res.status(200).send(newTheme))
            .catch((err) => {
                if(err.errors) {
                    if (_.some(err.errors, { message: "name must be unique"})) {
                        res
                            .status(500)
                            .send( { message: "Ya existe un tema con ese nombre." });
                    } else  {
                        res.status(500).send({ message: "Error en la base."})
                    }
                }
            });
    }
}

function listTheme( req, res ) {
    Theme.findAll( { attributes: [ "id", "name", "description", "isDeleted"], where: {isDeleted : 0} })
        .then((themes) => res.status(200).send(themes))
        .catch((err) => {
            res.status(500).send({ message:"Error al cargar tema."})
        });
}

function deleteTheme( req, res ) {

    const theme = new Theme();

    const { id } = req.body;
    theme.id = id;

    Theme.update({ isDeleted: 1},{
        where: {
            id : theme.id
        }
    })
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.status(500).send({ message: "Error al borrar tema."})
        })
}

module.exports = {
    newTheme,
    listTheme,
    deleteTheme,
}