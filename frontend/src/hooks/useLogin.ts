import { useState } from 'react';
import { validaUser } from '../services/authService';
import type { UserRegistrationData } from '../models/AuthTypes';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (userData: UserRegistrationData) => {
        setLoading(true);
        setError('');
        
        const result = await validaUser(userData);
        
        setLoading(false);
        
        if (result.success) {
            navigate('/oportunidades', { 
                state: { success: 'Login realizado com sucesso!' } 
            });
        } else {
            setError(result.error || 'Erro desconhecido durante o cadastro');
        }
    };

    return { loading, error, handleRegister };
};