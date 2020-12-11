import React, { useEffect } from "react";

import "./WaveTab.scss";

export default function WaveTab(props) {
  const { audio } = props;

  console.log("onda", audio);

  useEffect(() => {
    console.log("cambio el audio");
  }, [audio]);

  return (
    <div>
      <h1>{audio?.name}</h1>
    </div>
  );
}
