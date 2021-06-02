import React from "react";

import "./InterlocutorListModal.scss";
import { Button, Modal } from "semantic-ui-react";

export default function InterlocutorListModal(props) {
  const { openInterlocutorListModal, setOpenInterlocutorListModal } = props;

  const onSubmit = () => {
    console.log("selected");
  };

  return (
    <Modal
      className="basic-modal"
      onClose={() => setOpenInterlocutorListModal(false)}
      onOpen={() => setOpenInterlocutorListModal(true)}
      open={openInterlocutorListModal}
    >
      <Modal.Header>Seleccionar un Interlocutor</Modal.Header>
      <Modal.Content>Lista de interlocuotores</Modal.Content>
      <Modal.Actions>
        <Button
          content="Seleccionar Interlocutor"
          labelPosition="right"
          icon="checkmark"
          onClick={() => onSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
