import { Request, Response, NextFunction } from "express";
export function withTimeout(fn: Function, timeout: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );
    try {
      await Promise.race([fn(req, res, next), timeoutPromise]);
    } catch (error) {
      console.log("error",error);
      next(error);
    }
  };
}
