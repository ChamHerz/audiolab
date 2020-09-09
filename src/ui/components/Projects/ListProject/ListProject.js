import React from "react";
import { Button, Grid } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm } = props;
  return (
    <div className="list-project">
      <HeaderProject />
      <Grid className="list-project">
        <Grid.Row>
          <Grid.Column width={3}>
            <h2>Menu Left</h2>
            <Button
              className="new-project"
              onClick={() => setSelectedForm("new")}
            >
              Nuevo Proyecto
            </Button>
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <h2>Contenido</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
