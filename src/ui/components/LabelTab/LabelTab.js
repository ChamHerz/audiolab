import React, { useEffect, useState } from "react";
import { Icon, Table } from "semantic-ui-react";
import { newLabel } from "../../api/label";
import { toast } from "react-toastify";
import ContextMenu from "semantic-ui-react-context-menu";
import { truncate2decimal } from "../../utils/truncate";
import { map } from "lodash";

import "./LabelTab.scss";

export default function LabelTab(props) {
  const { onLoad, newLabelToAdd, currentAudio } = props;
  const [labels, setLabels] = useState([]);

  const loadLabels = () => {
    console.log("Aqui cargar las etiquetas");
  };

  useEffect(() => {
    loadLabels();
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

  const deleteLabel = (e, label) => {
    const labelToDelete = label.selected;

    console.log("borrar etiqueta");

    /*deleteSegmentById(segmentToDelete.id)
        .then((response) => {
          toast.success(`El segmento ${segmentToDelete.labelText} fue borrado`);
          loadSegments();
          onDeleteSegment(e, segment); //envia señal al waveTab
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });*/
  };

  return (
    <div className="label-tab">
      <Table inverted className="segment-list">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Tiempo</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(labels, (label) => (
            <LabelRow
              key={label.id}
              segment={label}
              onDeleteSegment={deleteLabel}
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
