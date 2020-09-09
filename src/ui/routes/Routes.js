import React from " react";
import { Switch, Route } from "react-router-dom";

//Pages
import Projects from "../pages/Projects";
import Themes from "../pages/Themes";

export default function Routes(props){
    const { user, setReloadApp } = props;
    return(
        <Switch>
            <Route path="/" exact>
                <Projects />
            </Route>

            <Route path="/projects" exact>
                <Projects />
            </Route>

            <Route path="/themes" exact>
                <Themes />
            </Route>
        </Switch>
    )

}