import React, { useState } from "react";


interface TextViewCustomProps {
    text: string;
    label?: string;
    onChange?: (newText: string) => void;
    editable?: boolean;
    height?: string | number;
    width?: string | number;
    className?: string;
}

export function TextViewCustom({
    text,
    label,
    onChange,
    editable = false,
    height = 200,
    width = "100%",
    className = "",
}: TextViewCustomProps) {
    // Se editável, podemos usar estado interno para controlar texto
    const [value, setValue] = useState(text);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    }

    if (editable) {
        return (
            <div>
                <label>{label}</label>
                <textarea
                    className={`text-view-editable ${className}`}
                    style={{
                        height,
                        width,
                        padding: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        resize: "vertical",
                        fontFamily: "inherit",
                    }}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        );
    }

    // Modo somente leitura
    return (
        <div>
            <label>{label}</label>
            <div
                className={`text-view ${className}`}
                style={{
                    height,
                    width,
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                    padding: 8,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    backgroundColor: "#fafafa",
                    userSelect: "text",
                }}
            >
                {value}
            </div>
        </div>

    );
}
