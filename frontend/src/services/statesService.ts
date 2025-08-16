import { apiConfig } from '../config/apiConfig';


export const listaStatesService = async (): Promise<string[]> => {
    try {
        const response = await fetch(apiConfig.states, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const states = await response.json(); // Adicionado 'await' aqui
        return states;
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        throw error; // Rejeita a promise para ser tratada pelo chamador
    }
}