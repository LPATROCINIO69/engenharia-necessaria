import React from "react";
import '../styles/button.css';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button(props:ButtonProps) {
    return(
        <button className="botao" {...props}/>
    );
}