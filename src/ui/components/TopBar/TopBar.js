import React from "react";
import { Menu, Dropdown, Grid, Icon, Table } from "semantic-ui-react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import MultipleAbm from "../MultipleAbm";

import "./TopBar.scss";

export default function TopBar(props) {
  const { setProject } = props;
  const [open, setOpen] = React.useState(false);

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
          <Menu.Menu position="right">
            <Dropdown
              item
              simple
              icon="setting"
              direction="right"
              className="dropdown-setting"
            >
              <Dropdown.Menu>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Dropdown.Item text="Configuración" />}
                >
                  <Modal.Content>
                    <MultipleAbm />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                      Cerrar
                    </Button>
                  </Modal.Actions>
                </Modal>
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
