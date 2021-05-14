const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("ipp", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    processNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    functionalUnit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    court: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    crime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: type.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};
