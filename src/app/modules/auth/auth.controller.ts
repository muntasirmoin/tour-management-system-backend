import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes as httpStatus } from "http-status-codes";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialsLogin(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user Logged In successfully",
    data: loginInfo,
  });
});

export const AuthControllers = {
  credentialsLogin,
};
