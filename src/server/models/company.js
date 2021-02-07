module.exports = (sequelize, type) => {
    return sequelize.define("company", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        fantasyName: {
            type: type.STRING,
            unique: true,
        },

        companyName: {
            type: type.STRING,
            unique: true,
        },

        CUIT: {
            type: type.STRING,
            unique: true,
        },

        description: {
            type: type.STRING,
        }
    });
};
