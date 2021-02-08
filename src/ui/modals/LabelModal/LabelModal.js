import React, { useState } from "react";
import { Button, Form, Input, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { getMaxId } from "../../api/label";

import "./LabelModal.scss";

export default function LabelModal(props) {
  const { openLabelModal, setOpenLabelModal, peaks, onAddLabel } = props;
  const [formData, setFormData] = useState(initialValueForm());

  const onSubmit = () => {
    if (!formData.labelText && formData.labelText === "") {
      toast.warning("Añade un nombre a la etiqueta");
    } else {
      getMaxId()
        .then((response) => {
          const newIdToAdd = response.data.labelId + 1;

          peaks.points.add({
            id: newIdToAdd,
            time: peaks.player.getCurrentTime(),
            labelText: formData.labelText,
            editable: true,
          });

          onAddLabel(peaks.points.getPoint(newIdToAdd));
          setOpenLabelModal(false);
        })
        .catch((err) => {
          console.log("error en etiqueta", err);
        });
    }
  };

  return (
    <Modal
      size="mini"
      className="basic-modal"
      onClose={() => setOpenLabelModal(false)}
      onOpen={() => setOpenLabelModal(true)}
      open={openLabelModal}
      trigger={<Button>Agregar Etiqueta</Button>}
    >
      <Modal.Header>Nueva Etiqueta</Modal.Header>
      <Modal.Content>
        <Form className="add-label-form" onSubmit={onSubmit}>
          <Form.Field className="labelText" control={Input}>
            <Input
              autoFocus
              placeholder="Nombre de la etiqueta"
              onChange={(e) => setFormData({ labelText: e.target.value })}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Crear etiqueta"
          labelPosition="right"
          icon="checkmark"
          onClick={() => onSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

function initialValueForm() {
  return {
    labelText: "",
  };
}
