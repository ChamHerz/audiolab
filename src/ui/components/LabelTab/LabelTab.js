import React, { useEffect } from "react";
import { Table } from "semantic-ui-react";

import "./LabelTab.scss";

export default function LabelTab(props) {
  const { onLoad } = props;

  const loadLabels = () => {
    console.log("Aqui cargar las etiquetas");
  };

  useEffect(() => {
    loadLabels();
  }, [onLoad]);

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
      </Table>
    </div>
  );
}
