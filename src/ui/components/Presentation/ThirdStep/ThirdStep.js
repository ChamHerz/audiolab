import React, { useEffect, useState } from "react";
import { findAllSegmentByProject } from "../../../api/segment";
import { Table } from "semantic-ui-react";
import { map } from "lodash";

export default function ThirdStep(props) {
  const { projectFinalSelected } = props;
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (projectFinalSelected) {
      findAllSegmentByProject(projectFinalSelected.id)
        .then((response) => {
          console.log("findAllSegmentByProject", response);
          if (response?.data) {
            setSegments(response.data);
          }
        })
        .catch((err) => {
          console.log("error, ", err);
        });
    }
  }, [projectFinalSelected]);

  return (
    <Table celled compact definition inverted>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Audio</Table.HeaderCell>
          <Table.HeaderCell>Segmento</Table.HeaderCell>
          <Table.HeaderCell>Inicio</Table.HeaderCell>
          <Table.HeaderCell>Fin</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(segments, (oneSegment, index) => (
          <Segment key={index} segment={oneSegment} />
        ))}
      </Table.Body>
    </Table>
  );
}

function Segment(props) {
  const { segment } = props;

  return (
    <Table.Row>
      <Table.Cell collapsing>textBox</Table.Cell>
      <Table.Cell>{segment.audio.name}</Table.Cell>
      <Table.Cell>{segment.segment.labelText}</Table.Cell>
      <Table.Cell>{segment.segment.startTime}</Table.Cell>
      <Table.Cell>{segment.segment.endTime}</Table.Cell>
    </Table.Row>
  );
}
