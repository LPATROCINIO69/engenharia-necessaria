import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';
import type { Opportunity } from '../models/OpportunitType';

export const useRegisterOpportunity = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (opportunityData: Opportunity) => {
        setLoading(true);
        setError('');
        console.log("dados recebidos: ", opportunityData);
        const result = await authService.registerOpportunity(opportunityData);
        
        setLoading(false);
        
        
        if (result.success) {
            navigate("/oportunidades", { 
                state: { success: 'Cadastro realizado com sucesso! Retornando a página de consulta de vagas.' } 
            });
        } else {
            setError(result.error || 'Erro desconhecido durante o cadastro');
        }
    };

    return { loading, error, handleRegister };
};