import React, { useState, useEffect } from "react";
import { Button, Grid, Table, Icon } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";
import { listProject } from "../../../api/project";
import { map } from "lodash";
import { toast } from "react-toastify";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm, setProject } = props;
  const [projects, setProjects] = useState([]);

  console.log("proyectos", projects);

  useEffect(() => {
    listProject().then((response) => {
      if (response?.data) {
        const arrayProjects = [];
        map(response?.data, (project) => {
          console.log("project", project);
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
