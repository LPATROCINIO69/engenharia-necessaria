import { useState } from "react";
import "../styles/TipoTrabalhoSelector.css"; // arquivo css isolado


interface TipoTrabalhoSelectorProps {
  onChange?: (valor:string) => void;
}


export function TipoTrabalhoSelector({onChange}:TipoTrabalhoSelectorProps) {
  const [tipo, setTipo] = useState("trainee");

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
          value="trainee"
          checked={tipo === "trainee"}
          onChange={() => handleChange("trainee")}
        />
        <span>Estágio</span>
      </label>

      <label>
        <input
          type="radio"
          name="tipoTrabalho"
          value="job"
          checked={tipo === "job"}
          onChange={() => handleChange("job")}
        />
        <span>Efetivo</span>
      </label>
    </div>
  );
}