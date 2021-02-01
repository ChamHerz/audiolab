import React, { useState } from 'react';
import { Form, Icon, Input, Table, Loader, Button, Grid } from "semantic-ui-react";
import { newCourt } from "../../../api/court";
import { toast } from "react-toastify";
//import ListCourt from  "../../Courts/ListCourts";

export default function Court(props){
    const [formData, setFormData] = useState(initialValueForm());
    const [isLoading, setIsLoading] = useState(false);
    const [isNewCourt, setIsNewCourt] = useState(false);

    const handlerIsNewCourt= () => {
        setIsNewCourt(!isNewCourt);
    }

    const resetForm = () => {
        setFormData(initialValueForm());
    };

    const onSubmit = () => {
        if(!formData.name) {
            toast.warning("Completar el nombre del juzgado");
        } else {
            setIsLoading(true);
            newCourt({
                name: formData.fanstasyName;


            })
        }
    }
}