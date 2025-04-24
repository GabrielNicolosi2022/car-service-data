import { Router } from "express";
import userRouter from "./user.routes.js";
import sessionRouter from "./session.routes.js";
import vehicleRouter from "./vehicle.routes.js";
import { sessionInitVeryfication } from "../middlewares/common.middlewares.js";

const indexRouter = Router();

indexRouter.use("/v1/api/sessions", sessionRouter);
indexRouter.use("/v1/api/users", sessionInitVeryfication, userRouter);
indexRouter.use("/v1/api/vehicles", sessionInitVeryfication, vehicleRouter);

export default indexRouter;
