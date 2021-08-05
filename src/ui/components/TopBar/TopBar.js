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

  const onSetting = () => {
    console.log("onSetting");
    setOpenSettingModal(true);
  };

  const onPresentation = () => {
    console.log("onPresentation");
    setOpenPresentationModal(true);
  };

  return (
    <>
      <div className="top-bar-container">
        <Menu className="top-bar-general">
          <Button tabIndex="-1" className="audio-lab-button">
            <b>AUDIO</b>
            <b>LAB</b>
          </Button>
          <Menu.Menu position="right">
            <Dropdown
              tabIndex="-1"
              item
              simple
              icon="setting"
              direction="right"
              className="dropdown-setting"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Presentación"
                  onClick={() => onPresentation()}
                />
                <Dropdown.Item
                  text="Configuración"
                  onClick={() => onSetting()}
                />
                <Dropdown.Divider />
                <Dropdown.Item text="Cerrar" onClick={() => onClose()} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
      <SettingModal
        openSettingModal={openSettingModal}
        setOpenSettingModal={setOpenSettingModal}
      />
      <PresentationWizardModal
        openPresentationModal={openPresentationModal}
        setOpenPresentationModal={setOpenPresentationModal}
      />
    </>
  );
}
