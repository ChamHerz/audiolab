module.exports = (sequelize, type) => {
  return sequelize.define("interlocutor", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alias: {
      type: type.STRING,
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
      type: type.STRING,
    },
    isDeleted: {
      type: type.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};
