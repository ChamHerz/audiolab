import React from "react";
import { Icon, Grid } from "semantic-ui-react";

import "./Player.scss";

export default function Player(props) {
  const { playing, peaksInstance, currentTime, duration } = props;

  const onFilm = () => {
    console.log("on film");
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          left
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            <label>
              {currentTime} / {duration}
            </label>
            {playing ? (
              <Icon
                onClick={() => peaksInstance.player.pause()}
                name="pause circle outline"
              />
            ) : (
              <Icon
                onClick={() => peaksInstance.player.play()}
                name="play circle outline"
              />
            )}
            <Icon onClick={() => peaksInstance.zoom.zoomIn()} name="zoom-in" />
            <Icon
              onClick={() => peaksInstance.zoom.zoomOut()}
              name="zoom-out"
            />
          </div>
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <div className="controls">
            <Icon onClick={() => onFilm()} name="film" />
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}
