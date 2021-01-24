import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import "./TopBar.scss";

export default function TopBar(props) {
  const [open, setOpen] = React.useState(false);

  const onSetting = () => {
    console.log("click en setting");
  };

  const options = [
    { key: 1, text: "This is a super long item", value: 1 },
    { key: 2, text: "Dropdown direction can help", value: 2 },
    { key: 3, text: "Items are kept within view", value: 3 },
  ];

  return (
    <>
      <Menu className="top-bar">
        <Dropdown
          item
          simple
          text="Left menu"
          direction="right"
          options={options}
        />
        <Menu.Menu position="right">
          <Dropdown item simple icon="setting" direction="right">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Button className="setting-button">Show Modal</Button>
                  }
                >
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content image>
                    <Image
                      size="medium"
                      src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                      wrapped
                    />
                    <Modal.Description>
                      <Header>Default Profile Image</Header>
                      <p>
                        We've found the following gravatar image associated with
                        your e-mail address.
                      </p>
                      <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                      Nope
                    </Button>
                    <Button
                      content="Yep, that's me"
                      labelPosition="right"
                      icon="checkmark"
                      onClick={() => setOpen(false)}
                      positive
                    />
                  </Modal.Actions>
                </Modal>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item text="Soporte" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </>
  );
}
