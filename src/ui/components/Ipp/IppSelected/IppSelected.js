import React from "react";
import { Input } from "semantic-ui-react";

import "./IppSelected.scss";
import moment from "moment";

export default function IppSelected(props) {
  const { ippSelected } = props;

  console.log(ippSelected);

  return (
    <div className="ipp-selected">
      <Input
        className="ipp-row"
        inverted
        label="Número de proceso"
        defaultValue={ippSelected.processNumber}
      />
      <Input
        className="ipp-row"
        inverted
        label="Fecha"
        defaultValue={moment(ippSelected.startDate).format("DD/MM/YYYY")}
      />
      <Input
        className="ipp-row"
        inverted
        label="Unidad Funcional"
        defaultValue={ippSelected.functionalUnit}
      />
      <Input
        className="ipp-row"
        inverted
        label="Juzgado de garantias"
        defaultValue={ippSelected.court}
      />
      <Input
        className="ipp-row"
        inverted
        label="Delito"
        defaultValue={ippSelected.crime}
      />
    </div>
  );
}
