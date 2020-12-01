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

// ASSOCIATIONS
Audio.belongsTo(Project, { foreignKey: "id_project" });
Project.hasMany(Audio, { foreignKey: "id_project" });

// COMENTAR ESTO PARA BORRAR LA BASE AL INICIAR
sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Project,
  Audio,
};
