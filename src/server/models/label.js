module.exports = (sequelize, type) => {
  return sequelize.define("label", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    labelText: {
      type: type.STRING,
      allowNull: false,
    },
    time: {
      type: type.REAL,
      allowNull: false,
    },
    color: {
      type: type.STRING,
      allowNull: false,
    },
    deleted: {
      type: type.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};
