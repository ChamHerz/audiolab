import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Input } from "semantic-ui-react";
import moment from "moment";
import { toast } from "react-toastify";
import { newIpp, updateIpp } from "../../../api/ipp";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import "./IppForm.scss";

export default function IppForm(props) {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const { setShowIppForm, ippToEdit } = props;

  useEffect(() => {
    if (ippToEdit) {
      setFormData(ippToEdit);
      /*onChangeDate(null, {
        value: ippToEdit.date,
      });*/
    }
  }, [ippToEdit]);

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    if (!formData.processNumber) {
      toast.warning("Completar el número de procesos");
    } else {
      setIsLoading(true);
      if (ippToEdit) {
        console.log("edit", formData);
        updateIpp({
          id: formData.id,
          processNumber: formData.processNumber,
          startDate: formData.startDate,
          functionalUnit: formData.functionalUnit,
          court: formData.court,
          crime: formData.crime,
        })
          .then(() => {
            toast.success("Ipp modificado correctamente.");
            resetForm();
            setIsLoading(false);
            setShowIppForm(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setIsLoading(false);
          });
      } else {
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
    }
  };

  const onChangeDate = (event, data) => {
    setFormData({ ...formData, startDate: data.value });
  };

  return ippToEdit ? (
    <Form className="ui-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Número de proceso"
          onChange={(e) =>
            setFormData({ ...formData, processNumber: e.target.value })
          }
          defaultValue={ippToEdit.processNumber}
        />
      </Form.Field>
      <Form.Field>
        <SemanticDatepicker
          onChange={onChangeDate}
          format="DD/MM/YYYY"
          locale="es-ES"
          value={moment(ippToEdit.startDate).toDate()}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Unidad Funcional"
          onChange={(e) =>
            setFormData({ ...formData, functionalUnit: e.target.value })
          }
          defaultValue={ippToEdit.functionalUnit}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Juzgado de garantias"
          onChange={(e) => setFormData({ ...formData, court: e.target.value })}
          defaultValue={ippToEdit.court}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Delito"
          onChange={(e) => setFormData({ ...formData, crime: e.target.value })}
          defaultValue={ippToEdit.crime}
        />
      </Form.Field>
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" className="ui button" loading={isLoading}>
            Modificar Ipp
          </Button>
          <Button className="ui button" onClick={() => setShowIppForm(false)}>
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  ) : (
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
        <SemanticDatepicker
          onChange={onChangeDate}
          format="DD/MM/YYYY"
          locale="es-ES"
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
