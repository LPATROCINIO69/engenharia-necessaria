import { useState } from "react";
import "../styles/TipoTrabalhoSelector.css"; // arquivo css isolado


interface TipoTrabalhoSelectorProps {
  onChange?: (valor:string) => void;
}


export function TipoTrabalhoSelector({onChange}:TipoTrabalhoSelectorProps) {
  const [tipo, setTipo] = useState("estagio");

  const handleChange = (valor: string) => {
    setTipo(valor);
    onChange?.(valor); // envia a seleção para o pai
  };

  return (
    <div className="tipo-trabalho">
      <label>
        <input
          type="radio"
          name="tipoTrabalho"
          value="estagio"
          checked={tipo === "estagio"}
          onChange={() => handleChange("estagio")}
        />
        <span>Estágio</span>
      </label>

      <label>
        <input
          type="radio"
          name="tipoTrabalho"
          value="efetivo"
          checked={tipo === "efetivo"}
          onChange={() => handleChange("efetivo")}
        />
        <span>Efetivo</span>
      </label>
    </div>
  );
}