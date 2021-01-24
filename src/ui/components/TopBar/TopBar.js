import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Menu, Dropdown } from "semantic-ui-react";

import "./TopBar.scss";

export default function TopBar(props) {
  const onSetting = () => {
    console.log("click en setting");
  };

  const options = [
    { key: 1, text: "This is a super long item", value: 1 },
    { key: 2, text: "Dropdown direction can help", value: 2 },
    { key: 3, text: "Items are kept within view", value: 3 },
  ];

  return (
    <Menu>
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
            <Dropdown.Item text="Configuración" onClick={() => onSetting()} />
            <Dropdown.Divider />
            <Dropdown.Item text="Soporte" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}
