import React, { useState } from "react";
import Slider from "react-slick";

import "./InterlocutorWave.scss";
import { Button, Grid, Icon } from "semantic-ui-react";
import InterlocutorListModal from "../../../modals/InterlocutorListModal/InterlocutorListModal";
import { addInterlocutorToAudio } from "../../../api/audio";

export default function InterlocutorWave(props) {
  const { audio } = props;
  const [openInterlocutorListModal, setOpenInterlocutorListModal] = useState(
    false
  );

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
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
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