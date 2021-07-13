import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Button, Card, Grid, Icon, Image } from "semantic-ui-react";
import InterlocutorListModal from "../../../modals/InterlocutorListModal/InterlocutorListModal";
import { addInterlocutorToAudio } from "../../../api/audio";
import { listInterlocutorByAudio } from "../../../api/interlocutor";
import { map } from "lodash";
import "./InterlocutorWave.scss";

export default function InterlocutorWave(props) {
  const { audio } = props;
  const [openInterlocutorListModal, setOpenInterlocutorListModal] = useState(
    false
  );
  const [interlocutors, setInterlocutors] = useState([]);

  const loadInterlocutors = () => {
    listInterlocutorByAudio(audio.id)
      .then((response) => {
        if (response?.data) {
          setInterlocutors(response.data);
        }
        console.log("response", response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    loadInterlocutors();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    className: "interlocutor-wave__list",
  };

  const openModalInterlocutor = () => {
    setOpenInterlocutorListModal(true);
    console.log("open modal");
  };

  const onInterlocutor = (interlocutorSelected) => {
    console.log("inter", interlocutorSelected);
    setOpenInterlocutorListModal(false);

    addInterlocutorToAudio(audio.id, interlocutorSelected)
      .then((response) => {
        if (response?.data) {
          console.log("ok", response.data);
        }
      })
      .catch((err) => {
        console.log("error", err.data);
      });
  };

  return (
    <>
      <Grid className="interlocutor-wave">
        <Grid.Column width={13} className="left">
          <Slider {...settings}>
            {map(interlocutors, (interlocutor) => (
              <Interlocutor key={interlocutor.id} interlocutor={interlocutor} />
            ))}
          </Slider>
        </Grid.Column>
        <Grid.Column width={3} className="right">
          <Button
            className="button-radius"
            onClick={() => openModalInterlocutor()}
          >
            <Icon name="add" />
            Interlocutor
          </Button>
        </Grid.Column>
      </Grid>
      <InterlocutorListModal
        setOpenInterlocutorListModal={setOpenInterlocutorListModal}
        openInterlocutorListModal={openInterlocutorListModal}
        onInterlocutor={onInterlocutor}
      />
    </>
  );
}

function Interlocutor(props) {
  const { interlocutor } = props;

  return (
    <div className="interlocutor-card">
      <Image floted="left" size="mini" src={"images/" + interlocutor.picture} />
      <label>{interlocutor.name}</label>
    </div>
  );
  //return <div>{interlocutor.id}</div>;
}
