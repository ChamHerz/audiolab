import React, { useState } from 'react';
import { Form, Icon, Input, Loader, Button, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";

export default  function EditTheme( props ) {
    const [formData, setFormData ] = useState(initialValueForm());
    const [isLoading, setIsLoading ] = useState(false);


    const resetForm = () => {
        setFormData(initialValueForm());
    }

    const onSubmit = () => {
        console.log("OK")
    }

    return(
        <>
        <Form className="ui-form" onSubmit={onSubmit}>
         <Form.Field>
             <Input
                 placeholder="Nombre del tema"
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
             />
         </Form.Field>

         <Form.Field>
            <Input
                placeholder="Descripcion"
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
         </Form.Field>
         <Grid>
             <Grid.Column textAlign="right">
                 <Button type="submit" className="ui button" loading={isLoading}>Guardar Tema</Button>
                 <Button className="ui button">Cancelar</Button>
             </Grid.Column>
         </Grid>

        </Form>
    </>)
}

function initialValueForm() {
    return {
        name: "",
        description: ""
    };
}