import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";
import { listProject } from "../../../api/project";
import { map } from "lodash";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm, setProject } = props;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    listProject().then((response) => {
      if (response?.data) {
        const arrayProjects = [];
        map(response?.data, (project) => {
          arrayProjects.push(project);
        });
        setProjects(response.data);
      }
    });
  }, []);

  return (
    <div className="list-project">
      <HeaderProject />
      <Grid className="list-project">
        <Grid.Row>
          <Grid.Column width={3} className="menu-left">
            <Button
              className="button-radius"
              onClick={() => setSelectedForm("new")}
            >
              Nuevo Proyecto
            </Button>
            <hr />
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
                {map(projects, (project) => (
                  <Project
                    key={project.id}
                    project={project}
                    setProject={setProject}
                  />
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Project(props) {
  const { project, setProject } = props;

  const onProject = () => {
    setProject(project);
  };

  return (
    <Table.Row onClick={onProject}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{project.name}</Table.Cell>
    </Table.Row>
  );
}
