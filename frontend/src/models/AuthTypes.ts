export interface UserRegistrationData {
    name?:string;
    email:string;
    password:string;
}


export interface AuthResponse {
    success:boolean;
    error?:string;
    token?:string;
}

