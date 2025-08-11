import React, { type CSSProperties, useState } from "react";
import "../styles/ListBoxCustom.css";

interface ListBoxCustomProps<T> {
    dados: T[];
    renderItem: (item: T) => React.ReactNode;
    maxVisibleItems?: number; // quantos itens ficam visíveis
    label?: string;
    onItemDoubleClick?: (item: T) => void;
}

export function ListBoxCustom<T>({
    dados,
    renderItem,
    maxVisibleItems = 1,
    label,
    onItemDoubleClick
}: ListBoxCustomProps<T>) {
    const [selecionado, setSelecionado] = useState<number | null>(null);
    const [aberto, setAberto] = useState(false);

    const containerStyle: CSSProperties =
        maxVisibleItems === 1
            ? { maxHeight: "3.0rem", overflowY: "auto" }
            : { maxHeight: `${maxVisibleItems * 4.5}rem`, overflowY: "auto" };

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
                                onClick={() => setSelecionado(index)}
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