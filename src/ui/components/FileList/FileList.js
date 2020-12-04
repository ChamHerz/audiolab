import React, { useState, useCallback, useEffect } from "react";
import { Form, Icon, Input, Table, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map, filter } from "lodash";
import { listAudioByProject, newAudio } from "../../api/audio";
import { toast } from "react-toastify";
import ContextMenu from "semantic-ui-react-context-menu";

import "./FileList.scss";

export default function FileList(props) {
  const { project } = props;
  const [file, setFile] = useState(null);
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAudios = () => {
    listAudioByProject(project.id).then((response) => {
      if (response?.data) {
        const arrayAudios = [];
        map(response?.data, (audio) => {
          audio.selected = false;
          arrayAudios.push(audio);
        });
        setAudios(arrayAudios);
        console.log("audios Cargados");
      }
    });
  };

  useEffect(() => {
    loadAudios();
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
          loadAudios();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });
    //console.log(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "audio/*",
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const openBrowser = () => {
    console.log("doble click");
    open();
  };

  /*if (loading) {
    return <Loader active>Cargando...</Loader>;
  }*/

  return (
    <div {...getRootProps()} onDoubleClick={() => openBrowser()}>
      <input {...getInputProps()} />
      <Table inverted className="file-list">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nombre</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(audios, (audio) => (
            <AudioFile key={audio.id} audio={audio} audios={audios} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function AudioFile(props) {
  const { audio, audios, dropped, setDropped } = props;
  const [selected, setSelected] = useState(false);

  const onAudioFile = (e, audioId) => {
    if (e.ctrlKey) {
      audio.selected = !audio.selected;
      setSelected(audio.selected);
    } else {
      console.log("solo click");
    }
  };

  const onDeleteAudio = (e, item) => {
    console.log("borrado");
    const audiosToDelete = filter(audios, (a) => a.selected);
    console.log(audiosToDelete);
    //setDropped(!dropped);
  };

  return (
    <ContextMenu
      trigger={
        <Table.Row
          className={"audio-file " + (selected ? "selected" : "noSelected")}
          onClick={(e) => onAudioFile(e, audio.id)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Table.Cell collapsing>
            <Icon name="play circle outline" />
          </Table.Cell>
          <Table.Cell>{audio.name}</Table.Cell>
        </Table.Row>
      }
      items={[{ key: "btnDelete" + audio.id, content: "Borrar" }]}
      onClick={onDeleteAudio}
    />
  );
}
