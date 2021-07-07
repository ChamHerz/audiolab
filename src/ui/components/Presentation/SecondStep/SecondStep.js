import React, { useEffect } from "react";

export default function SecondStep(props) {
  const { ippFinalSelected } = props;

  useEffect(() => {
    console.log("ippFinalSelected", ippFinalSelected);
  }, [ippFinalSelected]);

  return (
    <div>
      <h1>Soy SecondStep</h1>
    </div>
  );
}
