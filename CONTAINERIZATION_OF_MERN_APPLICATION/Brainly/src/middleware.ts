import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";


//overrrind the request type
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    console.log("in middleware");
    
    const decoded = jwt.verify(header as string, JWT_SECRET);


    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;
        }

        req.userId = (decoded as JwtPayload).id;
        console.log("Middle ware ran");
        
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}

