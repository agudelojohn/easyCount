import React, { Fragment, useState, useEffect  } from "react";
import Axios from 'axios';

export function RecipeInput(){

    const [name, setName] = useState('');

    useEffect(()=>{
        Axios.post('http://localhost:3001/api/insert', {steps:"Steps Test", link:"Link Testing"})
        .then(()=>{
            setName("Succesful insert")
        })
        .catch((e)=>{
            console.log(e)
            setName("Error")
        })
    },[])

    useEffect(()=>{},[name, setName])

    return(
        <Fragment>
            <h1>Recipe Input</h1>
            <input value={name} type="text" name="recipeName" onChange={(e)=>{
                setName(e.target.value); 
            }}/>
        </Fragment>
    )
}