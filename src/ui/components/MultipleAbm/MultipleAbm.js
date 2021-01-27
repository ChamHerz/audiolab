import React from 'react';
import { Tab } from 'semantic-ui-react';
import Theme from '../ABMS/theme';
import Interlocutores from "../ABMS/interlocutores/interlocutores";

export default function MultiABM( props ) {
    const {inputData} = props;
    console.log(inputData);
    const panes = [
        { menuItem: 'Interlocutores', render: () => <Tab.Pane attached={false}><Interlocutores/></Tab.Pane> },
        { menuItem: 'Temas', render: () => <Tab.Pane attached={false}><Theme/></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]

    const TabExampleAttachedFalse = () => <Tab menu={{ attached: false, pointing: true }} panes={panes} />

    return (
    <>
        <div><TabExampleAttachedFalse/></div>
    </>
    )
}

