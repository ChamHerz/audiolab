const { Theme } = require("../sequelize");

async function findOneService( themeId ) {
    let oneTheme = null;
    await Theme.findAll({
        raw: true,
        where: {
            id: themeId,
        },
    })
        .then(theme => {
            oneTheme = theme[0];
        })
        .catch((err) => {
        oneTheme = null;
    });
    return oneTheme;
}

const themeService = {
    findOne : findOneService,
}

module.exports = {
    themeService,
};