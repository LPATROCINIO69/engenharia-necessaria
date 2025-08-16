import React, { type CSSProperties, useState } from "react";
import "../styles/ListBoxCustom.css";

interface ListBoxCustomProps<T> {
    dados: T[] ;
    renderItem: (item: T) => React.ReactNode;
    maxVisibleItems?: number; // quantos itens ficam visíveis
    label?: string;
    onItemDoubleClick?: (item: T) => void;
    onChange?: (item: T) => void;
}

export function ListBoxCustom<T>({
    dados,
    renderItem,
    maxVisibleItems = 1,
    label,
    onItemDoubleClick,
    onChange
}: ListBoxCustomProps<T>) {
    const [selecionado, setSelecionado] = useState<number | null>(null);
    const [aberto, setAberto] = useState(false);

    const containerStyle: CSSProperties = 
        maxVisibleItems === 1
             ? { height: "2.5rem", overflowY: "auto",position: "relative" }
             : { height: `${maxVisibleItems * 4.5}rem`, overflowY: "auto",position: "relative" };
    

    return (
        <div>
            {label && <label className="listbox-label">{label}</label>}
            <div className="listbox-container" style={containerStyle}>
                {maxVisibleItems === 1 ? (
                    <>

                        <div
                            className="listbox-selected"
                            onClick={() => setAberto(!aberto)}
                        >
                            {selecionado !== null
                                ? renderItem(dados[selecionado])
                                : "Selecione..."}
                        </div>
                        {aberto && (
                            <div className="listbox-options">
                                {dados.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`listbox-item ${selecionado === index ? "ativo" : ""}`}
                                        onClick={() => {
                                            setSelecionado(index);
                                            setAberto(false);
                                            if (onChange) onChange(item);
                                        }}
                                    >
                                        {renderItem(item)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    // Lista expandida
                    <div className="listbox-options">
                        {dados.map((item, index) => (
                            <div
                                key={index}
                                className={`listbox-item ${selecionado === index ? "ativo" : ""}`}
                                onClick={() => {
                                    setSelecionado(index)
                                    if (onChange) onChange(item);
                                }}
                                onDoubleClick={() => onItemDoubleClick && onItemDoubleClick(item)}
                            >
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

