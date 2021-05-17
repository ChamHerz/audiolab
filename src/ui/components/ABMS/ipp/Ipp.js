import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import IppForm from "../../Ipp/IppForm";
import IppList from "../../Ipp/IppList";

export default function Ipp(props) {
  const [showIppForm, setShowIppForm] = useState(false);

  const newIpp = () => {
    setShowIppForm(true);
  };

  return (
    <>
      {showIppForm ? (
        <IppForm setShowIppForm={setShowIppForm} />
      ) : (
        <div>
          <IppList />
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
