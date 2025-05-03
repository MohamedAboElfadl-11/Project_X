import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ITokenPayload } from '../Types/types';

// Generate Access Token
export const genAccessToken = (user: ITokenPayload): string => {
    return jwt.sign(
        { userId: user.userId, userName: user.userName },
        process.env.ACCESS_TOKEN as string,
        {
            expiresIn: '7d',
            jwtid: uuidv4(),
        }
    );
};

// Generate Refresh Token
export const genRefreshToken = (user: ITokenPayload): string => {
    return jwt.sign(
        { userId: user.userId, userName: user.userName },
        process.env.REFRESH_TOKEN as string,
        {
            expiresIn: '7d',
            jwtid: uuidv4(),
        }
    );
};
