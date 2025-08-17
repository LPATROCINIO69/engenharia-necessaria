import { apiConfig } from '../config/apiConfig';
import type { FieldEngineeringType } from '../models/FieldEngineeringType';


export const listaEngineeringService = async (): Promise<FieldEngineeringType[]> => {
    try {
        const response = await fetch(apiConfig.engineering, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const engineering = await response.json(); // Adicionado 'await' aqui
        return engineering;
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        throw error; // Rejeita a promise para ser tratada pelo chamador
    }
}