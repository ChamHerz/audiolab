import React, { useState, useEffect } from "react";
import "./FisrtStep.scss";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { listIpp } from "../../../api/ipp";
import { map } from "lodash";
import moment from "moment";

export default function FirstStep(props) {
  const { setIppFinalSelected } = props;
  const [ipps, setIpps] = useState([]);
  const [ippSelected, setIppSelected] = useState({});

  useEffect(() => {
    loadIpps();
    setIppFinalSelected(null);
  }, []);

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

  const onSelectedIpp = (ippCheck) => {
    setIppSelected(ippCheck);
    setIppFinalSelected(ipps.find((i) => i.id === ippCheck));
  };

  return (
    <Table celled compact definition inverted>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Nro. Proceso</Table.HeaderCell>
          <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
          <Table.HeaderCell>Unidad Funcional</Table.HeaderCell>
          <Table.HeaderCell>Juzgado de garantias</Table.HeaderCell>
          <Table.HeaderCell>Delito</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(ipps, (oneIpp) => (
          <Ipp
            key={oneIpp.id}
            ipp={oneIpp}
            ippSelected={ippSelected}
            onSelectedIpp={onSelectedIpp}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

function Ipp(props) {
  const { ipp, ippSelected, onSelectedIpp } = props;

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox
          radio
          value={ipp.id}
          checked={ippSelected === ipp.id}
          onChange={(e, { value }) => onSelectedIpp(value)}
        />
      </Table.Cell>
      <Table.Cell>{ipp.processNumber}</Table.Cell>
      <Table.Cell>{moment(ipp.startDate).format("DD/MM/yyyy")}</Table.Cell>
      <Table.Cell>{ipp.functionalUnit}</Table.Cell>
      <Table.Cell>{ipp.court}</Table.Cell>
      <Table.Cell>{ipp.crime}</Table.Cell>
    </Table.Row>
  );
}
