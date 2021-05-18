import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import IppForm from "../../Ipp/IppForm";
import IppList from "../../Ipp/IppList";

export default function Ipp(props) {
  const [showIppForm, setShowIppForm] = useState(false);
  const [ippToEdit, setIppToEdit] = useState(null);

  const newIpp = () => {
    setShowIppForm(true);
  };

  const onEditIpp = (ipp) => {
    console.log("edit", ipp);
    setIppToEdit(ipp);
    setShowIppForm(true);
  };

  return (
    <>
      {showIppForm ? (
        <IppForm setShowIppForm={setShowIppForm} ippToEdit={ippToEdit} />
      ) : (
        <div>
          <IppList onEditIpp={onEditIpp} />
          <Grid>
            <Grid.Column textAlign="right">
              <Button className="ui common button" onClick={() => newIpp()}>
                Nueva Ipp
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}
