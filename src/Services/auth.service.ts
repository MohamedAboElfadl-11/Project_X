import { AppDataSource } from "../Config/db_connection.config";
import { UserData } from "../Models/user.model";
import { IError } from "../Types/types";
import { comparing, hashing } from "../Utils/bcrypt.utils";
import { genAccessToken, genRefreshToken } from "../Utils/genTokens.utils";

export class AuthService {
  // Login service
  static async login(userName: string, password: string) {
    const userRepo = AppDataSource.getRepository(UserData);

    userName = userName.toLowerCase();

    const user = await userRepo.findOneBy({ userName });
    if (!user) {
      return {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }

    const isMatch = await comparing(password, user.userPwd!);
    if (!isMatch) {
      return {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }

    const payload = {
      userId: user.userId,
      userName: user.userName || "",
    };

    const accessToken = genAccessToken(payload);
    const refreshToken = genRefreshToken(payload);

    return {
      message: "Login successful",
      user: {
        userId: user.userId,
        userName: user.userName,
      },
      accessToken,
      refreshToken,
    };
  }

  // Signup service
  static async signup(userName: string, password: string) {
    const userRepo = AppDataSource.getRepository(UserData);

    const salt = process.env.SALT ? Number(process.env.SALT) : 10;
    const hashedPassword = hashing(password, salt);

    const newUser = userRepo.create({
      userName,
      userPwd: hashedPassword,
    });

    try {
      const user = await userRepo.save(newUser);

      return {
        statusCode: 201,
        message: "Account created successfully",
        data: {
          userId: user.userId,
          userName: user.userName,
        },
      };
    } catch (error: IError | any) {
      if (error?.code === "ORA-00001") {
        return {
          statusCode: 409,
          message: "This username is already taken",
        };
      }

      return {
        statusCode: 500,
        message: "Something went wrong during signup",
        error: error.message || error,
      };

    }
  }
  static async changePasswordService(oldPassword: string, newPassword: string, user: UserData) {
    const userRepo = AppDataSource.getRepository(UserData);

    const isMatch = await comparing(oldPassword, user.userPwd);

    if (!isMatch) return {
      statusCode: 401,
      message: 'password is not correct'
    }

    const salt = process.env.SALT ? Number(process.env.SALT) : 10;
    const hashedPassword = hashing(newPassword, salt);

    user.userPwd = hashedPassword;
    await userRepo.save(user);

    return {
      statusCode: 200,
      message: "Password changed successfully",
    };
  }
}
