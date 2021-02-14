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


// ASSOCIATIONS
Audio.belongsTo(Project, { foreignKey: "id_project" });
Project.hasMany(Audio, { foreignKey: "id_project" });

Segment.belongsTo(Audio, { foreignKey: "id_audio" });
Audio.hasMany(Segment, { foreignKey: "id_audio" });

Label.belongsTo(Audio, { foreignKey: "id_audio" });
Audio.hasMany(Label, { foreignKey: "id_audio" });

// COMENTAR ESTO PARA BORRAR LA BASE AL INICIAR
/*sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});*/

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
};
