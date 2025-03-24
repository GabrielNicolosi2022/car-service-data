import { Router } from "express";
import userRouter from "./users.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/users", userRouter);

export default indexRouter;
