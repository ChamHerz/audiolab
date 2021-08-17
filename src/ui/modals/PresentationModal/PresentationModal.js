import React from "react";

import "./PresentationModal.scss";
import { Grid, Modal } from "semantic-ui-react";

export default function PresentationModal(props) {
  const { setPresentationModal, presentationModal } = props;
  return (
    <Modal
      className="fullscreen-modal"
      size="fullscreen"
      onClose={() => setPresentationModal(false)}
      onOpen={() => setPresentationModal(true)}
      open={presentationModal}
    >
      <Modal.Header>Presentacion de evidencia</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              IPP:
              <strong>PP-08-00-019764-17/00 </strong>
              Proyecto:
              <strong>Nuevo Proyecto</strong>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign="center">
              <div className="interlocutor-card">
                <img
                  src="file:///images/04423b0c-46c5-438e-a579-5932d79485a0"
                  className="ui image"
                />
                <label>Rebecca C.</label>
              </div>
            </Grid.Column>
            <Grid.Column width={10} textAlign="center">
              center
            </Grid.Column>
            <Grid.Column width={3} textAlign="center">
              <div className="interlocutor-card">
                <img
                  src="file:///images/41840efd-c62d-45d2-9583-fda57a931442"
                  className="ui image"
                />
                <label>Margaret L.</label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}
