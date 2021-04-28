import React, { useState, useCallback } from "react";
import { Form, Input, Button, Grid, Image } from "semantic-ui-react";
import { newInterlocutor } from "../../../api/interlocutor";
import { toast } from "react-toastify";
import ListInterlocutor from "../../Interlocutors/ListInterlocutor";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../assets/png/no-image.png";

import "./interlocutor.scss";

export default function Interlocutor() {
  const [formData, setFormData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);
  const [isNewInterlocutor, setIsNewInterlocutor] = useState(false);
  const [interlocutorPicture, setInterlocutorPicture] = useState(null);

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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file", file);
    /*setFile(file);
    setAlbumImage(URL.createObjectURL(file));*/
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <>
      {isNewInterlocutor ? (
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
