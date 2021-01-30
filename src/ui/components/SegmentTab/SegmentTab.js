import React, { useEffect } from "react";
import { Table, TableBody } from "semantic-ui-react";
import { newSegment } from "../../api/segment";

import "./SegmentTab.scss";

export default function SegmentTab(props) {
  const { newSegmentToAdd, currentAudio } = props;

  useEffect(() => {
    if (newSegmentToAdd) {
      console.log("efefcto segmneto,", newSegmentToAdd);
      console.log("audio", currentAudio);

      newSegment({
        audioId: currentAudio.id,
        labelText: newSegmentToAdd.labelText,
        startTime: newSegmentToAdd.startTime,
        endTime: newSegmentToAdd.endTime,
        color: newSegmentToAdd.color,
      })
        .then((response) => {
          console.log("Segmento creado", response);
        })
        .catch((error) => {
          console.log("error en segmento", error);
        });
    }
  }, [newSegmentToAdd]);

  return (
    <div className="segment-tab">
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell>Inicio</Table.HeaderCell>
            <Table.HeaderCell>Fin</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Name</Table.Cell>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell>start</Table.Cell>
            <Table.Cell>End</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
