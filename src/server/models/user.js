module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    lastName: type.STRING,
    email: {
      type: type.STRING,
      unique: true,
    },
    password: type.STRING,
    role: type.STRING,
    active: type.BOOLEAN,
  });
};
