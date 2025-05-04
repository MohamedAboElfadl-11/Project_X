import { Router } from 'express';
import * as authController from '../Controllers/auth.controller';
import { errorHandler } from '../Middlewares/error_handler.maddlware';
import authenticationMiddlware from '../Middlewares/authentication.middlware';

const authRouters = Router();

authRouters.post('/login',
    errorHandler(authController.loginController)
);

authRouters.post('/signup',
    errorHandler(authController.signupController)
);

authRouters.get('/me',
    errorHandler(authenticationMiddlware()),
    errorHandler(authController.getMyProfile)
)

authRouters.get('/accesstoken',
    errorHandler(authController.genAccessTokenControlle)
)

authRouters.put('/changePassword',
    errorHandler(authenticationMiddlware()),
    errorHandler(authController.changePasswordController)
)

export default authRouters;
