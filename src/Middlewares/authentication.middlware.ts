import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../Config/db_connection.config";
import { UserData } from "../Models/USER_DATA.model";
import { ITokenPayload } from "../Types/types";

const authenticationMiddlware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { accesstoken } = req.headers;
        if (!accesstoken)
            return res.status(400).json({ message: "access token required" });

        const decoded = jwt.verify(accesstoken as string, process.env.ACCESS_TOKEN as string);

        if (typeof decoded === 'string') {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decodedAccesstoken = decoded as ITokenPayload;

        const userRepo = AppDataSource.getRepository(UserData)

        const user = await userRepo.findOneBy({ userId: decodedAccesstoken.userId })

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    };
};

export default authenticationMiddlware;