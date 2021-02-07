import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import { listCourt} from "../../../api/court";
import { map } from "lodash";

import "./ListCourt.scss";

export default function ListCourt(props) {
    const { setSelectedForm, setCourt } = props;
    const [ courts, setCourts ] = useState([]);

    useEffect(() => {
        listCourt().then((response) => {
            if (response?.data) {
                const arrayCourts= [];
                map(response?.data, (court) => {
                    arrayCourts.push(court);
                });
                setCourts(response.data);
            }
        });
    },[]);

    return (
        <div className= "list-court">
            <Grid className="list-court">
                <Grid.Row>
                    <Table inverted className="table-courts">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Juzgado</Table.HeaderCell>
                                <Table.HeaderCell>Competencia</Table.HeaderCell>
                                <Table.HeaderCell>Asiento</Table.HeaderCell>
                                <Table.HeaderCell>Calle</Table.HeaderCell>
                                <Table.HeaderCell>Nro.</Table.HeaderCell>
                                <Table.HeaderCell>CP</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {map(courts, (court) => (
                                <Court
                                    key={court.id}
                                    court={court}
                                    setCourt={setCourt}
                                />
                            ))}
                        </Table.Body>
                    </Table>

                </Grid.Row>
            </Grid>
        </div>
    );
}

function DeleteCourt(courtId){
    console.log("Borrado court con id:", courtId);
}

function Court(props) {
    const { court, setCourt } = props;

    const onCourt = () => {
        setCourt(court);
    };

    return(
        <Table.Row>
            <Table.Cell>{court.name}</Table.Cell>
            <Table.Cell>{court.competence}</Table.Cell>
            <Table.Cell>{court.location}</Table.Cell>
            <Table.Cell>{court.street}</Table.Cell>
            <Table.Cell>{court.streetNumber}</Table.Cell>
            <Table.Cell>{court.postalCode}</Table.Cell>

            <Table.Cell collapsing>
                <Button icon>
                    <Icon name="edit"></Icon>
                </Button>
            </Table.Cell>

            <Table.Cell collapsing>
                <Button icon onClick={() => DeleteCourt(court.id)}>
                    <Icon name='trash' />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}