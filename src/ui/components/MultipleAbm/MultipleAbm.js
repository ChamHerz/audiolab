import React from "react";
import { Tab } from "semantic-ui-react";
import Theme from "../ABMS/theme";
import Interlocutor from "../ABMS/interlocutor/interlocutor";
import Company from "../ABMS/company/company";
import Court from "../ABMS/court/court";
import Ipp from "../ABMS/ipp/Ipp";

export default function MultiABM(props) {
  const { inputData } = props;
  console.log(inputData);
  const panes = [
    {
      menuItem: "Interlocutores",
      render: () => (
        <Tab.Pane inverted={true} attached={false}>
          <Interlocutor />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Temas",
      render: () => (
        <Tab.Pane inverted={true} attached={false}>
          <Theme />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Empresas",
      render: () => (
        <Tab.Pane inverted={true} attached={false}>
          <Company />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Juzgados",
      render: () => (
        <Tab.Pane inverted={true} attached={false}>
          <Court />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ipps",
      render: () => (
        <Tab.Pane inverted={true} attached={false}>
          <Ipp />
        </Tab.Pane>
      ),
    },
  ];

  const Multi = () => (
    <Tab
      menu={{ attached: false, pointing: true, inverted: true }}
      panes={panes}
    />
  );

  return (
    <>
      <div>
        <Multi />
      </div>
    </>
  );
}
