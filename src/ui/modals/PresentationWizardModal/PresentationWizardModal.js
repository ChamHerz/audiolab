import React, { useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";

import "./PresentationWizardModal.scss";
import FirstStep from "../../components/Presentation/FirstStep/FirstStep";
import { toast } from "react-toastify";
import SecondStep from "../../components/Presentation/SecondStep/SecondStep";
import ThirdStep from "../../components/Presentation/ThirdStep/ThirdStep";

export default function PresentationWizardModal(props) {
  const { openPresentationModal, setOpenPresentationModal } = props;
  const [ippFinalSelected, setIppFinalSelected] = useState(null);
  const [projectFinalSelected, setProjectFinalSelected] = useState(null);

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
      component: (_) => <FirstStep setIppFinalSelected={setIppFinalSelected} />,
    },
    {
      key: "secondStep",
      label: "Seleccionar proyeto",
      isDone: false,
      component: (ipp) => (
        <SecondStep
          ippFinalSelected={ipp}
          setProjectFinalSelected={setProjectFinalSelected}
        />
      ),
    },
    {
      key: "thirdStep",
      label: "Seleccionar segmentos",
      isDone: false,
      component: (_, project) => <ThirdStep projectFinalSelected={project} />,
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

    if (activeStep.key === "firstStep") {
      if (!ippFinalSelected) {
        toast.error("Seleccione una Ipp");
        return;
      }
    }

    if (activeStep.key === "secondStep") {
      if (!projectFinalSelected) {
        toast.error("Seleccione un proyecto");
        return;
      }
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
          <div className="step-component">
            {activeStep.component(ippFinalSelected, projectFinalSelected)}
          </div>
          <div className="btn-component">
            <Button
              className="button-radius"
              onClick={() => handleBack()}
              disabled={steps[0].key === activeStep.key}
            >
              Atras
            </Button>
            <Button className="button-radius" onClick={() => handleNext()}>
              {steps[steps.length - 1].key !== activeStep.key
                ? "Siguiente"
                : "Terminar"}
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
