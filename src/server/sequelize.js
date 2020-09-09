const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const ThemeModel = require("./models/theme");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize, Sequelize);
const Theme = ThemeModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Theme
};
