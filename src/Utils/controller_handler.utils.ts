import { Application, json, NextFunction, Response, Request } from "express";
import { globalHandler } from "../Middlewares/error_handler.maddlware";
import authRouters from "../Routes/auth.routes";

export const controllerHandler = (app: Application) => {

    app.use(json());

    app.use('/auth', authRouters)

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: 'hello, welcome! ' });
    });

    app.use(globalHandler)
}