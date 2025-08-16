import { useState } from 'react';
import type { UserRegistrationData } from '../models/AuthTypes';
import { useNavigate } from 'react-router-dom';
import { storeToken } from '../util/authUtil';
import { authService } from '../services/apiService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (userData: UserRegistrationData) => {
        setLoading(true);
        setError('');

        const result = await authService.login(userData);
        console.log("token:", result.token);
        setLoading(false);

        if (result.success && result.token) {
            storeToken(result.token);
            navigate('/oportunidades');
        } else {
            setError(result.error || 'Erro desconhecido durante o cadastro');
        }
    };

    return { loading, error, handleLogin };
};