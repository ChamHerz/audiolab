import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button, Grid, Modal } from "semantic-ui-react";
import { newTheme }  from "../../../api/theme";
import { toast } from "react-toastify";
import ListTheme from "../../Themes/ListTheme";
import NewTheme from "../../Themes/NewTheme";

export default function Theme(props) {
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewTheme, setIsNewTheme] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handlerIsNewTheme = () => {
        setIsNewTheme(!isNewTheme);
    }

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit = () => {
        if (!formData.name) {
            toast.warning("Completar el nombre del tema");
        } else {
            setIsLoading(true);
            newTheme({
                description: formData.description,
                name: formData.name
            })
                .then(() => {
                    toast.success("Tema creado correctamente.");
                    resetForm();
                    setIsLoading(false);
                    handlerIsNewTheme();
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    setIsLoading(false);
                });
        }
    }

    return (
        <>
                <div className="listTheme">

                    <ListTheme/>
                    <Grid>
                        <Grid.Column textAlign="right">
                            <Modal
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                open={open}
                                trigger={
                                    <Button className="ui common button" onClick={handlerIsNewTheme}>Nuevo Tema</Button>
                                }
                            >
                                <Modal.Content>
                                    <NewTheme
                                     isInsert = { true }
                                    />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => setOpen(false)}>
                                        Cerrar
                                    </Button>
                                </Modal.Actions>
                            </Modal>


                        </Grid.Column>
                    </Grid>
                </div>
        </>)
}

function initialValueForm() {
    return {
        name: "",
        description: ""
    };
}