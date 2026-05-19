import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  return res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

export default errorMiddleware;
