import React, { useEffect } from "react";
import { Table, TableBody } from "semantic-ui-react";
import { newSegment } from "../../api/segment";

import "./SegmentTab.scss";

export default function SegmentTab(props) {
  const { newSegment } = props;

  useEffect(() => {
    if (newSegment) {
      console.log("efefcto segmneto,", newSegment);
      //console.log("audio", audio);
    }
  }, [newSegment]);

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
