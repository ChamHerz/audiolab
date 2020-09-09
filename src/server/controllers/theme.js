const { map } = require("lodash");

const { Theme } = require("../sequelize");

function newTheme(req, res) {
    const theme = new Theme();


    const { description } = req.body;
    if(!description){
        req.status(404).send( {message: "El valor es obligatorio."})
    } else {
        theme.description = description;
        console.log(theme.dataValues);
        Theme.create(theme.dataValues)
            .then((newTheme) => res.status(200).send(newTheme))
            .catch((err) => {
                const arrayErrors = [];
                map(err.errors, (error) => {
                    arrayErrors.push(error.message);
                });
                res.status(500).send({message: "Error en la base"});
            })
    }
}

function getAllThemes() {
    const allThemes = Theme.findAll();
    console.log(allThemes.every( theme => theme instanceof Theme));
    console.log("All themes:", JSON.stringify(allThemes, null, 2));
}

module.exports = {
    newTheme,
    getAllThemes,
};