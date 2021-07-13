import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Table } from "semantic-ui-react";
import { listCompany } from "../../../api/company";
import { map } from "lodash";

import "./ListCompany.scss";

export default function ListCompany(props) {
    const { setSelectedForm, setCompany } = props;
    const [ companies, setCompanies ] = useState([]);

    useEffect(() => {
        listCompany().then((response) => {
            if(response?.data) {
                const arrayCompanies = [];
                map(response?.data, (company) => {
                    arrayCompanies.push(company);
                });
                setCompanies(response.data);
            }
        });
    }, []);

    return (
        <div className="list-theme">
            <Grid className="list-theme">
                <Grid.Row>
                    <Table inverted className="table-companies">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Empresa</Table.HeaderCell>
                                <Table.HeaderCell>Razon social</Table.HeaderCell>
                                <Table.HeaderCell>CUIT</Table.HeaderCell>
                                <Table.HeaderCell>Descripcion</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {map(companies, (company) => (
                                <Company
                                    key={company.id}
                                    company={company}
                                    setCompany={setCompany}
                                />
                            ))}
                        </Table.Body>
                    </Table>

                </Grid.Row>
            </Grid>

        </div>
    );
}

function DeleteCompany(companyId){
    console.log("Borrado company con id:", companyId);
}

function Company(props) {
    const { company, setCompany } = props;

    const onCompany = () => {
        setCompany(company);
    };

    return(
        <Table.Row>
            <Table.Cell>{company.fantasyName}</Table.Cell>
            <Table.Cell>{company.companyName}</Table.Cell>
            <Table.Cell>{company.CUIT}</Table.Cell>
            <Table.Cell>{company.description}</Table.Cell>
            <Table.Cell collapsing>
                <Button icon>
                    <Icon name="edit"></Icon>
                </Button>
            </Table.Cell>

            <Table.Cell collapsing>
                <Button icon onClick={() => DeleteCompany(company.id)}>
                    <Icon name='trash' />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}