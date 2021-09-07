module.exports = (sequelize, type) => {
  return sequelize.define("project", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      unique: true,
    },
    description: {
      type: type.STRING,
    },
    deleted: {
      type: type.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};
