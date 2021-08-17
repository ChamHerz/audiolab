import React, { useEffect, useState } from "react";
import Peaks from "peaks.js";
import "./PresentationModal.scss";
import { Grid, Icon, Modal, Table } from "semantic-ui-react";
import * as Tone from "tone";
import path from "path";
import { listSegmentByAudio } from "../../api/segment";
import { map } from "lodash";
import Konva from "konva";
import SegmentTab from "../../components/SegmentTab";
import ContextMenu from "semantic-ui-react-context-menu";
import { truncate2decimal } from "../../utils/truncate";

export default function PresentationModal(props) {
  const { setPresentationModal, presentationModal, showWave } = props;
  const [segments, setSegments] = useState([]);
  let zoomviewContainer = React.createRef();
  let overviewContainer = React.createRef();

  const loadSegments = (peaks) => {
    listSegmentByAudio(39).then((response) => {
      setSegments(response?.data);
      map(response?.data, (segment) => {
        peaks.segments.add({
          id: segment.id,
          startTime: segment.startTime,
          endTime: segment.endTime,
          labelText: segment.labelText,
          color: segment.color,
          editable: true,
        });
      });
    });
  };

  function createSegmentLabel(options) {
    if (options.view === "overview") {
      return null;
    }

    let label = new Konva.Label({
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

  useEffect(() => {
    if (showWave) {
      console.log("cargado");

      let player = {
        externalPlayer: new Tone.Player({
          url:
            "D:\\audiolab-importante\\CD AUDIO\\Audio\\B-11009-2015-11-08-205737-14.wav",
        }).toDestination(),
        eventEmitter: null,

        init: function (eventEmitter) {
          this.eventEmitter = eventEmitter;

          this.externalPlayer.sync();
          this.externalPlayer.start();

          Tone.connectSeries(this.externalPlayer, Tone.Master);

          eventEmitter.emit("player.canplay");

          Tone.Transport.scheduleRepeat(() => {
            let time = this.getCurrentTime();
            eventEmitter.emit("player.timeupdate", time);

            if (time >= this.getDuration()) {
              Tone.Transport.stop();
            }
          }, 0.25);
        },
        destroy: function () {
          Tone.context.dispose();
          this.externalPlayer = null;
          this.eventEmitter = null;
        },
        play: function () {
          console.log("reproduciendo");
          console.log(Tone.Transport);
          //setPlaying(true);
          Tone.Transport.start(Tone.now(), this.getCurrentTime());
          this.eventEmitter.emit("player.play", this.getCurrentTime());
        },
        pause: function () {
          //setPlaying(false);
          Tone.Transport.pause();
          this.eventEmitter.emit("player.pause", this.getCurrentTime());
        },
        isPlaying: function () {
          return Tone.Transport.state === "started";
        },
        seek: function (time) {
          Tone.Transport.seconds = time;

          this.eventEmitter.emit("player.seeked", this.getCurrentTime());
          this.eventEmitter.emit("player.timeupdate", this.getCurrentTime());
        },

        isSeeking: function () {
          return false;
        },
        getCurrentTime: function () {
          /*setCurrentTime(
          truncate2decimal(
            this.externalPlayer.toSeconds(Tone.Transport.position)
          )
        );
        setDuration(truncate2decimal(this.externalPlayer.buffer.duration));*/
          return this.externalPlayer.toSeconds(Tone.Transport.position);
        },
        getDuration: function () {
          return this.externalPlayer.buffer.duration;
        },
      };

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

        var labelText = this._options.startMarker
          ? this._options.segment.labelText + " >"
          : " <" + this._options.segment.labelText;

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
        var container = document.getElementById("zoomview-container");

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
        var container = document.getElementById("zoomview-container");

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

      const options = {
        containers: {
          zoomview: zoomviewContainer.current,
          overview: overviewContainer.current,
        },
        /*mediaElement: audioContainer.current,*/
        player: player,
        dataUri: {
          arraybuffer: `file://${path.join(
            __dirname,
            "/data/" + "B-11009-2015-11-08-205737-14" + ".dat"
          )}`,
        },
        keyboard: true,
        showPlayheadTime: true,
        emitCueEvents: true,
        zoomLevels: [512, 1024, 2048, 4096, 8192, 16384],
        zoomWaveformColor: "rgba(0, 225, 20, 1)", //color de onda superior
        overviewWaveformColor: "rgba(0,0,0,0.5)", //color de onda inferior
        overviewHighlightColor: "white", //color rectangulo inferior (zoom)
        playheadColor: "rgba(0, 0, 0, 1)", //color del play cabezal
        playheadTextColor: "#fff", //texto en el cabeza
        axisGridlineColor: "#fff", //color de la grilla
        axisLabelColor: "#aaa", //numeros de la grilla
        createSegmentMarker: createSegmentMarker,
        createSegmentLabel: createSegmentLabel,
        createPointMarker: createPointMarker,
      };

      Peaks.init(options, function (err, peaks) {
        if (err) {
          console.error(err.message);
        }

        loadSegments(peaks);
      });
    }
  }, [showWave]);

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
              <div id="peaks-container">
                <div
                  id="zoomview-container"
                  ref={zoomviewContainer}
                  tabIndex="0"
                ></div>
              </div>
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
          <Grid.Row>
            <Grid.Column width={16}>
              <div className="segment-tab">
                <Table inverted className="segment-list">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Nombre</Table.HeaderCell>
                      <Table.HeaderCell>Descripción</Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        Inicio
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">Fin</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {map(segments, (segment) => (
                      <SegmentRow key={segment.id} segment={segment} />
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

function SegmentRow(props) {
  const { segment, actionSegment, onDoubleClickSegment } = props;
  const [selected, setSelected] = useState(false);

  const onSegment = (e, segmentId) => {
    if (e.ctrlKey) {
      segment.selected = !segment.selected;
      setSelected(segment.selected);
    } else {
      console.log("solo click segment", segmentId);
    }
  };

  return (
    <ContextMenu
      trigger={
        <Table.Row
          className={"segment " + (selected ? "selected" : "noSelected")}
          onClick={(e) => onSegment(e, segment.id)}
          onDoubleClick={(e) => onDoubleClickSegment(e, segment)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Table.Cell>{segment.labelText}</Table.Cell>
          <Table.Cell>{segment.description}</Table.Cell>
          <Table.Cell textAlign="right">
            {truncate2decimal(segment.startTime)}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {truncate2decimal(segment.endTime)}
          </Table.Cell>
          <Table.Cell
            onClick={(e) =>
              actionSegment(e, { content: "Reproducir", selected: segment })
            }
            collapsing
          >
            <Icon name="play circle outline" />
          </Table.Cell>
          <Table.Cell
            onClick={(e) =>
              actionSegment(e, { content: "Borrar", selected: segment })
            }
            collapsing
          >
            <Icon name="trash alternate outline" />
          </Table.Cell>
        </Table.Row>
      }
      items={[
        {
          key: "btnPlay" + segment.id,
          content: "Reproducir",
          selected: segment,
        },
        { key: "btnDelete" + segment.id, content: "Borrar", selected: segment },
      ]}
      onClick={actionSegment}
    />
  );
}
