import React from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import MultipleAbm from "../../components/MultipleAbm/MultipleAbm";

export default function SettingModal(props) {
  const { openSettingModal, setOpenSettingModal } = props;

  return (
    <Modal
      onClose={() => setOpenSettingModal(false)}
      onOpen={() => setOpenSettingModal(true)}
      open={openSettingModal}
    >
      <Modal.Content>
        <MultipleAbm />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpenSettingModal(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
