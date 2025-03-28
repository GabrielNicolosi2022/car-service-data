import { Router } from "express";
import userRouter from "./user.routes.js";
import sessionRouter from "./session.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/sessions", sessionRouter);
indexRouter.use("/v1/api/users", userRouter);

export default indexRouter;
