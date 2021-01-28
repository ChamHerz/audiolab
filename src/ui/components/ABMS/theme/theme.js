import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button } from "semantic-ui-react";
import { newTheme }  from "../../../api/theme";
import { toast } from "react-toastify";
import ListTheme from "../../Themes/ListTheme";

export default function Theme(props){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewTheme, setIsNewTheme] = useState(false);

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
                    setIsNewTheme(false);
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
                    <Button type="submit" className="ui button" loading={isLoading}>Crear Tema</Button>
                </Form> :
                <>
                    <ListTheme/>
                    <Button>Nuevo Tema</Button>
                </>
            }
        </>)
}

function initialValueForm() {
    return {
        name: "",
        description: ""
    };
}