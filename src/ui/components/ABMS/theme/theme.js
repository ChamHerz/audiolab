import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button, Grid } from "semantic-ui-react";
import { newTheme }  from "../../../api/theme";
import { toast } from "react-toastify";
import ListTheme from "../../Themes/ListTheme";

export default function Theme(props){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewTheme, setIsNewTheme] = useState(false);

    const handlerIsNewTheme = () => {
        setIsNewTheme(!isNewTheme);
    }

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit = () => {
        if(!formData.name) {
            toast.warning("Completar el nombre del tema");
        } else {
            setIsLoading(true);
            newTheme({
                name: formData.name,
                description: formData.description
            })
                .then(() => {
                    toast.success("Tema creado correctamente.");
                    resetForm();
                    setIsLoading(false);
                    handlerIsNewTheme();
                })
                .catch((error) =>{
                    toast.error(error.response.data.message);
                    setIsLoading(false);
                });
        }
    }

    return(
        <>
            {isNewTheme ?
                <Form className="ui-form" onSubmit={onSubmit}>
                    <h4 className="ui dividing header">Temas</h4>
                    <Form.Field>
                        <Input
                            placeholder="Nombre del tema"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Descripcion"
                            onChange={(e) =>
                                setFormData({...formData, description: e.target.value})}
                        />
                    </Form.Field>
                    <Grid>
                        <Grid.Column textAlign="right">
                            <Button type="submit" className="ui button" loading={isLoading} >Crear Tema</Button>
                            <Button className="ui button" onClick={handlerIsNewTheme}>Cancelar</Button>
                        </Grid.Column>
                    </Grid>
                </Form> :
                <div className="listTheme">

                    <ListTheme/>
                    <Grid>
                        <Grid.Column textAlign="right">
                            <Button className="ui common button" onClick={handlerIsNewTheme}>Nuevo Tema</Button>
                        </Grid.Column>
                    </Grid>
                </div>
            }
        </>)
}

function initialValueForm() {
    return {
        name: "",
        description: ""
    };
}