import React, { useState, useCallback, useEffect } from "react";
import { Icon, Table } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map, filter, union } from "lodash";
import {
  listAudioByProject,
  newAudio,
  deleteAudioById,
  createDataAudioById,
} from "../../api/audio";
import { toast } from "react-toastify";
import ContextMenu from "semantic-ui-react-context-menu";
import { runner } from "../../utils/runner";

import "./FileList.scss";

export default function FileList(props) {
  const { project, onDoubleClickAudioFile } = props;
  const [audios, setAudios] = useState([]);

  const loadAudios = () => {
    listAudioByProject(project.id).then((response) => {
      if (response?.data) {
        const arrayAudios = [];
        map(response?.data, (audio) => {
          audio.selected = false;
          arrayAudios.push(audio);
        });
        setAudios(arrayAudios);
      }
    });
  };

  useEffect(() => {
    loadAudios();
  }, []);

  const onDrop = useCallback((acceptedFile) => {
    map(acceptedFile, (audioFile) => {
      const file = audioFile;
      // setFile(file);
      newAudio({
        projectId: project.id,
        name: file.name,
        path: file.path,
        size: file.size,
        type: file.type,
        lastModifiedDate: file.lastModifiedDate,
      })
        .then((response) => {
          runner(response.data).then((audio) => {
            createDataAudioById(audio.id)
              .then((response) => {
                audio.hasData = true;
              })
              .catch((error) => {
                console.log("error en boolear el data", error);
              });
          });

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

  const openBrowser = (e) => {
    const { target } = e;
    // evitar el doble click en un audio
    if (target.tagName === "DIV") {
      open();
    }
  };

  return (
    <div {...getRootProps()} onDoubleClick={(e) => openBrowser(e)}>
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
            <AudioFile
              key={audio.id}
              audio={audio}
              audios={audios}
              loadAudios={loadAudios}
              onDoubleClickAudioFile={onDoubleClickAudioFile}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function AudioFile(props) {
  const { audio, audios, loadAudios, onDoubleClickAudioFile } = props;
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
    const audiosToDelete = union(
      [item.selected],
      filter(audios, (a) => a.selected)
    );
    map(audiosToDelete, (audio) => {
      deleteAudioById(audio.id)
        .then((response) => {
          toast.success(`El audio ${audio.name} fue borrado`);
          loadAudios();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });
    //setDropped(!dropped);
  };

  return (
    <ContextMenu
      trigger={
        <Table.Row
          className={"audio-file " + (selected ? "selected" : "noSelected")}
          onClick={(e) => onAudioFile(e, audio.id)}
          onDoubleClick={(e) => onDoubleClickAudioFile(e, audio)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Table.Cell collapsing>
            <Icon name="play circle outline" />
          </Table.Cell>
          <Table.Cell>{audio.name}</Table.Cell>
        </Table.Row>
      }
      items={[
        { key: "btnDelete" + audio.id, content: "Borrar", selected: audio },
      ]}
      onClick={onDeleteAudio}
    />
  );
}
