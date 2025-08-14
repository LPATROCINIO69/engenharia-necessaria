import { useState } from 'react';
import { registerUser } from '../services/authService';
import type { UserRegistrationData } from '../models/AuthTypes';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (userData: UserRegistrationData) => {
        setLoading(true);
        setError('');
        
        const result = await registerUser(userData);
        
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