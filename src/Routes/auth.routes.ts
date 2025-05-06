import { Router } from 'express';
import * as authController from '../Controllers/auth.controller';
import { errorHandler } from '../Middlewares/error_handler.maddlware';
import authenticationMiddlware from '../Middlewares/authentication.middlware';
import { validationMiddleware } from '../Middlewares/validation.middleware';
import * as validation from '../Validation/auth.validation';

const authRouters = Router();

authRouters.post('/login',
    validationMiddleware(validation.loginSchema),
    errorHandler(authController.loginController)
);

authRouters.post('/signup',
    // validationMiddleware(validation.signupSchema),
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
    validationMiddleware(validation.changePasswordSchema),
    errorHandler(authenticationMiddlware()),
    errorHandler(authController.changePasswordController)
)

export default authRouters;
