import React from 'react';
import { Tab } from 'semantic-ui-react';
import Theme from '../ABMS/theme';
import Interlocutores from "../ABMS/interlocutores/interlocutores";
import Company from '../ABMS/company/company';
import Court from "../ABMS/court/court";

export default function MultiABM( props ) {
    const {inputData} = props;
    console.log(inputData);
    const panes = [
        { menuItem: 'Interlocutores', render: () => <Tab.Pane inverted ={true} attached={false}><Interlocutores/></Tab.Pane> },
        { menuItem: 'Temas', render: () => <Tab.Pane inverted ={true} attached={false}><Theme/></Tab.Pane> },
        { menuItem: 'Empresas', render: () => <Tab.Pane inverted ={true} attached={false}><Company/></Tab.Pane> },
        { menuItem: 'Juzgados', render: () => <Tab.Pane inverted={true} attached={false}><Court /></Tab.Pane>  },
    ]

    const Multi = () => <Tab menu={{ attached: false, pointing: true , inverted:true }} panes={panes} />

    return (
    <>
        <div><Multi /></div>
    </>
    )
}

