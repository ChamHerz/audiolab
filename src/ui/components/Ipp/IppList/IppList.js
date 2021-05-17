import React, { useState, useEffect } from "react";
import { Grid, Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { listIpp } from "../../../api/ipp";
import moment from "moment";

export default function IppList(props) {
  const [ipps, setIpps] = useState([]);

  const loadIpps = () => {
    listIpp().then((response) => {
      console.log(response);
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
    <div className="ipp-list">
      <Grid className="ipp-list">
        <Grid.Row>
          <Table inverted className="ipp-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nro. Proceso</Table.HeaderCell>
                <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
                <Table.HeaderCell>Unidad Funcional</Table.HeaderCell>
                <Table.HeaderCell>Juzgado de garantias</Table.HeaderCell>
                <Table.HeaderCell>Delito</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {map(ipps, (ipp) => (
                <Ipp key={ipp.id} ipp={ipp} />
              ))}
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Ipp(props) {
  const { ipp } = props;

  const onEditIpp = (ipp) => {
    console.log("edit", ipp);
  };

  const onDeleteIpp = (ipp) => {
    console.log("delete", ipp);
  };

  return (
    <Table.Row>
      <Table.Cell>{ipp.processNumber}</Table.Cell>
      <Table.Cell>{moment(ipp.startDate).format("DD/MM/yyyy")}</Table.Cell>
      <Table.Cell>{ipp.functionalUnit}</Table.Cell>
      <Table.Cell>{ipp.court}</Table.Cell>
      <Table.Cell>{ipp.crime}</Table.Cell>
      <Table.Cell collapsing>
        <Button icon onClick={() => onEditIpp(ipp)}>
          <Icon name="edit" />
        </Button>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button icon onClick={() => onDeleteIpp(ipp)}>
          <Icon name="trash" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
