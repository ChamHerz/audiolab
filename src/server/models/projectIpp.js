module.exports = (sequelize, type) => {
  return sequelize.define(
    "projectIpp",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: type.INTEGER,
      },
      ipp_id: {
        type: type.INTEGER,
      },
    },
    {
      tableName: "projects_ipps",
    }
  );
};
