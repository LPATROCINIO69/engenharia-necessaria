import { Request,Response } from "express";
import { listarEstados } from "../services/states-service";


export const getStates = async (req:Request, res:Response)=>{
        const response = await listarEstados();
        res.status(response.statusCode).json(response.body);
}