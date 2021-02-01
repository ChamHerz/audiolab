import React, { useEffect, useRef } from "react";
import Peaks from "peaks.js";

import "./WaveTab.scss";
import { Button } from "semantic-ui-react";
import { getMaxId } from "../../api/segment";

import Konva from "konva";

export default function WaveTab(props) {
  const { audio, onAddSegment } = props;
  let zoomviewContainer = useRef(null);
  let overviewContainer = useRef(null);
  let audioContainer = useRef(null);
  let filename = "";
  let peaksInstance;

  const segmentClick = (segment) => {
    console.log("segment click", segment);
  };

  const mouseEnter = (segment) => {
    console.log("SegmentEnter", segment);
  };

  const mouseLeave = (segment) => {
    console.log("SegmentLeave", segment);
  };

  const zoomviewDblClick = (time) => {
    console.log("zoomviewDblClick", time);
  };

  const playerSeeked = (time) => {
    console.log("playerSeeked", time);
  };

  const timeUpdate = (time) => {
    console.log("timeUpdate", time);
  };

  /*
   * CustomSegmentMarker
   */

  function CustomSegmentMarker(options) {
    this._options = options;
  }

  CustomSegmentMarker.prototype.init = function (group) {
    this._group = group;

    this._label = new Konva.Label({
      x: 0.5,
      y: 0.5,
    });

    var color = this._options.segment.color;

    this._tag = new Konva.Tag({
      fill: color,
      stroke: color,
      strokeWidth: 1,
      pointerDirection: "down",
      pointerWidth: 10,
      pointerHeight: 10,
      lineJoin: "round",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowOpacity: 0.3,
    });

    this._label.add(this._tag);

    var labelText =
      this._options.segment.labelText +
      (this._options.startMarker ? " start" : " end");

    this._text = new Konva.Text({
      text: labelText,
      fontFamily: "Calibri",
      fontSize: 14,
      padding: 5,
      fill: "white",
    });

    this._label.add(this._text);

    // Vertical Line - create with default y and points, the real values
    // are set in fitToView().
    this._line = new Konva.Line({
      x: 0,
      y: 0,
      stroke: color,
      strokeWidth: 1,
    });

    group.add(this._label);
    group.add(this._line);

    this.fitToView();

    this.bindEventHandlers();
  };

  CustomSegmentMarker.prototype.bindEventHandlers = function () {
    var container = zoomviewContainer.current;

    this._group.on("mouseenter", function () {
      container.style.cursor = "move";
    });

    this._group.on("mouseleave", function () {
      container.style.cursor = "default";
    });
  };

  CustomSegmentMarker.prototype.fitToView = function () {
    var height = this._options.layer.getHeight();

    var labelHeight = this._text.height() + 2 * this._text.padding();
    var offsetTop = 14;
    var offsetBottom = 26;

    this._group.y(offsetTop + labelHeight + 0.5);

    this._line.points([
      0.5,
      0,
      0.5,
      height - labelHeight - offsetTop - offsetBottom,
    ]);
  };

  function createSegmentMarker(options) {
    if (options.view === "zoomview") {
      return new CustomSegmentMarker(options);
    }

    return null;
  }

  function createSegmentLabel(options) {
    if (options.view === "overview") {
      return null;
    }

    var label = new Konva.Label({
      x: 12,
      y: 16,
    });

    label.add(
      new Konva.Tag({
        fill: "black",
        pointerDirection: "none",
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowOpacity: 0.3,
      })
    );

    label.add(
      new Konva.Text({
        text: options.segment.labelText,
        fontSize: 14,
        fontFamily: "Calibri",
        fill: "white",
        padding: 8,
      })
    );

    return label;
  }

  /*
   * CustomPointMarker
   */

  function CustomPointMarker(options) {
    this._options = options;
  }

  CustomPointMarker.prototype.init = function (group) {
    this._group = group;

    this._label = new Konva.Label({
      x: 0.5,
      y: 0.5,
    });

    this._tag = new Konva.Tag({
      fill: this._options.color,
      stroke: this._options.color,
      strokeWidth: 1,
      pointerDirection: "down",
      pointerWidth: 10,
      pointerHeight: 10,
      lineJoin: "round",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowOpacity: 0.3,
    });

    this._label.add(this._tag);

    this._text = new Konva.Text({
      text: this._options.point.labelText,
      fontFamily: "Calibri",
      fontSize: 14,
      padding: 5,
      fill: "white",
    });

    this._label.add(this._text);

    // Vertical Line - create with default y and points, the real values
    // are set in fitToView().
    this._line = new Konva.Line({
      x: 0,
      y: 0,
      stroke: this._options.color,
      strokeWidth: 1,
    });

    group.add(this._label);
    group.add(this._line);

    this.fitToView();

    this.bindEventHandlers();
  };

  CustomPointMarker.prototype.bindEventHandlers = function () {
    let container = zoomviewContainer.current;

    this._group.on("mouseenter", function () {
      container.style.cursor = "move";
    });

    this._group.on("mouseleave", function () {
      container.style.cursor = "default";
    });
  };

  CustomPointMarker.prototype.fitToView = function () {
    var height = this._options.layer.getHeight();

    var labelHeight = this._text.height() + 2 * this._text.padding();
    var offsetTop = 14;
    var offsetBottom = 26;

    this._group.y(offsetTop + labelHeight + 0.5);

    this._line.points([
      0.5,
      0,
      0.5,
      height - labelHeight - offsetTop - offsetBottom,
    ]);
  };

  /*
   * SimplePointMarker
   */

  function SimplePointMarker(options) {
    this._options = options;
  }

  SimplePointMarker.prototype.init = function (group) {
    this._group = group;

    // Vertical Line - create with default y and points, the real values
    // are set in fitToView().
    this._line = new Konva.Line({
      x: 0,
      y: 0,
      stroke: this._options.color,
      strokeWidth: 1,
    });

    group.add(this._line);

    this.fitToView();
  };

  SimplePointMarker.prototype.fitToView = function () {
    var height = this._options.layer.getHeight();

    this._line.points([0.5, 0, 0.5, height]);
  };

  function createPointMarker(options) {
    if (options.view === "zoomview") {
      return new CustomPointMarker(options);
    } else {
      return new SimplePointMarker(options);
    }
  }

  useEffect(() => {
    console.log("cambio el audio");

    if (audio?.name) {
      filename = audio.name.split(".").slice(0, -1).join(".");

      //console.log("audio file:", audio.path.replace(":", ""));

      const options = {
        containers: {
          zoomview: zoomviewContainer.current,
          overview: overviewContainer.current,
        },
        mediaElement: audioContainer.current,
        dataUri: {
          arraybuffer: "data/" + filename + ".dat",
        },
        keyboard: true,
        showPlayheadTime: false,
        createSegmentMarker: createSegmentMarker,
        createSegmentLabel: createSegmentLabel,
        createPointMarker: createPointMarker,
      };

      Peaks.init(options, function (err, peaks) {
        console.log("tag Audio", audioContainer);

        if (err) {
          console.error(err.message);
        }

        peaksInstance = peaks;

        //peaksInstance.on("zoomview.dblclick", addSegment);

        /*peaksInstance.on("segments.click", segmentClick);
        peaksInstance.on("overview.dblclick", addSegment);
        peaksInstance.on("player.seeked", playerSeeked);
        peaksInstance.on("player.timeupdate", playerSeeked);
        peaksInstance.on("segments.mouseenter", mouseEnter);
        peaksInstance.on("segments.mouseleave", mouseLeave);*/

        // Segments mouse events

        peaksInstance.on("segments.dragstart", function (segment, startMarker) {
          console.log("segments.dragstart:", segment, startMarker);
        });

        peaksInstance.on("segments.dragend", function (segment, startMarker) {
          console.log("segments.dragend:", segment, startMarker);
        });

        peaksInstance.on("segments.dragged", function (segment, startMarker) {
          console.log("segments.dragged:", segment, startMarker);
        });

        peaksInstance.on("segments.mouseenter", function (segment) {
          console.log("segments.mouseenter:", segment);
        });

        peaksInstance.on("segments.mouseleave", function (segment) {
          console.log("segments.mouseleave:", segment);
        });

        peaksInstance.on("segments.click", function (segment) {
          console.log("segments.click:", segment);
        });

        peaksInstance.on("zoomview.dblclick", function (time) {
          console.log("zoomview.dblclick:", time);
        });

        peaksInstance.on("overview.dblclick", function (time) {
          console.log("overview.dblclick:", time);
        });
      });
    }
  }, [audio]);

  const addSegment = (currentTime) => {
    console.log("Add segment");

    getMaxId()
      .then((response) => {
        console.log("newId", response);

        const newIdToAdd = response.data.segmentId + 1;

        peaksInstance.segments.add({
          startTime: peaksInstance.player.getCurrentTime(),
          endTime: peaksInstance.player.getCurrentTime() + 5,
          labelText: "Test segment ",
          editable: true,
        });

        onAddSegment(peaksInstance.segments.getSegment(newIdToAdd));
      })
      .catch((err) => {
        console.log("error en segmento", err);
      });
  };

  return audio ? (
    <div className="wave-tab">
      <h1>{audio?.name}</h1>
      <div id="peaks-container">
        <div id="zoomview-container" ref={zoomviewContainer}></div>
        <div id="overview-container" ref={overviewContainer}></div>
      </div>

      <div id="demo-controls">
        <audio id="audio" controls="controls" ref={audioContainer}>
          <source src={audio.path} type={audio.type} />
          {/*<source src={soundOgg} type="audio/ogg" />*/}
        </audio>
        <Button onClick={() => addSegment()}>Agregar Segmento</Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
