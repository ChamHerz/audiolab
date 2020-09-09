import React, { useState } from "react";
import HeaderTheme from "../HeaderTheme/HeaderTheme";

import {
    Form,
    Button,
    Input,
    FormGroup
} from "semantic-ui-react";

export default function AddThemeForm(props){
    const { setSelectedForm, selectedForm } = props;
    const [description, setDescription] = useState(null);
    const [formData, setFormData ] = useState(null);

    const onSubmit = () =>{
        console.log(formData);
    };
    const resetForm= () => {
        setFormData(initialValueForm);
    };

    return (
        <div>
            <HeaderTheme
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
            />
            <Form className="add-theme-form" onSubmit={onSubmit}>
                <FormGroup>
                    <Form.Field className="theme-inputs" width={11}>
                        <Input
                            placeholder="Tema"
                            onChange={(e) => setFormData( {...formData, name: e.target.value})} />
                    </Form.Field>
                </FormGroup>
                <Button type="submit">
                    Crear tema
                </Button>
            </Form>
        </div>
    );
}

function initialValueForm() {
    return {
        description:"",
    }
}