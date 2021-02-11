module.exports = (sequelize, type) => {
    return sequelize.define("interlocutor", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: type.STRING,
        },

        lastname: {
            type: type.STRING,
        },

        dni: {
            type: type.STRING,
            unique: true,
        },

        picture: {
            type: type.BLOB,
        },

        isDeleted: {
            type: type.INTEGER,
        }
    });
};