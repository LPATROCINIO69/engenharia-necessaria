

import React, { useState, useEffect, useRef } from "react";
import "../styles/ListBoxCustom.css";

interface ListBoxCustomProps<T> {
  dados: T[];
  renderItem: (item: T) => React.ReactNode;
  maxVisibleItems?: number;
  label?: string;
  placeholder?: string;
  onItemDoubleClick?: (item: T) => void;
  onChange?: (item: T) => void;
}

export function ListBoxCustom<T>({
  dados,
  renderItem,
  maxVisibleItems = 1,
  label,
  placeholder = "Selecione...",
  onItemDoubleClick,
  onChange,
}: ListBoxCustomProps<T>) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [aberto, setAberto] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha a dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="listbox-wrapper" ref={containerRef}>
      {label && <label className="listbox-label">{label}</label>}

      {/* Caso 1: Dropdown */}
      {maxVisibleItems === 1 ? (
        <div className="listbox-container" style={{ position: "relative" }}>
          <div
            className="listbox-selected"
            onClick={() => setAberto(!aberto)}
            role="button"
            aria-haspopup="listbox"
          >
            {selecionado !== null ? renderItem(dados[selecionado]) : placeholder}
          </div>
          {aberto && (
            <div className="listbox-options dropdown">
              {dados.map((item, index) => (
                <div
                  key={index}
                  className={`listbox-item ${selecionado === index ? "ativo" : ""}`}
                  role="option"
                  aria-selected={selecionado === index}
                  onClick={() => {
                    setSelecionado(index);
                    setAberto(false);
                    onChange?.(item);
                  }}
                >
                  {renderItem(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Caso 2: Lista expandida */
        <div
          className="listbox-options expanded"
          style={{
            maxHeight: `${maxVisibleItems * 3.0}rem`,
            overflowY: "auto",
          }}
        >
          {dados.map((item, index) => (
            <div
              key={index}
              className={`listbox-item ${selecionado === index ? "ativo" : ""}`}
              role="option"
              aria-selected={selecionado === index}
              onClick={() => {
                setSelecionado(index);
                onChange?.(item);
              }}
              onDoubleClick={() => onItemDoubleClick?.(item)}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
