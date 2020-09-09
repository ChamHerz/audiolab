import React, { useState } from "react";
import HeaderProject from "../HeaderProject/HeaderProject";
import { Form, Input, Button, Grid } from "semantic-ui-react";
import { newProject } from "../../../api/project";
import { toast } from "react-toastify";

import "./AddProjectForm.scss";

export default function AddProjectForm(props) {
  const { setSelectedForm, selectedForm } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    console.log("onSubmit");
    if (!formData.name) {
      toast.warning("Añade el nombre del proyecto");
    } else {
      setIsLoading(true);
      newProject({
        name: formData.name,
        description: formData.description,
      })
        .then(() => {
          toast.success("Proyecto creado correctamente.");
          resetForm();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <HeaderProject
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <Form className="add-project-form" onSubmit={onSubmit}>
        <Form.Field className="name-project">
          <Input
            placeholder="Nombre del proyecto"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Field>
        <Form.Field className="description-project">
          <Input
            placeholder="Descripción del proyecto"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Field>
        <Grid>
          <Grid.Column textAlign="right">
            <Button typo="submit" loading={isLoading}>
              Crear Proyecto
            </Button>
            <Button type="button" onClick={() => setSelectedForm("list")}>
              Cancelar
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
}

function initialValueForm() {
  return {
    name: "",
    description: null,
  };
}
