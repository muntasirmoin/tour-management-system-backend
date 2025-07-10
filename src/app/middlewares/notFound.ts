import { Request, Response } from "express";
import { StatusCodes as httpStatus } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "route not found",
  });
};

export default notFound;
