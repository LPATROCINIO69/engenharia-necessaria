import { HttpResponse } from "../models/http-response-model";


export const ok = async (data:any):Promise<HttpResponse> =>{
    return {statusCode:200, body:data};
}

export const noContent = async ():Promise<HttpResponse> =>{
    return {statusCode:204, body:null};
}

export const badRequest = async ():Promise<HttpResponse> =>{
    return {statusCode:400, body:null};
}

export const userAlreadyExists = async ():Promise<HttpResponse> =>{
    return {statusCode:400, body:{message:"User already exists"}};
}

export const invalidCredentials = async ():Promise<HttpResponse> =>{
    return {statusCode:401, body:{message:"Invalid credentials"}};
}

export const created = async ():Promise<HttpResponse> => {
    return {statusCode:201, body:{message:"successful"}};
}

export const serverError = async():Promise<HttpResponse> =>{
    return {statusCode:500, body:{message:"Error inserting record into the database"}}
}
