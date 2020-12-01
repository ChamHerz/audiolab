module.exports = (sequelize, type) => {
  return sequelize.define("audio", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    path: {
      type: type.STRING,
      allowNull: false,
    },
    size: {
      type: type.INTEGER,
      allowNull: false,
    },
    type: {
      type: type.STRING,
      allowNull: false,
    },
    lastModifiedDate: {
      type: type.DATE,
      allowNull: false,
    },
  });
};
