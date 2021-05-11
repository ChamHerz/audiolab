import React, { useState, useCallback } from "react";
import { Button, Form, Grid, Image, Input } from "semantic-ui-react";
import NoImage from "../../../assets/png/no-image.png";
import { toast } from "react-toastify";
import { newInterlocutor } from "../../../api/interlocutor";
import { useDropzone } from "react-dropzone";

import "./InterlocutorForm.scss";

export default function InterlocutorForm(props) {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const [interlocutorPicture, setInterlocutorPicture] = useState(null);
  const { setShowInterlocutorForm, interlocutorToEdit } = props;

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
          setShowInterlocutorForm(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file", file);
    setInterlocutorPicture(URL.createObjectURL(file));
    /*setFile(file);
    setAlbumImage(URL.createObjectURL(file));*/
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return interlocutorToEdit ? (
    <Form className="add-interlocutor-form" onSubmit={onSubmit}>
      <Grid>
        <Grid.Column width={4} className="left">
          <Form.Field className="interlocutor-picture">
            <div
              {...getRootProps()}
              className="picture"
              style={{
                backgroundImage: `url('${interlocutorPicture}`,
              }}
            />
            <input {...getInputProps()} />
            {!interlocutorPicture && <Image src={NoImage} />}
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={12} className="right">
          <Form.Field>
            <Input
              placeholder="Nombre"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              defaultValue={interlocutorToEdit.name}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Apellido"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              defaultValue={interlocutorToEdit.lastname}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Alias"
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
              defaultValue={interlocutorToEdit.alias}
            />
          </Form.Field>
        </Grid.Column>
      </Grid>
      <Form.Field>
        <Input
          placeholder="DNI"
          onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
          defaultValue={interlocutorToEdit.dni}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Picture"
          onChange={(e) =>
            setFormData({ ...formData, picture: e.target.value })
          }
          defaultValue={interlocutorToEdit.picture}
        />
      </Form.Field>
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" className="ui button" loading={isLoading}>
            Crear Interlocutor
          </Button>
          <Button
            className="ui button"
            onClick={() => setShowInterlocutorForm(false)}
          >
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  ) : (
    <Form className="add-interlocutor-form" onSubmit={onSubmit}>
      <Grid>
        <Grid.Column width={4} className="left">
          <Form.Field className="interlocutor-picture">
            <div
              {...getRootProps()}
              className="picture"
              style={{
                backgroundImage: `url('${interlocutorPicture}`,
              }}
            />
            <input {...getInputProps()} />
            {!interlocutorPicture && <Image src={NoImage} />}
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={12} className="right">
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
        </Grid.Column>
      </Grid>
      <Form.Field>
        <Input
          placeholder="DNI"
          onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
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
          <Button
            className="ui button"
            onClick={() => setShowInterlocutorForm(false)}
          >
            Cancelar
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
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
