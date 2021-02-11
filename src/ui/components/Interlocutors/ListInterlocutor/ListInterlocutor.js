import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import { deleteInterlocutor, listInterlocutor } from "../../../api/interlocutor";
import { map } from "lodash";
import { toast } from "react-toastify";

import "./ListInterlocutor.scss";


export default function ListInterlocutor(props) {
    const {setSelectedForm, setInterlocutor} = props;
    const [interlocutors, setInterlocutors] = useState([]);
    const [reloadTable, setReloadTable] = useState(false);
    const [ isEditInterlocutor, setIsEditInterlocutor ] = useState(false);

    const handlerIsEditInterlocutor = () => {
        setIsEditInterlocutor(!isEditInterlocutor);
    }

    const loadInterlocutors = () => {

        listInterlocutor().then((response) => {
            if (response?.data) {
                const arrayInterlocutors = [];
                map(response?.data, (interlocutor) => {
                    arrayInterlocutors.push(interlocutor);
                });
                setInterlocutors(response.data);
            }
        });
    }

    useEffect(() => {
        loadInterlocutors();
    }, []);

    return (
        <>
            <div className= "list-interlocutor">
                <Grid className="list-interlocutor">
                    <Grid.Row>
                        <Table inverted className="table-interlocutors">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Apellido</Table.HeaderCell>
                                    <Table.HeaderCell>DNI</Table.HeaderCell>
                                    <Table.HeaderCell>ALIAS</Table.HeaderCell>
                                    <Table.HeaderCell>Foto</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {map(interlocutors, (interlocutor) => (
                                    <Interlocutor
                                        key = {interlocutor.id}
                                        interlocutor = {interlocutor}
                                        setInterlocutor = {setInterlocutor}
                                        setReloadTable = {setReloadTable}
                                        loadInterlocutors = { loadInterlocutors }
                                        handlerIsEditInterlocutor = { handlerIsEditInterlocutor }
                                    />
                                ))}
                            </Table.Body>
                        </Table>

                    </Grid.Row>
                </Grid>
            </div>
        </>
    )
}

function DeleteInterlocutor ( interlocutorId, setReloadTable, loadInterlocutors ){
    deleteInterlocutor({
        id: interlocutorId,
    })
        .then(() => {
            toast.success(" Interlocutor borrado correctamente.");
            loadInterlocutors();
        })
        .catch((error) => {
            toast.error(error.response.data.message);
        })
}

function Interlocutor(props) {
    const { interlocutor, setInterlocutor, setReloadTable, loadInterlocutors, handlerIsEditInterlocutor } = props;

    const onInterlocutor = () => {
        setInterlocutor(interlocutor);
    };

    return (
        <Table.Row>
            <Table.Cell>{interlocutor.name}</Table.Cell>
            <Table.Cell>{interlocutor.lastname}</Table.Cell>
            <Table.Cell>{interlocutor.dni}</Table.Cell>
            <Table.Cell>{interlocutor.alias}</Table.Cell>
            <Table.Cell>{interlocutor.picture}</Table.Cell>
            <Table.Cell collapsing>
                <Button icon onClick={ handlerIsEditInterlocutor() }>
                    <Icon name="edit"></Icon>
                </Button>
            </Table.Cell>
            <Table.Cell collapsing>
                <Button icon onClick={() => DeleteInterlocutor(interlocutor.id, setReloadTable, loadInterlocutors)}>
                    <Icon name="trash" />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}