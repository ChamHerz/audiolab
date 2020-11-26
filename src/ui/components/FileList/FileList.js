import React from "react";
import { Grid } from "semantic-ui-react";

import "./FileList.scss";

export default function FileList(props) {
  const onAudioFile = () => {
    console.log("dobleClick");
  };

  return (
    <Grid className="file-list" onDoubleClick={onAudioFile}>
      <Grid.Row>
        <Grid.Column width={16}>Aqui archivos</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
