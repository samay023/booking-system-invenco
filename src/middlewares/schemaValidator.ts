import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const schemaValidator =
  (schema: ZodObject, propertyToValidate: "body" | "query" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[propertyToValidate]);
      return next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        const error: ApiResponseBody = {
          error: {
            code: "API_ERROR",
            message: e.issues.map((issue) => issue.message).join(", "),
          },
          success: false,
          payload: null,
        };
        return res.status(400).json(error);
      }
      const error: ApiResponseBody = {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        },
        success: false,
        payload: null,
      };
      return res.status(500).json(error);
    }
  };
