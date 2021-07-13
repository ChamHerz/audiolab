import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import ThemeList from "../../Themes/ThemeList";
import ThemeForm from "../../Themes/ThemeForm";

import "./theme.scss";

export default function Theme(props) {
  const [showThemeForm, setShowThemeForm] = useState(false);
  const [themeToEdit, setThemeToEdit] = useState(null);

  const newTheme = () => {
    setThemeToEdit(null);
    setShowThemeForm(true);
  };

  const onEditTheme = (theme) => {
    console.log("edit theme:", theme);
    setThemeToEdit(theme);
    setShowThemeForm(true);
  };

  return (
    <>
      {showThemeForm ? (
        <ThemeForm
          setShowThemeForm={setShowThemeForm}
          themeToEdit={themeToEdit}
        />
      ) : (
        <div className="listTheme">
          <ThemeList onEditTheme={onEditTheme} />
          <Grid>
            <Grid.Column textAlign="right">
              <Button className="ui common button" onClick={() => newTheme()}>
                Nuevo Tema
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}
