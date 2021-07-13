const { Interlocutor } = require("../sequelize");

async function findOneService( interlocutorId ) {
    let oneInterlocutor = null;
    await Interlocutor.findAll({
        raw: true,
        where : {
            id: interlocutorId,
        }
    })
        .then(interlocutor => {
            oneInterlocutor = interlocutor[0];
        })
        .catch((err) => {
            oneInterlocutor = null;
        });
    return oneInterlocutor;
}

const interlocutorService = {
    findOne : findOneService,
}

module.exports = {
    interlocutorService,
}