import React, { useState, useCallback, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import { Grid, Card } from "semantic-ui-react";
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
      if (response?.data) {
        const arrayAudios = [];
        map(response?.data, (audio) => {
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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });
    //console.log(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "audio/*",
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <Card.Group className="file-list" stackable={true} doubling={true}>
        <input {...getInputProps()} />
        {map(audios, (audio) => (
          <Card key={audio.id} className="fluid audio-card">
            <AudioFile audio={audio} />
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

function AudioFile(props) {
  const { audio } = props;
  const [selected, setSelected] = useState(false);

  const onAudioFile = (e) => {
    if (e.ctrlKey) {
      console.log("tecla cntrol");
      setSelected(!selected);
    } else {
      console.log("solo click");
    }
  };

  const captureMenu = (e, menu) => {
    console.log("capturado", e);
    console.log("menu", menu);
  };

  return (
    <div
      className={"audio-file " + (selected ? "selected" : "noSelected")}
      onClick={onAudioFile}
      onContextMenu={(e) => e.preventDefault()}
    >
      {audio.name}
    </div>
  );
}
