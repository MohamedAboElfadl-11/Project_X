import { Request, Response } from "express";
import { AuthService } from "../Services/auth.service";
import { UserData } from "../Models/user.model";
import jwt from 'jsonwebtoken'

// login
export const loginController = async (req: Request, res: Response): Promise<Response> => {
  const { userName, password } = req.body;

  const user = await AuthService.loginService(userName, password);

  return res.status(user.statusCode || 200).json(user);
};

// signup
export const signupController = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  const user = await AuthService.signupService(userName, password);
  res.status(user.statusCode || 200).json(user);
};

// get login user data
export const getMyProfile = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user as UserData;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      userId: user.userId,
      userName: user.userName,
    }
  });
};

// generate access token from refresh token
export const genAccessTokenControlle = async (req: Request, res: Response): Promise<Response | void> => {
  const { refreshtoken } = req.headers;

  if (!refreshtoken) return res.status(400).json({ message: 'refresh token is required' });

  const decoded = jwt.verify(refreshtoken as string, process.env.REFRESH_TOKEN as string);

  if (typeof decoded === 'string') {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const accesstoken = jwt.sign(decoded, process.env.ACCESS_TOKEN as string);

  res.status(200).json({ accesstoken });

}

// change password
export const changePasswordController = async (req: Request, res: Response): Promise<Response | void> => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) return res.status(400).json({ message: 'old and new password ar required ' })

  const result = await AuthService.changePasswordService(oldPassword, newPassword, req.user!);

  res.status(result.statusCode).json({ message: result.message });
};