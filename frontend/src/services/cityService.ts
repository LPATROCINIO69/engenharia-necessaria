import { apiConfig } from '../config/apiConfig';


export const listaCitiesService = async (state:string): Promise<string[]> => {
    try {
        const url = `${apiConfig.cities}?state=${encodeURIComponent(state)}`;
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const cities = await response.json(); // Adicionado 'await' aqui
        return cities;
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        throw error; // Rejeita a promise para ser tratada pelo chamador
    }
}