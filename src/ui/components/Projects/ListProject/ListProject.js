import React, { useState, useEffect } from "react";
import { Button, Grid, Table, Icon } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";
import { listProject } from "../../../api/project";
import { map } from "lodash";
import { toast } from "react-toastify";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm } = props;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    listProject().then((response) => {
      if (response?.data) {
        console.log(response.data);
      }
    });
  }, []);

  return (
    <div className="list-project">
      <HeaderProject />
      <Grid className="list-project">
        <Grid.Row>
          <Grid.Column width={3}>
            <h2>Menu Left</h2>
            <Button
              className="new-project"
              onClick={() => setSelectedForm("new")}
            >
              Nuevo Proyecto
            </Button>
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <Table inverted className="table-songs">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Título</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name="play circle outline" />
                  </Table.Cell>
                  <Table.Cell>Project Name</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
