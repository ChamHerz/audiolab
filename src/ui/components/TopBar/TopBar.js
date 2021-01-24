import React from "react";
import {Grid, Icon} from "semantic-ui-react";

import "./TopBar.scss";

export default function TopBar(props) {

    const onSetting = () => {
        console.log("click en setting");
    }

    return (
        <Grid className="top-bar">
            <Grid.Row>
                <Grid.Column width={14}>
                    <div>Soy TopBar</div>
                </Grid.Column>
                <Grid.Column width={2} align="right">
                    <Icon className='setting-icon'
                          name='setting'
                          size='big'
                          onClick={() => onSetting()}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
