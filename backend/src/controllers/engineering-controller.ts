import { Request,Response } from "express";
import { listarEngenharias } from "../services/engineering-service";


export const getEngineering = async (req:Request, res:Response)=>{
        const response = await listarEngenharias();
        res.status(response.statusCode).json(response.body);
}