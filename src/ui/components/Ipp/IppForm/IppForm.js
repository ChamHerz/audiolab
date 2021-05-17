import React, { useState } from "react";
import { Button, Form, Grid, Input } from "semantic-ui-react";

import "./IppForm.scss";
import { toast } from "react-toastify";
import { newIpp } from "../../../api/ipp";

export default function IppForm(props) {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const { setShowIppForm } = props;

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    if (!formData.processNumber) {
      toast.warning("Completar el número de procesos");
    } else {
      setIsLoading(true);
      newIpp({
        processNumber: formData.processNumber,
        startDate: formData.startDate,
        functionalUnit: formData.functionalUnit,
        court: formData.court,
        crime: formData.crime,
      })
        .then(() => {
          toast.success("Ipp creada correctamente.");
          resetForm();
          setIsLoading(false);
          setShowIppForm(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form className="ui-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Número de proceso"
          onChange={(e) =>
            setFormData({ ...formData, processNumber: e.target.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Fecha de Inicio"
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Unidad Funcional"
          onChange={(e) =>
            setFormData({ ...formData, functionalUnit: e.target.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Juzgado de garantias"
          onChange={(e) => setFormData({ ...formData, court: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Delito"
          onChange={(e) => setFormData({ ...formData, crime: e.target.value })}
        />
      </Form.Field>
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" className="ui button" loading={isLoading}>
            Crear Ipp
          </Button>
          <Button className="ui button" onClick={() => setShowIppForm(false)}>
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

function initialValueForm() {
  return {
    processNumber: "",
    startDate: "",
    functionalUnit: "",
    court: "",
    crime: "",
  };
}
