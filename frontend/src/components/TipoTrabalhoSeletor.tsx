import { useState } from "react";
import "../styles/TipoTrabalhoSelector.css";

export function TipoTrabalhoSelector() {
  const [tipo, setTipo] = useState("estagio");

  return (
    <div className="tipo-trabalho">
      <label>
        <input
          type="radio"
          name="tipoTrabalho"
          value="estagio"
          checked={tipo === "estagio"}
          onChange={(e) => setTipo(e.target.value)}
        />
        Estágio
      </label>

      <label>
        <input
          type="radio"
          name="tipoTrabalho"
          value="efetivo"
          checked={tipo === "efetivo"}
          onChange={(e) => setTipo(e.target.value)}
        />
        Efetivo
      </label>
    </div>
  );
}