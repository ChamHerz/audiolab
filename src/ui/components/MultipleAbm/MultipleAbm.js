import React from 'react';
import { Tab } from 'semantic-ui-react';
import Temas from './../ABMS/temas';

export default function MultiABM( props ) {
    const {inputData} = props;
    console.log(inputData);
    const panes = [
        { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
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

