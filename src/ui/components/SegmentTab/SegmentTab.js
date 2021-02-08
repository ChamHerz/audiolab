import React, { useEffect, useState } from "react";
import { Icon, Segment, Table, TableBody } from "semantic-ui-react";
import {
  newSegment,
  listSegmentByAudio,
  deleteSegmentById,
  updateSegment,
} from "../../api/segment";
import { map, findIndex } from "lodash";
import ContextMenu from "semantic-ui-react-context-menu";

import "./SegmentTab.scss";
import { toast } from "react-toastify";
import { truncate2decimal } from "../../utils/truncate";

export default function SegmentTab(props) {
  const {
    newSegmentToAdd,
    currentAudio,
    onClose,
    onLoad,
    onDeleteSegment,
    segmentToUpdate,
  } = props;
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
      }
    });
  };

  useEffect(() => {
    if (newSegmentToAdd) {
      newSegment({
        audioId: currentAudio.id,
        labelText: newSegmentToAdd.labelText,
        startTime: newSegmentToAdd.startTime,
        endTime: newSegmentToAdd.endTime,
        color: newSegmentToAdd.color,
      })
        .then((response) => {
          loadSegments();
        })
        .catch((error) => {
          console.log("error en segmento", error);
        });
    }
  }, [newSegmentToAdd]);

  useEffect(() => {
    if (segmentToUpdate) {
      updateSegment({
        id: segmentToUpdate.id,
        labelText: segmentToUpdate.labelText,
        startTime: segmentToUpdate.startTime,
        endTime: segmentToUpdate.endTime,
        color: segmentToUpdate.color,
      })
        .then((response) => {
          if (response?.data) {
            const segmentUpdated = response?.data;
            const indexToUpdate = findIndex(segments, {
              id: segmentUpdated.id,
            });
            segments.splice(indexToUpdate, 1, segmentUpdated);
            setSegments([]);
            setSegments(segments);
          }
        })
        .catch((err) => {
          toast.error("error al actualizar el segmento");
        });
    }
  }, [segmentToUpdate]);

  const clearSegments = () => {
    setSegments([]);
  };

  useEffect(() => {
    if (onClose) {
      clearSegments();
    }
  }, [onClose]);

  useEffect(() => {
    if (onLoad) {
      loadSegments();
    }
  }, [onLoad]);

  const deleteSegment = (e, segment) => {
    const segmentToDelete = segment.selected;

    deleteSegmentById(segmentToDelete.id)
      .then((response) => {
        toast.success(`El segmento ${segmentToDelete.labelText} fue borrado`);
        loadSegments();
        onDeleteSegment(e, segment); //envia señal al waveTab
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="segment-tab">
      <Table inverted className="segment-list">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Inicio</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Fin</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(segments, (segment) => (
            <SegmentRow
              key={segment.id}
              segment={segment}
              onDeleteSegment={deleteSegment}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function SegmentRow(props) {
  const { segment, onDeleteSegment } = props;
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
          <Table.Cell textAlign="right">
            {truncate2decimal(segment.startTime)}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {truncate2decimal(segment.endTime)}
          </Table.Cell>
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
