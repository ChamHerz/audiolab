const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const ProjectModel = require("./models/project");
const AudioModel = require("./models/audio.js");
const SegmentModel = require("./models/segment.js");
const ThemeModel = require("./models/theme");
const CompanyModel = require("./models/company");
const InterlocutorModel = require("./models/interlocutor.js");
const CourtModel = require("./models/court");
const LabelModel = require("./models/label.js");
const IppModel = require("./models/ipp.js");
const InterlocutorAudioModel = require("./models/interlocutorAudio.js");
const ProjectIppModel = require("./models/projectIpp.js");

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
const Segment = SegmentModel(sequelize, Sequelize);
const Interlocutor = InterlocutorModel(sequelize, Sequelize);
const Label = LabelModel(sequelize, Sequelize);
const Ipp = IppModel(sequelize, Sequelize);
const InterlocutorAudio = InterlocutorAudioModel(sequelize, Sequelize);
const ProjectIpp = ProjectIppModel(sequelize, Sequelize);

// ASSOCIATIONS
Audio.belongsTo(Project, { foreignKey: "id_project" });
Project.hasMany(Audio, { foreignKey: "id_project" });

Segment.belongsTo(Audio, { foreignKey: "id_audio" });
Audio.hasMany(Segment, { foreignKey: "id_audio" });

Label.belongsTo(Audio, { foreignKey: "id_audio" });
Audio.hasMany(Label, { foreignKey: "id_audio" });

//const User_Profile = Sequelize.define('User_Profile', {}, { timestamps: false });
Interlocutor.belongsToMany(Audio, {
  through: InterlocutorAudio,
  foreignKey: "interlocutor_id",
});
Audio.belongsToMany(Interlocutor, {
  through: InterlocutorAudio,
  foreignKey: "audio_id",
});

//Relacion entre Proyectos e IPPs
Project.belongsToMany(Ipp, {
  through: ProjectIpp,
  foreignKey: "project_id",
});
Ipp.belongsToMany(Project, {
  through: ProjectIpp,
  foreignKey: "ipp_id",
});

// COMENTAR ESTO PARA BORRAR LA BASE AL INICIAR
/*sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});*/
sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Project,
  Audio,
  Segment,
  Theme,
  Company,
  Court,
  Interlocutor,
  Label,
  Ipp,
  InterlocutorAudio,
  ProjectIpp,
};
