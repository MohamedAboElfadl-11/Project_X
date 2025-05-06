import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../Config/db_connection.config";
import { EmpData } from "../Models/EMP_DATA.model";
import { UserData } from "../Models/USER_DATA.model";
import { comparing, hashing } from "../Utils/bcrypt.utils";
import { genAccessToken, genRefreshToken } from "../Utils/genTokens.utils";

export class AuthService {
  // Login service
  static async loginService(userName: string, password: string) {
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
  static async signupService(nationalID: string, password: string) {
    // const empRepo = AppDataSource.getRepository(EmpData);
    // const userRepo = AppDataSource.getRepository(UserData);

    // const isNID = await empRepo.findOneBy({ nid: Number(nationalID) });

    // if (!isNID) {
    //   return {
    //     statusCode: 404,
    //     message: 'This emplyee is not registed',
    //   };
    // }

    // const isUser = await userRepo.findOne({
    //   where: {
    //     empData: { appId: isNID.appId }, 
    //   } as FindOptionsWhere<UserData>, 
    //   relations: ['empData'],
    // });

    // if (isUser) {
    //   return {
    //     statusCode: 409,
    //     message: 'emplyee already registed',
    //   };
    // }

    // const salt = process.env.SALT ? Number(process.env.SALT) : 10;
    // const hashedPassword = hashing(password, salt);

    // const newUser = userRepo.create({
    //   userName: String(isNID.nid), 
    //   userPwd: hashedPassword,
    //   activeFrom: new Date(),
    //   empData: isNID,
    //   appId: 1
    // });

    // await userRepo.save(newUser);

    // return {
    //   statusCode: 201,
    //   message: 'emplyee registed successfully',
    // };
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
