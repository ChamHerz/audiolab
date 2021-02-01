import React, { useState} from 'react';
import { Form, Icon, Input, Table, Loader, Button, Grid } from "semantic-ui-react";
import { newCompany } from "../../../api/company";
import { toast } from "react-toastify";
import ListCompany from "../../Companies/ListCompany";

export default function Company(props){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewCompany, setIsNewCompany] = useState(false);

    const handlerIsNewCompany = () => {
        setIsNewCompany(!isNewCompany);
    }

    const resetForm = () => {
        setFormData(initialValueForm());
    }

    const onSubmit = () => {
        if(!formData.fantasyName){
                toast.warning("Completar el nombre de fantasia de la empresa.");
            } else {
                setIsLoading(true);
                newCompany({
                    fantasyName: formData.fantasyName,
                    companyName: formData.companyName,
                    CUIT: formData.CUIT,
                    description: formData.description,
                })
                    .then(() => {
                        toast.success("Empresa creada correctamente.");
                        resetForm();
                        setIsLoading(false);
                        handlerIsNewCompany();
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                        setIsLoading(false);
                    });
           }
        }
    return(
        <>
            {isNewCompany ?
                <Form className="ui-form" onSubmit={onSubmit}>
                    <h4 className="ui dividing header">Empresas</h4>
                    <Form.Field>
                        <Input
                            placeholder="Nombre de fantasia"
                            onChange={(e) => setFormData({...formData, fantasyName: e.target.value})}
                         />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="Razon social"
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            placeholder="CUIT"
                            onChange={(e) =>
                                setFormData({...formData, CUIT: e.target.value})}
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
                        <Grid.Column textAlign="left">
                            <Button type="submit" className="ui button" loading={isLoading}>Crear Empresa</Button>
                            <Button className="ui button" onClick={handlerIsNewCompany}>Cancelar</Button>
                        </Grid.Column>
                    </Grid>
                </Form> :
                <div className="ListCompany">
                    <ListCompany/>
                    <Grid>
                        <Grid.Column textAlign="left">
                            <Button className="ui common button" onClick={handlerIsNewCompany}>Nueva Empresa</Button>
                        </Grid.Column>
                    </Grid>
                </div>
            }
        </>)
}

function initialValueForm() {
    return {
        fantasyName: "",
        companyName: "",
        CUIT: "",
        description: ""
    };
}
