import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderTheme.scss";
import LogoNameWhite from "../../../assets/png/logo-name-white.png";

export default function HeaderTheme(props){
    const { selectedForm, setSelectedForm } = props;
    return (
        <div className="header-theme">
            <img src={LogoNameWhite} alt="AudioLab" />
            {selectedForm === "new" ? (
                <Button
                    className="List-theme-button"
                    onClick={() => setSelectedForm("list")}
                >
                    Listar Temas
                </Button>
                ) : (
                    <h2>no mostrar</h2>
                )}
        </div>
    );
}