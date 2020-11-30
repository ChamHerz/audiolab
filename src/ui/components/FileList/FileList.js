import React, { useState, useCallback, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { listAudio, newAudio } from "../../api/audio";
import { toast } from "react-toastify";

import "./FileList.scss";

export default function FileList(props) {
  const [file, setFile] = useState(null);
  const [audios, setAudios] = useState([]);

  console.log("audios", audios);

  useEffect(() => {
    listAudio().then((response) => {
      if (response?.data) setAudios(response.data);
      console.log("audios", audios);
    });
  }, []);

  const onAudioFile = () => {
    console.log("dobleClick");
  };

  const onDrop = useCallback((acceptedFile) => {
    map(acceptedFile, (audioFile) => {
      const file = audioFile;
      // setFile(file);
      console.log(file);
      newAudio({
        name: file.name,
        size: file.size,
      })
        .then((response) => {
          toast.success("Audio agregado correctamente.");
          console.log("response", response);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });
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
