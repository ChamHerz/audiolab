import React from "react";
import HeaderProject from "../HeaderProject/HeaderProject";

export default function AddProjectForm(props) {
  const { setSelectedForm, selectedForm } = props;
  return (
    <div>
      <HeaderProject
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <h1>Soy AddProjectForm</h1>
    </div>
  );
}
