/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from "express";

import { Request, Response } from "express";

import { StatusCodes as httpStatus } from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: user,
    });
    // res.status(httpStatus.CREATED).json({
    //   message: "user created successfully",
    //   user,
    // });
  }
);

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: `user created successfully`,
//       user,
//     });
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await UserServices.getAllUsers();
//     return users;
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    console.log(result);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "all users retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
    // res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "all users retrieved successfully",
    //   data: users,
    // });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
};
