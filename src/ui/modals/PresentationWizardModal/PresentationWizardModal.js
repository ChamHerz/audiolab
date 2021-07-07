import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Icon,
  Modal,
  Segment,
  Step,
} from "semantic-ui-react";

import "./PresentationWizardModal.scss";

export default function PresentationWizardModal(props) {
  const { openPresentationModal, setOpenPresentationModal } = props;

  const firstComponent = () => {
    return <div>First Component</div>;
  };
  const secondComponent = () => {
    return <div>Second Component</div>;
  };
  const thirdComponent = () => {
    return <div>Third Component</div>;
  };
  const finalComponent = () => {
    return <div>Final Component</div>;
  };

  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Seleccionar IPP",
      isDone: true,
      component: firstComponent,
    },
    {
      key: "secondStep",
      label: "Seleccionar proyeto",
      isDone: false,
      component: secondComponent,
    },
    {
      key: "thirdStep",
      label: "Seleccionar segmentos",
      isDone: false,
      component: thirdComponent,
    },
    {
      key: "finalStep",
      label: "Finalizar presentación",
      isDone: false,
      component: finalComponent,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("You have completed all steps.");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <Modal
      onClose={() => setOpenPresentationModal(false)}
      onOpen={() => setOpenPresentationModal(true)}
      open={openPresentationModal}
      trigger={<Dropdown.Item text="Presentación" />}
    >
      <Modal.Content>
        <div className="box">
          <div className="steps">
            <ul className="nav">
              {steps.map((step, i) => {
                return (
                  <li
                    key={i}
                    className={`${
                      activeStep.key === step.key ? "active" : ""
                    } ${step.isDone ? "done" : ""}`}
                  >
                    <div>
                      Paso {i + 1}
                      <br />
                      <span>{step.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="step-component">{activeStep.component()}</div>
          <div className="btn-component">
            <Button
              className="button-radius"
              onClick={() => handleBack()}
              disabled={steps[0].key === activeStep.key}
            >
              Back
            </Button>
            <Button className="button-radius" onClick={() => handleNext()}>
              {steps[steps.length - 1].key !== activeStep.key
                ? "Next"
                : "Submit"}
            </Button>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpenPresentationModal(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
