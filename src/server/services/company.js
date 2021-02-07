cont { Company } require("../sequelize");

async function finOneService ( companyId) {
    let oneCompany = null;
    await Company.findAll({
        raw: true,
        where: {
            id: themeId,
            }
    })
        .then(company => {
            oneCompany = company[0];
        })
        .catch((err) => {
            oneTheme = null;
        });
        return oneCompany;
}

const companyService = {
    findOne : findOneService,
}

module.exports = {
    companyService,
};