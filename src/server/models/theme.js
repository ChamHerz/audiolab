module.exports = (sequelize, type) => {
    return sequelize.define("theme",{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        description:{
            type: type.STRING,
            unique: true,
        }
    })
}