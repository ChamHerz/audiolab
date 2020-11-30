module.exports = (sequelize, type) => {
  return sequelize.define("audio", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
    },
    size: {
      type: type.INTEGER,
    },
  });
};
