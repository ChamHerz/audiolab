import React, { useEffect, useState } from "react";
import { Button, Confirm, Grid, Icon, Input, Table } from "semantic-ui-react";
import HeaderProject from "../HeaderProject";
import { deleteProject, listProject } from "../../../api/project";
import { filter, map } from "lodash";

import "./ListProject.scss";

export default function ListProject(props) {
  const { setSelectedForm, setProject } = props;
  const [projects, setProjects] = useState([]);
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [searching, setSearching] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const loadProjects = () => {
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
  };

  useEffect(() => {
    loadProjects();
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

  const onCancel = () => {
    setDeleteState(false);
  };

  const onConfirm = () => {
    console.log("confirmo borrado", projectToDelete);
    setDeleteState(false);
    deleteProject(projectToDelete.id)
      .then((response) => {
        loadProjects();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDeleteProject = (oneProject) => {
    setProjectToDelete(oneProject);
    console.log("Delete", oneProject);
    setDeleteState(true);
  };

  return (
    <>
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
                    <Table.HeaderCell style={{ width: "1vh" }} />
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
                        onDeleteProject={onDeleteProject}
                      />
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Confirm
        open={deleteState}
        header="Borrado de Proyecto"
        content="¿Esta seguro de borrar el proyecto?"
        cancelButton="Cancelar"
        confirmButton="Borrar"
        onCancel={() => onCancel()}
        onConfirm={() => onConfirm()}
      />
    </>
  );
}

function Project(props) {
  const { project, setProject, onDeleteProject } = props;

  const onProject = () => {
    setProject(project);
  };

  return (
    <Table.Row>
      <Table.Cell style={{ width: "1vh" }}>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell
        className="project-name-cell"
        onClick={onProject}
        style={{ width: "15vh" }}
      >
        {project.name}
      </Table.Cell>
      <Table.Cell style={{ width: "15vh" }}>{project.description}</Table.Cell>
      <Table.Cell
        className="project-delete-cell"
        onClick={() => onDeleteProject(project)}
        style={{ width: "1vh" }}
      >
        <Icon name="trash alternate outline" />
      </Table.Cell>
    </Table.Row>
  );
}
