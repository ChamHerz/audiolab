import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./TopBar.scss";
import SettingModal from "../../modals/SettingModal/SettingModal";
import PresentationWizardModal from "../../modals/PresentationWizardModal/PresentationWizardModal";

export default function TopBar(props) {
  const { setProject } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [openPresentationModal, setOpenPresentationModal] = useState(false);

  const onClose = () => {
    console.log("onClose");
    setProject(null);
  };

  return (
    <>
      <div className="top-bar-container">
        <Menu className="top-bar-general">
          <Button className="audio-lab-button">
            <b>AUDIO</b>
            <b>LAB</b>
          </Button>
          <Menu.Menu position="right"></Menu.Menu>
          <Menu.Menu position="right">
            <Dropdown
              item
              simple
              icon="setting"
              direction="right"
              className="dropdown-setting"
            >
              <Dropdown.Menu>
                <PresentationWizardModal
                  openPresentationModal={openPresentationModal}
                  setOpenPresentationModal={setOpenPresentationModal}
                />
                <SettingModal
                  openSettingModal={openSettingModal}
                  setOpenSettingModal={setOpenSettingModal}
                />
                <Dropdown.Divider />
                <Dropdown.Item text="Cerrar" onClick={() => onClose()} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    </>
  );
}
