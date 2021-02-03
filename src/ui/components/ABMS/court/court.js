import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button, Grid } from "semantic-ui-react";
import { newCourt } from "../../../api/court";
import { toast } from "react-toastify";
import ListCourt from  "../../Courts/ListCourt";

export default function Court(props){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewCourt, setIsNewCourt] = useState(false);

    const handlerIsNewCourt= () => {
        setIsNewCourt(!isNewCourt);
    }

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit = () => {
        if(!formData.name) {
            toast.warning("Completar el nombre del juzgado");
        } else {
            setIsLoading(true);
            newCourt({
                name: formData.name,
                competence: formData.competence,
                location: formData.location,
                street: formData.street,
                streetNumber: formData.streetNumber,
                postalCode: formData.postalCode
            })
                .then(() => {
                    toast.success("Empresa creada correctamente.");
                    resetForm();
                    setIsLoading(false);
                    handlerIsNewCourt();
                })
            .catch((error) => {
                toast.error(error.response.data.message);
                setIsLoading(false);

            });
        }
    }

    return(
        <>
            {isNewCourt ?
                <Form className="ui-form" onSubmit={onSubmit}>
                        <h4 className="ui dividing header">Juzgados</h4>
                    <Form.Field>
                        <Input
                            placeholder="Juzgado"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Competencia Territorial"
                            onChange={(e) => setFormData( {...formData, competence: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Asiento"
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Calle"
                            onChange={(e) => setFormData({...formData, street: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Nro.Calle"
                            onChange={(e) => setFormData({...formData, streetNumber:e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Codigo Postal"
                            onChange={(e)=> setFormData({...formData, codigoPostal:e.target.value})}
                        />
                    </Form.Field>

                    <Grid>
                        <Grid.Column textAlign="right">
                            <Button type="submit" className="ui button" loading={isLoading}>Crear Juzgado</Button>
                            <Button className="ui button" onClick={handlerIsNewCourt}>Cancelar</Button>
                        </Grid.Column>
                    </Grid>
                </Form> :
                <div className="listCourt">
                    <ListCourt />
                    <Grid>
                        <Grid.Column textAlign="right">
                            <Button className="ui common button" onClick={handlerIsNewCourt}>Nuevo Juzgado</Button>
                        </Grid.Column>
                    </Grid>

                </div>}
        </>)
}

function initialValueForm() {
    return {
        name : "",
        competence : "",
        location : "",
        street :"",
        streetNumber :"",
        postalCode :""

    }
}