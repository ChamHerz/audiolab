const { map } = require("lodash");

const { User } = require("../sequelize");

function signUp(req, res) {
  const user = new User();

  const { email, password, repeatPassword } = req.body;
  user.email = email;
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales." });
    } else {
      user.password = password;
      console.log(user.dataValues);
      User.create(user.dataValues)
        .then((newUser) => res.status(200).send(newUser))
        .catch((err) => {
          const arrayErrors = [];
          map(err.errors, (error) => {
            arrayErrors.push(error.message);
          });
          res.status(500).send({ message: "Error en la base" });
        });
    }
  }
}

module.exports = {
  signUp,
};
