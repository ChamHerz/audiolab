module.exports = (sequelize, type) => {
  return sequelize.define("segment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    labelText: {
      type: type.STRING,
      allowNull: false,
    },
    startTime: {
      type: type.REAL,
      allowNull: false,
    },
    endTime: {
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
