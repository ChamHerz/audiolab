import React from "react";
import {Menu, Dropdown, Grid, Icon, Table} from "semantic-ui-react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import MultipleAbm from "../MultipleAbm";

import "./TopBar.scss";

export default function TopBar(props) {
  const [open, setOpen] = React.useState(false);

  const options = [
    { key: 1, text: "This is a super long item", value: 1 },
    { key: 2, text: "Dropdown direction can help", value: 2 },
    { key: 3, text: "Items are kept within view", value: 3 },
  ];

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
                <Dropdown.Item>
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <Button className="setting-button">Configuración</Button>
                    }
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
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item text="Soporte" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    </>
  );
}
