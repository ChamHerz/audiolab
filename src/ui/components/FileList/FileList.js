import React, { useState, useCallback, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { listAudioByProject, newAudio } from "../../api/audio";
import { toast } from "react-toastify";

import "./FileList.scss";

export default function FileList(props) {
  const { project } = props;
  const [file, setFile] = useState(null);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    listAudioByProject(project.id).then((response) => {
      console.log("responseAudios", response);
      if (response?.data) {
        const arrayAudios = [];
        map(response?.data, (audio) => {
          console.log("un audio", audio);
          arrayAudios.push(audio);
        });
        setAudios(arrayAudios);
      }
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
        projectId: project.id,
        name: file.name,
        path: file.path,
        size: file.size,
        type: file.type,
        lastModifiedDate: file.lastModifiedDate,
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
        <input {...getInputProps()} />
        {map(audios, (audio) => {
          if (audio !== undefined) {
            return (
              <Grid.Column key={audio.id} width={3}>
                <AudioFile audio={audio} />
              </Grid.Column>
            );
          }
        })}
      </Grid>
    </div>
  );
}

function AudioFile(props) {
  const { audio } = props;

  console.log("audioFile", audio);

  return <div className="audio-file">{audio?.name}</div>;
}
