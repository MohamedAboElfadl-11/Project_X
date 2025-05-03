import { NextFunction, Request, Response } from "express";
import { IError } from "../Types/types";

export const errorHandler = (fun: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fun(req, res, next).catch((err: IError) => {
            next(err);
        });
    };
};

export const globalHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(errorStatus).json({ message: errorMessage });

    console.log(err); 
};