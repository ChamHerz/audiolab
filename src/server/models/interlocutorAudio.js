module.exports = (sequelize, type) => {
  return sequelize.define(
    "interlocutorAudio",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      interlocutor_id: {
        type: type.INTEGER,
      },
      audio_id: {
        type: type.INTEGER,
      },
    },
    {
      tableName: "interlocutors_audios",
    }
  );
};
