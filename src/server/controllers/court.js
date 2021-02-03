const { Court } = require("../sequelize");
let _ = require("lodash");

function newCourt( req, res ) {
    const court = new Court();

    const { name, competence, location, street, streetNumber, postalCode } = req.body;
    court.name = name;
    court.competence = competence;
    court.location = location;
    court.street = street;
    court.streetNumber = streetNumber;
    court.postalCode = postalCode;

    if(!name) {
        res.status(404).send({ message: "El nombre del juzgado es obligatorio"});
    } else {
        Court.create( court.dataValues )
            .then((newCourt) => res.status(200).send(newCourt))
            .catch((err) => {
                if(err.errors) {
                    if (_.some(err.errors, { message: "name must be unique"})){
                        res
                            .status(500).
                            send( {message: "Ya existe un juzgado con ese nombre."});
                    } else {
                        res.status(500).send({ message: "Error en la base."})
                    }
                }
            });
    }
}

function listCourt( req, res) {
    Court.findAll({attributes: ["id" , "name", "competence", "location", "street","streetNumber", "postalCode" ]})
        .then((courts) => res.status(200).send(courts))
        .catch((err) => {
            res.status(500).send( { message: "Error al cargar juzgado"})
    });
}

module.exports = {
    newCourt,
    listCourt
}
