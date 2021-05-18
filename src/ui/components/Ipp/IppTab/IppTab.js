import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import "./IppTab.scss";
import IppListModal from "../../../modals/IppListModal";

export default function IppTab(props) {
  const [openIppListModal, setOpenIppListModal] = useState(false);

  const onIppRelationClick = () => {
    console.log("click en ipp");
    setOpenIppListModal(true);
  };

  return (
    <div className="ipp-tab">
      <Button className="button-radius" onClick={() => onIppRelationClick()}>
        Sin Ipp relacionada
      </Button>
      <IppListModal
        openIppListModal={openIppListModal}
        setOpenIppListModal={setOpenIppListModal}
      />
    </div>
  );
}
