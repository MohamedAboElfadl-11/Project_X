import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type SchemaObject = {
    [key in keyof Request]?: ObjectSchema;
};

export const validationMiddleware = (schema: SchemaObject) => {
    return (req: Request, res: Response, next: NextFunction):void => {
        const schemaKeys = Object.keys(schema) as (keyof Request)[];
        const validationError: any[] = [];

        for (const key of schemaKeys) {
            const { error } = schema[key]!.validate(req[key], { abortEarly: false });
            if (error) validationError.push(...error.details);
        }

        if (validationError.length) {
            const err = {
                status: 400,
                message: "Validation error",
                details: validationError,
            };
            return next(err);
        }

        next();
    };
};
