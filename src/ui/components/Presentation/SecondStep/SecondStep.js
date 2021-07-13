import React, { useEffect, useState } from "react";
import { findAllByIpp } from "../../../api/project";
import { Checkbox, Table } from "semantic-ui-react";
import { map } from "lodash";

export default function SecondStep(props) {
  const { ippFinalSelected, setProjectFinalSelected } = props;
  const [projects, setProjects] = useState([]);
  const [projectSelected, setProjectSelected] = useState({});

  useEffect(() => {
    setProjectFinalSelected(null);
    console.log("ippFinalSelected", ippFinalSelected);
    if (ippFinalSelected) {
      findAllByIpp(ippFinalSelected.id)
        .then((response) => {
          console.log("ok, ", response);
          if (response?.data) {
            setProjects(response.data.projects);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [ippFinalSelected]);

  const onSelectedProject = (projectCheck) => {
    setProjectSelected(projectCheck);
    setProjectFinalSelected(projects.find((i) => i.id === projectCheck));
  };

  return (
    <Table celled compact definition inverted>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Descripción</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(projects, (oneProject) => (
          <Project
            key={oneProject.id}
            project={oneProject}
            projectSelected={projectSelected}
            onSelectedProject={onSelectedProject}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

function Project(props) {
  const { project, projectSelected, onSelectedProject } = props;

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox
          radio
          value={project.id}
          checked={projectSelected === project.id}
          onChange={(e, { value }) => onSelectedProject(value)}
        />
      </Table.Cell>
      <Table.Cell>{project.name}</Table.Cell>
      <Table.Cell>{project.description}</Table.Cell>
    </Table.Row>
  );
}
