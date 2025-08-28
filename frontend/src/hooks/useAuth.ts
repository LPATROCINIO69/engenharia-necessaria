import { useState } from 'react';
import type { UserRegistrationData } from '../models/AuthTypes';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (userData: UserRegistrationData) => {
        setLoading(true);
        setError('');
        console.log(userData);
        const result = await authService.register(userData);
        
        setLoading(false);
        
        
        if (result.success) {
            navigate('/', { 
                state: { success: 'Cadastro realizado com sucesso! Faça login.' } 
            });
        } else {
            setError(result.error || 'Erro desconhecido durante o cadastro');
        }
    };

    return { loading, error, handleRegister };
};