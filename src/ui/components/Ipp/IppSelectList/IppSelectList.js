import React, { useEffect, useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { map } from "lodash";
import { listIpp } from "../../../api/ipp";
import moment from "moment";

import "./IppSelectList.scss";

export default function IppSelectList(props) {
  const { onDoubleClickIpp } = props;
  const [ipps, setIpps] = useState([]);

  const loadIpps = () => {
    listIpp().then((response) => {
      if (response?.data) {
        const arrayIpps = [];
        map(response?.data, (ipp) => {
          arrayIpps.push(ipp);
        });
        setIpps(arrayIpps);
      }
    });
  };

  useEffect(() => {
    loadIpps();
  }, []);

  return (
    <Table inverted className="select-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nro. Proceso</Table.HeaderCell>
          <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
          <Table.HeaderCell>Unidad Funcional</Table.HeaderCell>
          <Table.HeaderCell>Juzgado de garantias</Table.HeaderCell>
          <Table.HeaderCell>Delito</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(ipps, (ipp) => (
          <Ipp key={ipp.id} ipp={ipp} onDoubleClickIpp={onDoubleClickIpp} />
        ))}
      </Table.Body>
    </Table>
  );
}

function Ipp(props) {
  const { ipp, onDoubleClickIpp } = props;

  return (
    <Table.Row onDoubleClick={(e) => onDoubleClickIpp(e, ipp)}>
      <Table.Cell>{ipp.processNumber}</Table.Cell>
      <Table.Cell>{moment(ipp.startDate).format("DD/MM/yyyy")}</Table.Cell>
      <Table.Cell>{ipp.functionalUnit}</Table.Cell>
      <Table.Cell>{ipp.court}</Table.Cell>
      <Table.Cell>{ipp.crime}</Table.Cell>
    </Table.Row>
  );
}
