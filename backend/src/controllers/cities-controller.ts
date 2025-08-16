import { Request,Response } from "express";
import { listarEstados } from "../services/states-service";
import { listarCidade } from "../services/cities-service";


export const getCities = async (req:Request, res:Response)=>{
        const state = req.query.state as string;
        const response = await listarCidade(state);
        res.status(response.statusCode).json(response.body);
}