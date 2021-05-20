import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import "./IppTab.scss";
import IppListModal from "../../../modals/IppListModal";
import IppSelected from "../IppSelected";

export default function IppTab(props) {
  const [openIppListModal, setOpenIppListModal] = useState(false);
  const [showIppForm, setShowIppForm] = useState(false);
  const [ippSelected, setIppSelected] = useState(null);

  const onIppRelationClick = () => {
    setOpenIppListModal(true);
  };

  const onIppSelect = (ipp) => {
    console.log("ipp", ipp);
    setIppSelected(ipp);
    setOpenIppListModal(false);
    setShowIppForm(true);
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
