import React from 'react';
import { Tab } from 'semantic-ui-react';
import Theme from '../ABMS/theme';
import Interlocutores from "../ABMS/interlocutores/interlocutores";

export default function MultiABM( props ) {
    const {inputData} = props;
    console.log(inputData);
    const panes = [
        { menuItem: 'Interlocutores', render: () => <Tab.Pane inverted ={true} attached={false}><Interlocutores/></Tab.Pane> },
        { menuItem: 'Temas', render: () => <Tab.Pane inverted ={true} attached={false}><Theme/></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane inverted ={true} attached={false}>Tab 3 Content</Tab.Pane> },
    ]

    const Multi = () => <Tab menu={{ attached: false, pointing: true , inverted:true }} panes={panes} />

    return (
    <>
        <div><Multi /></div>
    </>
    )
}

