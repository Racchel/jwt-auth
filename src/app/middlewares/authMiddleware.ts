import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface ITokenPayload {
    id: string,
    iat: string,
    exp: string
}

export default function authMiddleware(request:Request, response:Response) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.sendStatus(401);    
    }

    const token = authorization.replace("Bearer", "").trim();

    try {   
        const data = jwt.verify(token, "secret");
        
        const { id } = data as unknown as ITokenPayload;

        request.userId = id;

    } catch {
        return response.sendStatus(401);   
    }
}