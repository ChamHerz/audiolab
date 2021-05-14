import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { newTheme, updateTheme } from "../../../api/theme";

import "./ThemeForm.scss";

export default function ThemeForm(props) {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const { setShowThemeForm, themeToEdit } = props;

  useEffect(() => {
    if (themeToEdit) {
      setFormData(themeToEdit);
    }
  }, [themeToEdit]);

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    if (!formData.name) {
      toast.warning("Completar el nombre del tema");
    } else {
      setIsLoading(true);
      if (themeToEdit) {
        updateTheme({
          id: formData.id,
          name: formData.name,
          description: formData.description,
        })
          .then(() => {
            toast.success("Tema modificado correctamente.");
            resetForm();
            setIsLoading(false);
            setShowThemeForm(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setIsLoading(false);
          });
      } else {
        newTheme({
          description: formData.description,
          name: formData.name,
        })
          .then(() => {
            toast.success("Tema creado correctamente.");
            resetForm();
            setIsLoading(false);
            setShowThemeForm(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setIsLoading(false);
          });
      }
    }
  };

  return themeToEdit ? (
    <Form className="ui-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Nombre del tema"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          defaultValue={themeToEdit.name}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Descripcion"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          defaultValue={themeToEdit.description}
        />
      </Form.Field>
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" className="ui button" loading={isLoading}>
            Editar Tema
          </Button>
          <Button className="ui button" onClick={() => setShowThemeForm(false)}>
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  ) : (
    <Form className="ui-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Nombre del tema"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>

      <Form.Field>
        <Input
          placeholder="Descripcion"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Form.Field>
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" className="ui button" loading={isLoading}>
            Crear Tema
          </Button>
          <Button className="ui button" onClick={() => setShowThemeForm(false)}>
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    description: "",
  };
}
