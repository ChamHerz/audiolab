import React, { useState } from  'react';
import { Form, Icon, Input, Table, Loader, Button, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";
import { newTheme } from "../../../api/theme";

import "./NewTheme.scss";

export default function ThemeModal(props) {
    /*const { openThemeModal, setOpenModal, isInsert, themeModel, themeId } = props;*/
    const { isInsert, themeModel, themeId } = props;
    const [formData, setFormData ] = useState(initialValueForm( isInsert, themeModel));
    const [isLoading, setIsLoading] = useState(false);
    console.log("los props:", props);
    const resetForm = () => {
        setFormData(initialValueForm( isInsert, themeModel ));
    }

    const onSubmit = () => {
        if (isInsert) {
            InsertNewTheme();
        } else {
            UpdateTheme();
        };

    };

    const InsertNewTheme = () => {
        if(!formData.name) {
            toast.warning("Completar el nombre del tema");
        } else {
            setIsLoading(true);
            newTheme({
                description: formData.description,
                name: formData.name
            })
                .then(() => {
                    toast.success("Tema creado exitosamente.");
                    resetForm();
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    setIsLoading(false);
                })
        }
    }

    const UpdateTheme = () => {
        if(!formData.name) {
            toast.warning("Completar el nombre del tema");
        } else {
            setIsLoading(true);
            UpdateTheme({
                id: themeId,
                name: formData.name,
                description: formData.description
            })
                .then(() => {
                    toast.success("Tema modificado exitosamente.");
                    resetForm();
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    setIsLoading(false);
                })
        }
    };

    return(
        <>
            <Form className="ui-form" onSubmit={onSubmit}>
                <h4 className="ui dividing header">Temas</h4>
                <Form.Field>
                    <Input
                        placeholder="Nombre del tema"
                        value = {formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <Input
                        placeholder="Descripcion"
                        value = {formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                     />
                </Form.Field>
                <Grid>
                    <Grid.Column textAlign="right">
                        <Button type="submit" className="ui button" loading={isLoading}> {isInsert ? "Crear Tema" : " Guardar"} </Button>
                        <Button className="ui button">Cancelar</Button>
                    </Grid.Column>
                </Grid>

            </Form>

        </>
    )

}

function initialValueForm( isInsert, themeModel ) {
    if( isInsert ) {
        return {
            name: "",
            description: ""
        }
    } else {
        return {
            name: themeModel.name,
            description: themeModel.description,
        }
    };
}