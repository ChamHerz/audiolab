import React, { useState } from "react";
import BackGroundProject from "../../assets/jpg/backgorund-projects.jpg";
import ListTheme from "../../components/Themes/ListTheme";
import AddThemeForm from "../../components/Themes/AddThemeForm";

import "./Themes.scss";
import {List} from "semantic-ui-react";

export default function Themes(props) {
    const [selectedForm, setSelectedForm] = useState(null);

    const handlerForm = () => {

        switch (selectedForm) {
            case "new":
                return(
                    <AddThemeForm
                        setSelectedForm={setSelectedForm}
                        selectedForm={selectedForm}
                    />
                );
            case "list":
            default:
                return <ListTheme setSelectedForm={setSelectedForm} />;
        }
    };

    return (
        <div
            className="theme"
            style={{backgroundImage:`url(${BackGroundProject}` }}>
            <div className="project__dark" />
            <div className="project__box">{handlerForm()}</div>

        </div>
    )
}