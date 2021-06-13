import React from "react";
import { Button, Modal } from "semantic-ui-react";
import IppSelectList from "../../components/Ipp/IppSelectList";

import "./IppListModal.scss";

export default function IppListModal(props) {
  const { openIppListModal, setOpenIppListModal, onIppSelect } = props;

  const onSubmit = () => {
    console.log("selected");
  };

  const onDoubleClickIpp = (e, ipp) => {
    onIppSelect(ipp);
  };

  return (
    <Modal
      className="basic-modal"
      onClose={() => setOpenIppListModal(false)}
      onOpen={() => setOpenIppListModal(true)}
      open={openIppListModal}
    >
      <Modal.Header>Seleccionar una Ipp</Modal.Header>
      <Modal.Content>
        <IppSelectList onDoubleClickIpp={onDoubleClickIpp} />
      </Modal.Content>
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
