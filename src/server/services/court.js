const { Court } = require("../sequelize");

async function findOneService( courtId ) {
    let oneCourt = null;
    await Court.findAll({
        raw: true,
        where: {
            id: courtId,
        },
    })
        .then(court => {
            oneCourt = court[0];
        })
        .catch((err) => {
        oneCourt = null;
    });
    return oneCourt;
}

const courtService = {
    findOne : findOneService,
}

module.exports = {
    courtService,
};


