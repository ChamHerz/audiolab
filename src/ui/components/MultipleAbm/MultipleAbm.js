import React from 'react';
import { Tab } from 'semantic-ui-react';
import Temas from './../ABMS/temas';
import Interlocutes from "../ABMS/interlocutores/interlocutores";

export default function MultiABM( props ) {
    const {inputData} = props;
    console.log(inputData);
    const panes = [
        { menuItem: 'Interlocutores', render: () => <Tab.Pane attached={false}><Interlocutes/></Tab.Pane> },
        { menuItem: 'Temas', render: () => <Tab.Pane attached={false}><Temas/></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]

    const TabExampleAttachedFalse = () => <Tab menu={{ attached: false, pointing: true }} panes={panes} />

    return (
    <>
        <div><TabExampleAttachedFalse/></div>
    </>
    )
}

