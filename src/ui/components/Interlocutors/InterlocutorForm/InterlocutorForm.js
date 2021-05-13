import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, Grid, Image, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { newInterlocutor, updateInterlocutor } from "../../../api/interlocutor";
import { useDropzone } from "react-dropzone";
import { copyFile, openFile, readContent } from "../../../utils/files";
import { v4 as uuidv4 } from "uuid";

import NoImage from "../../../assets/png/no-image.png";
import "./InterlocutorForm.scss";

export default function InterlocutorForm(props) {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const [interlocutorPicture, setInterlocutorPicture] = useState(null);
  const [file, setFile] = useState(null);
  const { setShowInterlocutorForm, interlocutorToEdit } = props;

  useEffect(() => {
    if (interlocutorToEdit) {
      console.log("se cambio");
      setFormData(interlocutorToEdit);
      if (interlocutorToEdit.picture) {
        setInterlocutorPicture("images/" + interlocutorToEdit.picture);
      }
    }
  }, [interlocutorToEdit]);

  const resetForm = () => {
    setFormData(initialValueForm());
  };

  const onSubmit = () => {
    let fileName = null;
    if (file) {
      fileName = uuidv4();
      copyFile(file.path, fileName);
    }

    if (!formData.alias) {
      toast.warning("Completar el alias del interlocutor|");
    } else {
      setIsLoading(true);
      if (interlocutorToEdit) {
        console.log("edit", formData);
        updateInterlocutor({
          id: formData.id,
          name: formData.name,
          lastname: formData.lastname,
          dni: formData.dni,
          alias: formData.alias,
          picture: file ? fileName : NoImage,
        })
          .then(() => {
            toast.success("Interlocutor modificado correctamente.");
            resetForm();
            setIsLoading(false);
            setShowInterlocutorForm(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setIsLoading(false);
          });
      } else {
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
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file", file);
    setFile(file);
    setInterlocutorPicture(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return interlocutorToEdit ? (
    <Form className="add-interlocutor-form" onSubmit={onSubmit}>
      <Grid className="image-with-name">
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
            Editar Interlocutor
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
      <Grid className="image-with-name">
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
