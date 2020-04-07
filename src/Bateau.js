import React from "react";
import photo from './test.png'

export default function Bateau(props){
    //return <img src={photo} width={"150"} height={"150"} alt="bateau" onClick={props.onClick}/>
    return (
        <button className={"boatSelection"}>
            <img src={photo} width={"100"} height={"100"} alt="boat" onClick={props.onClick}/>
        </button>
    );
}