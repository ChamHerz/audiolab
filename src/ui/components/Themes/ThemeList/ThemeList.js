import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import { deleteTheme, listTheme } from "../../../api/theme";
import { map } from "lodash";
import { toast } from "react-toastify";

import "./ThemeList.scss";

export default function ThemeList(props) {
  const { setSelectedForm, setTheme, onEditTheme } = props;
  const [themes, setThemes] = useState([]);
  const [reloadTable, setReloadTable] = useState(false);

  const loadThemes = () => {
    listTheme().then((response) => {
      if (response?.data) {
        console.log("temas", response?.data);
        const arrayThemes = [];
        map(response?.data, (theme) => {
          arrayThemes.push(theme);
        });
        setThemes(response.data);
      }
    });
  };

  useEffect(() => {
    loadThemes();
  }, []);

  return (
    <>
      <div className="list-theme">
        <Grid className="list-theme">
          <Grid.Row>
            <Table inverted className="table-themes">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Descripcion</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {map(themes, (theme) => (
                  <Theme
                    key={theme.id}
                    theme={theme}
                    setTheme={setTheme}
                    setReloadTable={setReloadTable}
                    loadThemes={loadThemes}
                    onEditTheme={onEditTheme}
                  />
                ))}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

function DeleteTheme(themeId, setReloadTable, loadThemes) {
  deleteTheme({
    id: themeId,
  })
    .then(() => {
      toast.success(" Tema borrado correctamente.");
      loadThemes();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
}

function Theme(props) {
  const { onEditTheme } = props;

  const {
    theme,
    setTheme,
    setReloadTable,
    loadThemes /*, handlerIsEditTheme */,
  } = props;

  const onTheme = () => {
    setTheme(theme);
  };

  return (
    <Table.Row>
      <Table.Cell>{theme.name}</Table.Cell>
      <Table.Cell>{theme.description}</Table.Cell>
      <Table.Cell collapsing>
        <Button icon onClick={() => onEditTheme(theme)}>
          <Icon name="edit" />
        </Button>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button
          icon
          onClick={() => DeleteTheme(theme.id, setReloadTable, loadThemes)}
        >
          <Icon name="trash" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
