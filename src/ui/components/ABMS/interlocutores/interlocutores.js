import React, { useState } from "react";
import { Form, Icon, Input, Table, Loader, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function Interlocutes(){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit= () => {
        console.log("onSubmit");
    }


return(
    <>
        <Form className="ui-form" onSubmit={{onSubmit}}>
            <Form.Field>
                <Input
                    placeholder="Nombre"
                    onChange={ (e) => setFormData({...formData, nombre: e.target.value })}
                />
            </Form.Field>

            <Form.Field>
                <Input
                    placeholder="Apellido"
                    onChange={ (e) => setFormData({...formData, apellido: e.target.value})}
                    />
            </Form.Field>

            <Form.Field>
                <Input
                    placeholder="Alias"
                    onChange={(e) => setFormData({...formData, alias: e.target.value})}
                />
            </Form.Field>

            <Form.Field>
                <Input
                    placeholder="DNI"
                    onChage={(e) => setFormData({...formData, DNI: e.target.value})}
                />
            </Form.Field>
            <Button type ="submit" className="ui button" loading={isLoading}>Crear Interlocutor</Button>
        </Form>
        </>)
}

function initialValueForm(){
    return {
        nombre: "",
        apellido:"",
        DNI:""
    };
}

