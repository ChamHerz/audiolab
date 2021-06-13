import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import LogoNameWhite from "../../../assets/png/logo-name-white.png";

import "./HeaderProject.scss";

export default function HeaderProject(props) {
  const { selectedForm, setSelectedForm } = props;
  return (
    <Grid className="header-project">
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column width={6}>
        <img src={LogoNameWhite} alt="AudioLab" />
      </Grid.Column>
      <Grid.Column width={5} className="right-column">
        {selectedForm === "new" ? (
          <Button
            className="button-radius"
            onClick={() => setSelectedForm("list")}
          >
            <Icon className="arrow left" />
            Lista proyectos
          </Button>
        ) : (
          <h2></h2>
        )}
      </Grid.Column>
    </Grid>
  );
}
