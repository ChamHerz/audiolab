import React from "react";
import { signUpApi } from "./api/user";

function App() {
  const createUser = () => {
    const data = {
      email: "Adriel",
      password: "123456",
      repeatPassword: "123456",
    };
    signUpApi(data)
      .then(function (response) {
        console.log("resultado del endpoint,", response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error,", error.response.data);
        }
      });
  };

  return (
    <div>
      <h1>Hola Mundo</h1>
      <button onClick={() => createUser()}>Crear usuario</button>
    </div>
  );
}

export default App;
