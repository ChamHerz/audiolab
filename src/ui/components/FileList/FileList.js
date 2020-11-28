import React, { useState, useCallback } from "react";
import { Form, Input } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";

import "./FileList.scss";

export default function FileList(props) {
  const [file, setFile] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);

  const onAudioFile = () => {
    console.log("dobleClick");
  };

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    console.log(file);
    //console.log(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "audio/*",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <Grid className="file-list">
        <Grid.Column width={16}>
          <input {...getInputProps()} />
          <AudioFile />
        </Grid.Column>
      </Grid>
    </div>
  );

  function AudioFile(props) {
    return <div>Alla</div>;
  }
}
