module.exports = (sequelize, type) => {
  return sequelize.define("theme", {
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
    isDeleted: {
      type: type.INTEGER,
      allowNull: false,
      default: false,
    },
  });
};
