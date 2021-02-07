module.exports = (sequelize, type) => {
    //El fuero no se si ponerlo porque seria solo para el fuero penal.
    //si lo agregamos seria jurisdiction y podria ser penal, familia, civil, etcetera.
    return sequelize.define("court", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: type.STRING,
            unique: true,
        },

        competence: {
            type: type.STRING,
        },

        location: {
            type: type.STRING,
        },

        street: {
            type: type.STRING,
        },

        streetNumber: {
            type: type.INTEGER,
        },

        postalCode: {
            type: type.INTEGER,
        }
    });
}
