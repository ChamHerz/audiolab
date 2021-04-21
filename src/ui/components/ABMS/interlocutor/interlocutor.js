import React, { useState } from "react";
import {
  Form,
  Icon,
  Input,
  Table,
  Loader,
  Button,
  Grid,
} from "semantic-ui-react";
import { newInterlocutor } from "../../../api/interlocutor";
import { toast } from "react-toastify";
import ListInterlocutor from "../../Interlocutors/ListInterlocutor";
import { newTheme } from "../../../api/theme";

export default function Interlocutor() {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const [isNewInterlocutor, setIsNewInterlocutor] = useState(false);

  const handlerIsNewInterlocutor = () => {
    setIsNewInterlocutor(!isNewInterlocutor);
  };

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    if (!formData.alias) {
      toast.warning("Completar el alias del interlocutor|");
    } else {
      setIsLoading(true);
      newInterlocutor({
        name: formData.name,
        lastname: formData.lastname,
        dni: formData.dni,
        alias: formData.alias,
        picture: formData.picture,
      })
        .then(() => {
          toast.success("Interlocutor creado correctamente.");
          resetForm();
          setIsLoading(false);
          handlerIsNewInterlocutor();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isNewInterlocutor ? (
        <Form className="ui-form" onSubmit={onSubmit}>
          <Form.Field>
            <Input
              placeholder="Nombre"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Apellido"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Alias"
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <Input
              placeholder="DNI"
              onChange={(e) =>
                setFormData({ ...formData, dni: e.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <Input
              placeholder="Picture"
              onChange={(e) =>
                setFormData({ ...formData, picture: e.target.value })
              }
            />
          </Form.Field>
          <Grid>
            <Grid.Column textAlign="right">
              <Button type="submit" className="ui button" loading={isLoading}>
                Crear Interlocutor
              </Button>
              <Button className="ui button" onClick={handlerIsNewInterlocutor}>
                Cancelar
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      ) : (
        <div className="ListInterlocutor">
          <ListInterlocutor />
          <Grid>
            <Grid.Column textAlign="right">
              <Button
                className="ui common button"
                onClick={handlerIsNewInterlocutor}
              >
                Nuevo Interlocutor
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}

function initialValueForm() {
  return {
    nombre: "",
    apellido: "",
    dni: "",
    alias: "",
    picture: "",
  };
}
