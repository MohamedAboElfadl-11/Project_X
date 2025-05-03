import { UserData } from "../Models/user.model";

export interface IError {
    message: string,
    status?: number,
    cause?: number,
    stack?: string
}

export interface ITokenPayload {
    userId: number;
    userName: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserData;
        }
    }
}
