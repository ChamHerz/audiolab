import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { getMaxId } from "../../api/label";

import "./LabelModal.scss";

export default function LabelModal(props) {
  const {
    openLabelModal,
    setOpenLabelModal,
    peaks,
    onAddLabel,
    labelToUpdate,
    updateLabel,
  } = props;
  const [formData, setFormData] = useState(initialValueForm());

  useEffect(() => {
    if (labelToUpdate) {
      setFormData(labelToUpdate);
    }
  }, [labelToUpdate]);

  const onSubmit = () => {
    if (!formData.labelText && formData.labelText === "") {
      toast.warning("Añade un nombre a la etiqueta");
    } else {
      if (labelToUpdate) {
        const label = peaks.points.getPoint(formData.id);
        label.update({ labelText: formData.labelText });
        updateLabel(formData);
        setOpenLabelModal(false);
      } else {
        //es nuevo
        getMaxId()
          .then((response) => {
            const newIdToAdd = response.data.labelId + 1;

            peaks.points.add({
              id: newIdToAdd,
              time: peaks.player.getCurrentTime(),
              labelText: formData.labelText,
              editable: true,
              color: "#FF0000",
            });

            onAddLabel(peaks.points.getPoint(newIdToAdd));
            console.log("agregar pount", peaks.points.getPoint(newIdToAdd));
            setOpenLabelModal(false);
          })
          .catch((err) => {
            console.log("error en etiqueta", err);
          });
      }
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
      {!labelToUpdate ? (
        <>
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
        </>
      ) : (
        <>
          <Modal.Header>Editar Etiqueta</Modal.Header>
          <Modal.Content>
            <Form className="add-label-form" onSubmit={onSubmit}>
              <Form.Field className="labelText" control={Input}>
                <Input
                  autoFocus
                  placeholder="Nombre de la etiqueta"
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
              content="Actualizar etiqueta"
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
