import React, { useEffect, useState } from "react";
import { Icon, Table } from "semantic-ui-react";
import {
  deleteLabelById,
  listLabelByAudio,
  newLabel,
  updateLabel,
} from "../../api/label";
import { toast } from "react-toastify";
import ContextMenu from "semantic-ui-react-context-menu";
import { truncate2decimal } from "../../utils/truncate";
import { findIndex, map } from "lodash";

import "./LabelTab.scss";

export default function LabelTab(props) {
  const {
    onLoad,
    onClose,
    newLabelToAdd,
    onDeleteLabel,
    labelToUpdate,
    currentAudio,
  } = props;
  const [labels, setLabels] = useState([]);

  const loadLabels = () => {
    listLabelByAudio(currentAudio.id).then((response) => {
      if (response?.data) {
        const arrayLabels = [];
        map(response?.data, (label) => {
          label.selected = false;
          arrayLabels.push(label);
        });
        setLabels(arrayLabels);
      }
    });
  };

  const clearLabels = () => {
    setLabels([]);
  };

  useEffect(() => {
    if (onClose) {
      clearLabels();
    }
  }, [onClose]);

  useEffect(() => {
    if (onLoad) {
      loadLabels();
    }
  }, [onLoad]);

  useEffect(() => {
    if (newLabelToAdd) {
      newLabel({
        audioId: currentAudio.id,
        labelText: newLabelToAdd.labelText,
        time: newLabelToAdd.time,
        color: newLabelToAdd.color,
      })
        .then((response) => {
          loadLabels();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }, [newLabelToAdd]);

  useEffect(() => {
    if (labelToUpdate) {
      updateLabel({
        id: labelToUpdate.id,
        time: labelToUpdate.time,
        labelText: labelToUpdate.labelText,
        color: labelToUpdate.color,
      })
        .then((response) => {
          if (response?.data) {
            const labelUpdate = response?.data;
            const indexToUpdate = findIndex(labels, {
              id: labelUpdate.id,
            });
            labels.splice(indexToUpdate, 1, labelUpdate);
            setLabels([]);
            setLabels(labels);
          }
        })
        .catch((err) => {
          toast.error("error al actualizar la etiqueta");
        });
    }
  }, [labelToUpdate]);

  const deleteLabel = (e, label) => {
    const labelToDelete = label.selected;

    deleteLabelById(labelToDelete.id)
      .then((response) => {
        toast.success(`La etiqueta ${labelToDelete.labelText} fue borrada`);
        loadLabels();
        onDeleteLabel(e, label); //envia señal al waveTab
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="label-tab">
      <Table inverted className="label-list">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Tiempo</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(labels, (label) => (
            <LabelRow
              key={label.id}
              label={label}
              onDeleteLabel={deleteLabel}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function LabelRow(props) {
  const { label, onDeleteLabel } = props;
  const [selected, setSelected] = useState(false);

  const onLabel = (e, labelId) => {
    if (e.ctrlKey) {
      label.selected = !label.selected;
      setSelected(label.selected);
    } else {
      console.log("solo click segment");
    }
  };

  const onDoubleClickLabel = (e, label) => {
    console.log("Doble click, ", label);
  };

  return (
    <ContextMenu
      trigger={
        <Table.Row
          className={"label " + (selected ? "selected" : "noSelected")}
          onClick={(e) => onLabel(e, label.id)}
          onDoubleClick={(e) => onDoubleClickLabel(e, label)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Table.Cell>{label.labelText}</Table.Cell>
          <Table.Cell textAlign="right">
            {truncate2decimal(label.time)}
          </Table.Cell>
          <Table.Cell collapsing>
            <Icon name="play circle outline" />
          </Table.Cell>
          <Table.Cell collapsing>
            <Icon name="trash alternate outline" />
          </Table.Cell>
        </Table.Row>
      }
      items={[
        { key: "btnDelete" + label.id, content: "Borrar", selected: label },
      ]}
      onClick={onDeleteLabel}
    />
  );
}
