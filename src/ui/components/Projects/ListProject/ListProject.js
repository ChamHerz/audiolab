import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Input, Table } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";
import { listProject } from "../../../api/project";
import { filter, map } from "lodash";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm, setProject } = props;
  const [projects, setProjects] = useState([]);
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    listProject().then((response) => {
      if (response?.data) {
        const arrayProjects = [];
        map(response?.data, (project) => {
          arrayProjects.push(project);
        });
        setProjects(response.data);
        setProjectsFilter(response.data);
      }
    });
  }, []);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      console.log("on enter", e.target.value);
      applyFilter(e.target.value);
    }
  };

  const onChangeFilter = (e) => {
    console.log("on change", e.target.value);
    applyFilter(e.target.value);
  };

  const applyFilter = (text) => {
    text = text.toLowerCase();
    let projectsFilter = [];
    projectsFilter = filter(projects, (project) => {
      if (project.name.toLowerCase().includes(text)) return true;
      return !!(
        project.description && project.description.toLowerCase().includes(text)
      );
    });
    setProjectsFilter(projectsFilter);
  };

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
            <div className="filter">
              <Input
                transparent
                onKeyPress={(e) => onSearch(e)}
                onChange={(e) => onChangeFilter(e)}
                iconPosition="left"
                icon="filter"
                placeholder="ingrese texto"
                loading={searching}
              />
            </div>
            <Table inverted fixed className="table-heads">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: "1vh" }} />
                  <Table.HeaderCell style={{ width: "15vh" }}>
                    Título
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "15vh" }}>
                    Descripción
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
            <div className="table-projects">
              <Table inverted fixed className="table-songs">
                <Table.Body>
                  {map(projectsFilter, (project) => (
                    <Project
                      key={project.id}
                      project={project}
                      setProject={setProject}
                    />
                  ))}
                </Table.Body>
              </Table>
            </div>
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
      <Table.Cell style={{ width: "1vh" }}>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell style={{ width: "15vh" }}>{project.name}</Table.Cell>
      <Table.Cell style={{ width: "15vh" }}>{project.description}</Table.Cell>
    </Table.Row>
  );
}
