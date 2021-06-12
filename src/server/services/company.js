const { Company } = require("../sequelize");

async function finOneService(companyId) {
  let oneCompany = null;
  await Company.findAll({
    raw: true,
    where: {
      id: companyId,
    },
  })
    .then((company) => {
      oneCompany = company[0];
    })
    .catch((err) => {
      oneCompany = null;
    });
  return oneCompany;
}

const companyService = {
  findOne: finOneService,
};

module.exports = {
  companyService,
};
