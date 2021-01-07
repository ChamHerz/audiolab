import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderProject.scss";
import LogoNameWhite from "../../../assets/png/logo-name-white.png";

export default function HeaderProject(props) {
  const { selectedForm, setSelectedForm } = props;
  return (
    <div className="header-project">
      <img src={LogoNameWhite} alt="AudioLab" />
      {selectedForm === "new" ? (
        <Button
          className="list-project-button"
          onClick={() => setSelectedForm("list")}
        >
          Lista proyectos
        </Button>
      ) : (
        <h2>no mostrar</h2>
      )}
    </div>
  );
}
