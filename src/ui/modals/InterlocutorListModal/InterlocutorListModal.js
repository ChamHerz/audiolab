import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Modal } from "semantic-ui-react";
import { listInterlocutor } from "../../api/interlocutor";
import { map } from "lodash";

import noImage from "./../../assets/png/no-image.png";
import "./InterlocutorListModal.scss";

export default function InterlocutorListModal(props) {
  const {
    openInterlocutorListModal,
    setOpenInterlocutorListModal,
    onInterlocutor,
  } = props;
  const [interlocutors, setInterlocutors] = useState([]);

  const loadInterlocutors = () => {
    listInterlocutor().then((response) => {
      console.log(response);
      if (response?.data) {
        const arrayInterlocutors = [];
        map(response?.data, (interlocutor) => {
          arrayInterlocutors.push(interlocutor);
        });
        setInterlocutors(arrayInterlocutors);
      }
    });
  };

  useEffect(() => {
    loadInterlocutors();
  }, []);

  const onSubmit = () => {
    console.log("selected");
  };

  return (
    <Modal
      className="basic-modal"
      onClose={() => setOpenInterlocutorListModal(false)}
      onOpen={() => setOpenInterlocutorListModal(true)}
      open={openInterlocutorListModal}
    >
      <Modal.Header>Seleccionar un Interlocutor</Modal.Header>
      <Modal.Content>
        <Card.Group itemsPerRow={4}>
          {map(interlocutors, (interlocutor) => (
            <Interlocutor
              key={interlocutor.id}
              interlocutor={interlocutor}
              onInterlocutor={onInterlocutor}
            />
          ))}
          <Card color="red" image={noImage} />
          <Card color="orange" image={noImage} />
        </Card.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Seleccionar Interlocutor"
          labelPosition="right"
          icon="checkmark"
          onClick={() => onSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

function Interlocutor(props) {
  const { interlocutor, onInterlocutor } = props;

  return (
    <Card
      image={"images/" + interlocutor.picture}
      header={interlocutor.alias}
      meta={`${interlocutor.name} ${interlocutor.lastname}`}
      extra={
        <a onClick={() => onInterlocutor(interlocutor)}>
          <Icon name="check square" />
          Asignar
        </a>
      }
    />
  );
}
