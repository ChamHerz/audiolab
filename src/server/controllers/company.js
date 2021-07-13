const { Company } = require("../sequelize");
let _ = require("lodash");

function newCompany( req, res ) {
    const company = new Company();

    const { fantasyName, companyName, CUIT, description } = req.body;
    company.fantasyName = fantasyName;
    company.companyName = companyName;
    company.CUIT = CUIT;
    company.description = description;

    //Solamente vamos a pedir como obligatorio el campo de nombre de fantasia.fantasyName
    //Dejamos el campo description por si quiere completar algun dato extra.
    //Dato de ejemplo:
    //Nombre de fantasia: MOVISTAR
    //Razon social: TELEFONICA MOVILES ARGENTINA SOCIEDAD ANONIMA
    //CUIT:  30-67881435-7

    if(!fantasyName) {
        res.status(404).send({ message:"El nombre de fantasia es obligatorio"});
    } else {
        Company.create( company.dataValues)
            .then((newCompany) => res.status(200).send(newCompany))
            .catch((err) => {
                if(err.errors) {
                    if(_.some(err.errors, {message: "name must be unique"})){
                        res
                            .status(500)
                            .send({ message: "Ya existe una empresa con ese nombre."});
                }  else {
                    res.status(500).send({ message: "Error en la base"})
                }
             }
         });
    }
}

function listCompany( req, res ) {
    Company.findAll( { attributes: [ "id", "fantasyName", "companyName", "CUIT", "description"]})
        .then((companies) => res.status(200).send(companies))
        .catch((err) => {
            res.status(500).send({ message:"Error al cargar empresa."})
        });
}

module.exports = {
    newCompany,
    listCompany
}

