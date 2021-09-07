import React, { useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";

import "./PresentationWizardModal.scss";
import FirstStep from "../../components/Presentation/FirstStep/FirstStep";
import { toast } from "react-toastify";
import SecondStep from "../../components/Presentation/SecondStep/SecondStep";
import ThirdStep from "../../components/Presentation/ThirdStep/ThirdStep";
import PresentationModal from "../PresentationModal";

export default function PresentationWizardModal(props) {
  const { openPresentationModal, setOpenPresentationModal } = props;
  const [ippFinalSelected, setIppFinalSelected] = useState(null);
  const [projectFinalSelected, setProjectFinalSelected] = useState(null);
  const [presentationModal, setPresentationModal] = useState(false);
  const [showWave, setShowWave] = useState(false);

  const thirdComponent = () => {
    return <div>Third Component</div>;
  };
  const finalComponent = () => {
    return (
      <div>
        <br />
        <div>
          Ipp: <strong>PP-08-00-019764-17/00</strong>
        </div>
        <div>
          Proyecto: <strong>Nuevo Proyecto</strong>
        </div>
        <div>Segmentos:</div>
        <div>
          <ul>
            <li>
              <strong>Droga</strong> 5.888 11.072
            </li>
            <li>
              <strong>Venta</strong> 22.912 27.2
            </li>
            <li>
              <strong>Narcotico</strong> 29.952 34.496
            </li>
            <li>
              <strong>Trata</strong> 37.184 39.104
            </li>
            <li>
              <strong>Secuestro</strong> 53.248 58.248
            </li>
            <li>
              <strong>Venta</strong> 61.632 66.632
            </li>
            <li>
              <strong>Persona</strong> 71.296 76.296
            </li>
          </ul>
        </div>
      </div>
    );
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
      //alert("You have completed all steps.");
      console.log("mostrar presentacion");
      setPresentationModal(true);
      setShowWave(true);
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
    <>
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
      <PresentationModal
        setPresentationModal={setPresentationModal}
        presentationModal={presentationModal}
        showWave={showWave}
      />
    </>
  );
}
