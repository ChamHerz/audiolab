const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const ProjectModel = require("./models/project");
const AudioModel = require("./models/audio.js");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const Audio = AudioModel(sequelize, Sequelize);

// COMENTAR ESTO PARA BORRAR LA BASE AL INICIAR
/*sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});*/

module.exports = {
  User,
  Project,
  Audio,
};
