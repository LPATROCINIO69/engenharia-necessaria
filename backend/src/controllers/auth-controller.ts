import { Request, Response } from "express";
import { createUserService, validaUserService } from "../services/auth-service";


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const response = await createUserService(name, email, password);
    res.status(response.statusCode).json(response.body);
}

export const login = async(req:Request, res:Response) => {
    const { email, password } = req.body;
    const response = await validaUserService(email, password);
    res.status(response.statusCode).json(response.body);
}
