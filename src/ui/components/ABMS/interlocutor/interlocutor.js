import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import InterlocutorList from "../../Interlocutors/InterlocutorList";
import InterlocutorForm from "../../Interlocutors/InterlocutorForm/InterlocutorForm";

import "./interlocutor.scss";

export default function Interlocutor() {
  const [showInterlocutorForm, setShowInterlocutorForm] = useState(false);
  const [interlocutorToEdit, setInterlocutorToEdit] = useState(null);

  const onNewInterlocutor = () => {
    setInterlocutorToEdit(null);
    setShowInterlocutorForm(true);
  };

  const onEditInterlocutor = (interlocutorToEdit) => {
    console.log("Edit interlocutor", interlocutorToEdit);
    setInterlocutorToEdit(interlocutorToEdit);
    setShowInterlocutorForm(true);
  };

  return (
    <>
      {showInterlocutorForm ? (
        <InterlocutorForm
          setShowInterlocutorForm={setShowInterlocutorForm}
          interlocutorToEdit={interlocutorToEdit}
        />
      ) : (
        <div className="ListInterlocutor">
          <InterlocutorList onEditInterlocutor={onEditInterlocutor} />
          <Grid>
            <Grid.Column textAlign="right">
              <Button
                className="ui common button"
                onClick={() => onNewInterlocutor()}
              >
                Nuevo Interlocutor
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}
