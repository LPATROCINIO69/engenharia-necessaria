import type { UserRegistrationData, AuthResponse } from "../models/AuthTypes";
import apiConfig from '../config/apiConfig.ts';


export const registerUser = async (userData: UserRegistrationData): Promise<AuthResponse> => {
    try {
        const response = await fetch(apiConfig.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failure.')
        }

        return { success: true };

    } catch (error:any) {
        console.error("Erro no cadastro:", error);
        return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
    }
}