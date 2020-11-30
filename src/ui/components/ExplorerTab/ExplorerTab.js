import React from "react";
import { Grid } from "semantic-ui-react";
import FileList from "../FileList";

import "./ExplorerTab.scss";

export default function ExplorerTab(props) {
  const { project } = props;

  console.log("project in explorerTab", project);

  return (
    <Grid className="explorer-tab" stretched>
      <Grid.Row className="top-bar">
        <Grid.Column width={16}>MenuUp f</Grid.Column>
      </Grid.Row>
      <Grid.Row className="bottom-bar">
        <Grid.Column width={16}>
          <FileList />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
