import React from "react";

import "./IppListModal.scss";
import { Button, Modal } from "semantic-ui-react";

export default function IppListModal(props) {
  const { openIppListModal, setOpenIppListModal } = props;
  const onSubmit = () => {
    console.log("selected");
  };

  return (
    <Modal
      className="basic-modal"
      onClose={() => setOpenIppListModal(false)}
      onOpen={() => setOpenIppListModal(true)}
      open={openIppListModal}
    >
      <Modal.Header>Seleccionar una Ipp</Modal.Header>
      <Modal.Content>Aqui va la lista</Modal.Content>
      <Modal.Actions>
        <Button
          content="Seleccionar Ipp"
          labelPosition="right"
          icon="checkmark"
          onClick={() => onSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
