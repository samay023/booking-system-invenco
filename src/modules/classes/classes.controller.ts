import { BookClassDto, type ListClassesDto } from "./classes.dto";
import * as classService from "./classes.service";
import { Request, Response } from "express";

export const listClasses = async (req: Request, res: Response) => {
  try {
    const classes = await classService.listClasses(req.query as ListClassesDto);

    const result: ApiResponseBody = {
      payload: classes,
      success: true,
      error: null,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error listing classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bookClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { statusCode, ...rest } = await classService.bookClass(
      Number(id),
      req.body as BookClassDto
    );

    res.status(statusCode).json(rest);
  } catch (error) {
    console.error("Error booking class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
