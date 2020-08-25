import React, { useState } from "react";
import BackgroundProject from "../../assets/jpg/backgorund-projects.jpg";
import ListProject from "../../components/Projects/ListProject";
import AddProjectForm from "../../components/Projects/AddProjectForm";

import "./Projects.scss";

export default function Projects(props) {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "new":
        return (
          <AddProjectForm
            setSelectedForm={setSelectedForm}
            selectedForm={selectedForm}
          />
        );
      case "list":
      default:
        return <ListProject setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div
      className="project"
      style={{ backgroundImage: `url(${BackgroundProject})` }}
    >
      <div className="project__dark" />
      <div className="project__box">{handlerForm()}</div>
    </div>
  );
}
