import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

import "./IppTab.scss";
import IppListModal from "../../../modals/IppListModal";
import IppSelected from "../IppSelected";
import { addIppToProject } from "../../../api/project";
import { findIppByProject } from "../../../api/ipp";

export default function IppTab(props) {
  const { project } = props;
  const [openIppListModal, setOpenIppListModal] = useState(false);
  const [showIppForm, setShowIppForm] = useState(false);
  const [ippSelected, setIppSelected] = useState(null);

  const loadIpp = () => {
    findIppByProject(project.id)
      .then((response) => {
        console.log("findIppByProject", response);
        if (response?.data && response?.data.length > 0) {
          setIppSelected(response?.data[0]);
          setShowIppForm(true);
        }
      })
      .catch((err) => {
        console.log("findIppByProject error", err);
      });
  };

  useEffect(() => {
    if (project) {
      loadIpp();
    }
  }, []);

  const onIppRelationClick = () => {
    setOpenIppListModal(true);
  };

  const onIppSelect = (ipp) => {
    console.log("ipp", ipp);
    console.log("project", project);

    addIppToProject(ipp, project.id)
      .then((response) => {
        console.log("addIppToProject", response);
        setIppSelected(ipp);
        setOpenIppListModal(false);
        setShowIppForm(true);
      })
      .catch((err) => {
        console.log("error addIppToProject", err);
      });
  };

  return showIppForm ? (
    <IppSelected ippSelected={ippSelected} />
  ) : (
    <div className="ipp-tab">
      <Button className="button-radius" onClick={() => onIppRelationClick()}>
        Sin Ipp relacionada
      </Button>
      <IppListModal
        openIppListModal={openIppListModal}
        setOpenIppListModal={setOpenIppListModal}
        onIppSelect={onIppSelect}
      />
    </div>
  );
}
