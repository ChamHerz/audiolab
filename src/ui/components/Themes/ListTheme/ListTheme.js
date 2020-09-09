import React from "react";
import { Button, Grid } from "semantic-ui-react";
import HeaderTheme from "../HeaderTheme";

import "./ListTheme.scss";

export default function ListTheme(props){
    const { setSelectedForm } = props;
    return (
        <div className="list-theme">
            <HeaderTheme />
            <Grid className="list-theme">
                <Grid.Row>
                    <Grid.Column width={3}>
                        <h2>Menu Left</h2>
                        <Button
                            className="new-theme"
                            onClick={() => setSelectedForm("new")}
                        >
                            Nuevo tema
                        </Button>
                    </Grid.Column>

                    <Grid.Column className="content" width={13}>
                        <h2>Contenido</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}