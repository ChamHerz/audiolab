import React, { useState, useCallback } from "react";
import { Form, Input } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";

import "./FileList.scss";

export default function FileList(props) {
  const [file, setFile] = useState(null);

  const onAudioFile = () => {
    console.log("dobleClick");
  };

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    console.log(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <Grid className="file-list" {...getRootProps()}>
      <Grid.Row>
        <Grid.Column width={16}>
          Aqui archivos
          <input {...getInputProps()} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
