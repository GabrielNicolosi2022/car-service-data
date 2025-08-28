import { Router } from "express";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleByRegistration,
  updateVehicleById,
  updateVehicleByRegistration,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";
import upload from "../utils/upload.utils.js";

const vehicleRouter = Router();

vehicleRouter.post("/", createVehicle);
vehicleRouter.get("/", getAllVehicles);
vehicleRouter.get("/:id", getVehicleById);
vehicleRouter.get("/registration/:registration", getVehicleByRegistration);
vehicleRouter.patch("/:id", upload.array("thumbnails", 5), updateVehicleById);
vehicleRouter.patch(
  "/registration/:registration",
  upload.array("thumbnails", 5),
  updateVehicleByRegistration
);
vehicleRouter.delete("/:id", deleteVehicle); // WARN: This controller should be preceded by a middleware that checks if the user is authenticated.

export default vehicleRouter;
