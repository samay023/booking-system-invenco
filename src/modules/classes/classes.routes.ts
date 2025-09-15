import { Router } from "express";
import * as classController from "./classes.controller";
import { schemaValidator } from "../../middlewares";
import { BookClassDto, ListClassesDto } from "./classes.dto";

const classesRouter = Router();

classesRouter.get(
  "/",
  schemaValidator(ListClassesDto, "query"),
  classController.listClasses
);

classesRouter.post(
  "/:id/bookings",
  schemaValidator(BookClassDto, "body"),
  classController.bookClass
);
export default classesRouter;
