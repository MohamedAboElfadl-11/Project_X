import Joi from 'joi';

// Login Schema
export const loginSchema = {
    body: Joi.object({
        userName: Joi.string().required().messages({
            'string.base': 'Username must be a string',
            'any.required': 'Username is required',
        }),
        password: Joi.string().required().messages({
            'string.base': 'Password must be a string',
            'any.required': 'Password is required',
        }),
    }),
};

// Signup Schema
export const signupSchema = {
    body: Joi.object({
        userName: Joi.string().min(3).required().messages({
            'string.base': 'Username must be a string',
            'any.required': 'Username is required',
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required',
        }),
    }),
};

// Change Password Schema
export const changePasswordSchema = {
    body: Joi.object({
        oldPassword: Joi.string().required().messages({
            'any.required': 'Old password is required',
        }),
        newPassword: Joi.string().min(6).required().messages({
            'string.min': 'New password must be at least 6 characters',
            'any.required': 'New password is required',
        }),
    }),
};
