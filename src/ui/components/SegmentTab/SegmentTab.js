import React, { useEffect, useState } from "react";
import { Icon, Segment, Table, TableBody } from "semantic-ui-react";
import { newSegment, listSegmentByAudio } from "../../api/segment";
import { map } from "lodash";
import ContextMenu from "semantic-ui-react-context-menu";

import "./SegmentTab.scss";

export default function SegmentTab(props) {
  const { newSegmentToAdd, currentAudio } = props;
  const [segments, setSegments] = useState([]);

  const loadSegments = () => {
    listSegmentByAudio(currentAudio.id).then((response) => {
      if (response?.data) {
        const arraySegments = [];
        map(response?.data, (segment) => {
          segment.selected = false;
          arraySegments.push(segment);
        });
        setSegments(arraySegments);
        console.log("Segmentos Cargados");
      }
    });
  };

  useEffect(() => {
    if (newSegmentToAdd) {
      console.log("efefcto segmneto,", newSegmentToAdd);
      console.log("audio", currentAudio);

      newSegment({
        audioId: currentAudio.id,
        labelText: newSegmentToAdd.labelText,
        startTime: newSegmentToAdd.startTime,
        endTime: newSegmentToAdd.endTime,
        color: newSegmentToAdd.color,
      })
        .then((response) => {
          console.log("Segmento creado", response);
          loadSegments();
        })
        .catch((error) => {
          console.log("error en segmento", error);
        });
    }
  }, [newSegmentToAdd]);

  return (
    <div className="segment-tab">
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell>Inicio</Table.HeaderCell>
            <Table.HeaderCell>Fin</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(segments, (segment) => (
            <SegmentRow key={segment.id} segment={segment} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function SegmentRow(props) {
  const { segment } = props;
  const [selected, setSelected] = useState(false);

  const onSegment = (e, segmentId) => {
    if (e.ctrlKey) {
      segment.selected = !segment.selected;
      setSelected(segment.selected);
    } else {
      console.log("solo click segment");
    }
  };

  const onDoubleClickSegment = (e, segment) => {
    console.log("Doble click, ", segment);
  };

  const onDeleteSegment = (e, segment) => {
    console.log("borrar segmento");
  };

  return (
    <ContextMenu
      trigger={
        <Table.Row
          className={"segment " + (selected ? "selected" : "noSelected")}
          onClick={(e) => onSegment(e, segment.id)}
          onDoubleClick={(e) => onDoubleClickSegment(e, segment)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Table.Cell>{segment.labelText}</Table.Cell>
          <Table.Cell>{segment.description}</Table.Cell>
          <Table.Cell>{segment.startTime}</Table.Cell>
          <Table.Cell>{segment.endTime}</Table.Cell>
          <Table.Cell collapsing>
            <Icon name="play circle outline" />
          </Table.Cell>
          <Table.Cell collapsing>
            <Icon name="trash alternate outline" />
          </Table.Cell>
        </Table.Row>
      }
      items={[
        { key: "btnDelete" + segment.id, content: "Borrar", selected: segment },
      ]}
      onClick={onDeleteSegment}
    />
  );
}
