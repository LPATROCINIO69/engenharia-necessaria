import "../styles/Input.css";
import React from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{label:string;}

export function Input({label, ...props}:InputProps){
    return(
        <label className="input-label">
            {label}
            <input className="input-field" {...props}/>
        </label>
    )
}

