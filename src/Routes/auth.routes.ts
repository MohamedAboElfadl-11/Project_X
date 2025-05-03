import { Router } from 'express';
import {   genAccessTokenControlle, getMyProfile, loginController, signupController } from '../Controllers/auth.controller';
import { errorHandler } from '../Middlewares/error_handler.maddlware';
import authenticationMiddlware from '../Middlewares/authentication.middlware';

const authRouters = Router();

authRouters.post('/login',
    errorHandler(loginController)
);

authRouters.post('/signup',
    errorHandler(signupController)
);

authRouters.get('/me',
    errorHandler(authenticationMiddlware()),
    errorHandler(getMyProfile)
)

authRouters.get('/accesstoken',
    errorHandler(genAccessTokenControlle)
)

export default authRouters;
