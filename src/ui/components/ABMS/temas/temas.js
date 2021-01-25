import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function Temas(){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit = () => {
        console.log("onSubmit");
        if(!formData.descripcion) {
            toast.warning("Completar la descripcion del tema");
        } else {
            setIsLoading(true);
          /*  newTheme({
                descripcion: formData.descripcion,
                observaciones: formData.observaciones
            })
                .then(() => {
                    toast.success("Tema creado correctamente.");
                    //resetForm();
                    setIsLoading(false);
                })
                .catch((error =>{
                    toast.error(error.response.data.message);
                    setIsLoading(false);
                } )*/
        }
    }

    return(
        <>
            <Form className="ui-form" onSubmit={onSubmit}>
                <h4 className="ui dividing header">Temas</h4>
                <Form.Field>
                    <Input
                        placeholder="Descripcion del tema"
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        />
                </Form.Field>

                <Form.Field>
                    <Input
                        placeholder="Observaciones"
                        onChange={(e) =>
                            setFormData({...formData, observaciones: e.target.value})}
                        />
                </Form.Field>
                <Button type="submit" className="ui button primary" loading={isLoading}>Crear Tema</Button>
            </Form>
        </>)
}

function initialValueForm() {
    return {
        descripcion: "",
        observaciones: ""
    };
}