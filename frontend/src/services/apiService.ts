import { apiConfig } from "../config/apiConfig";
import type { UserRegistrationData, AuthResponse } from "../models/AuthTypes";
import type { Opportunity } from "../models/OpportunitType";
import { getToken} from "../util/authUtil";

export const fetchAuth = async (url: string, options: RequestInit = {}): Promise<AuthResponse> => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer:${token}` } : {})
    };

    const response = await fetch(url, { ...options, headers });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Registration failure.')
    }

    
    return { success: true, token: data.token };

};

export const authService = {
    login: (userData: UserRegistrationData) =>
        fetchAuth(apiConfig.login, {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    register: (userData: UserRegistrationData) =>
        fetchAuth(apiConfig.register, {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    states:() =>
        fetchAuth(apiConfig.states, {
            method: 'GET'
        }),

    getOpportunities: () => fetchAuth(apiConfig.opportunities),

    registerOpportunity: (opportunityData: Opportunity) =>
        fetchAuth(apiConfig.opportunities, {
            method: 'POST',
            body: JSON.stringify(opportunityData)
        })
}


