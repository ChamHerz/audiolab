import React from "react";
import { Grid } from "semantic-ui-react";
import FileList from "../FileList";
import ContextMenu from "semantic-ui-react-context-menu";

import "./ExplorerTab.scss";

export default function ExplorerTab(props) {
  const { project } = props;

  return (
    <Grid className="explorer-tab" stretched>
      <Grid.Row className="top-bar">
        <Grid.Column width={16}>
          <div>MenuUp f</div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="middle-bar">
        <Grid.Column className="content" width={16}>
          <FileList project={project} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
