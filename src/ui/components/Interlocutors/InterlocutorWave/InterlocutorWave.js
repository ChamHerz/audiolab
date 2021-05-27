import React from "react";
import Slider from "react-slick";

import "./InterlocutorWave.scss";
import { Button, Grid, Icon } from "semantic-ui-react";

export default function InterlocutorWave(props) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    className: "interlocutor-wave__list",
  };

  return (
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
        <Button className="button-radius">
          <Icon name="add" />
          Interlocutor
        </Button>
      </Grid.Column>
    </Grid>
  );
}
