import React, { useState } from "react";
import HeaderProject from "../HeaderProject/HeaderProject";
import { Form, Input, Button, Grid } from "semantic-ui-react";
import { newProject } from "../../../api/project";

import "./AddProjectForm.scss";

export default function AddProjectForm(props) {
  const { setSelectedForm, selectedForm } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <HeaderProject
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <Form className="add-project-form">
        <Form.Field className="name-project">
          <Input
            placeholder="Nombre del proyecto"
            onChange={(e) => setFormData({ name: e.target.value })}
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
  };
}
