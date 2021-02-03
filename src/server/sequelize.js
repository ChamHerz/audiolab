const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const ProjectModel = require("./models/project");
const AudioModel = require("./models/audio.js");
const ThemeModel = require("./models/theme");
const CompanyModel = require("./models/company");
const CourtModel = require("./models/court")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const Audio = AudioModel(sequelize, Sequelize);
const Theme = ThemeModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Court = CourtModel(sequelize, Sequelize);

// ASSOCIATIONS OJO CORDOBA QUE ACA UN AUDIO PUEDE PERTENER A VARIOS PROYECTOS.
Audio.belongsTo(Project, { foreignKey: "id_project" });
Project.hasMany(Audio, { foreignKey: "id_project" });

// COMENTAR ESTO PARA BORRAR LA BASE AL INICIAR
/*sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});*/

module.exports = {
  User,
  Project,
  Audio,
  Theme,
  Company,
  Court
};
