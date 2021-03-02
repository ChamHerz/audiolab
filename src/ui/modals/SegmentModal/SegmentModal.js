import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { getMaxId } from "../../api/segment";

import "./SegmentModal.scss";

export default function SegmentModal(props) {
  const {
    openSegmentModal,
    setOpenSegmentModal,
    peaks,
    onAddSegment,
    segmentToUpdate,
    updateSegment,
  } = props;
  const [formData, setFormData] = useState(initialValueForm());

  useEffect(() => {
    if (segmentToUpdate) {
      setFormData(segmentToUpdate);
    }
  }, [segmentToUpdate]);

  const onSubmit = () => {
    if (!formData.labelText && formData.labelText === "") {
      toast.warning("Añade un nombre al segmento");
    } else {
      if (segmentToUpdate) {
        const segment = peaks.segments.getSegment(formData.id);
        segment.update({ labelText: formData.labelText });

        updateSegment(formData);
        setOpenSegmentModal(false);
      } else {
        //es nuevo
        getMaxId()
          .then((response) => {
            const newIdToAdd = response.data.segmentId + 1;

            peaks.segments.add({
              id: newIdToAdd,
              startTime: peaks.player.getCurrentTime(),
              endTime: peaks.player.getCurrentTime() + 5,
              labelText: formData.labelText,
              editable: true,
            });

            onAddSegment(peaks.segments.getSegment(newIdToAdd));
            setOpenSegmentModal(false);
          })
          .catch((err) => {
            console.log("error en segmento", err);
          });
      }
    }
  };

  return (
    <Modal
      size="mini"
      className="basic-modal"
      onClose={() => setOpenSegmentModal(false)}
      onOpen={() => setOpenSegmentModal(true)}
      open={openSegmentModal}
      trigger={<Button>Agregar Segmento</Button>}
    >
      {!segmentToUpdate ? (
        <>
          <Modal.Header>Nuevo Segmento</Modal.Header>
          <Modal.Content>
            <Form className="add-segment-form" onSubmit={onSubmit}>
              <Form.Field className="labelText" control={Input}>
                <Input
                  autoFocus
                  placeholder="Nombre del segmento"
                  onChange={(e) => setFormData({ labelText: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Crear segmento"
              labelPosition="right"
              icon="checkmark"
              onClick={() => onSubmit()}
              positive
            />
          </Modal.Actions>
        </>
      ) : (
        <>
          <Modal.Header>Editar Segmento</Modal.Header>
          <Modal.Content>
            <Form className="add-segment-form" onSubmit={onSubmit}>
              <Form.Field className="labelText" control={Input}>
                <Input
                  autoFocus
                  placeholder="Nombre del segmento"
                  onChange={(e) =>
                    setFormData({ ...formData, labelText: e.target.value })
                  }
                  defaultValue={formData.labelText}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Actualizar segmento"
              labelPosition="right"
              icon="checkmark"
              onClick={() => onSubmit()}
              positive
            />
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
}

function initialValueForm() {
  return {
    labelText: "",
  };
}
