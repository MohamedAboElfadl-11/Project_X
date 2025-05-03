import { IError } from "../Types/types";

export class AppError extends Error implements IError {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
