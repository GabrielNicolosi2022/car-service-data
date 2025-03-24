import vehicleModel from "../models/vehicle.model.js";

const createVehicle = async (data) => vehicleModel.create(data);

const getVehicleById = async (id) => vehicleModel.findById(id).lean();

const getVehicleByEmail = async (email) =>
  vehicleModel.findOne({ email: email }).lean();

const getVehicleByVehicle = async (username) =>
  vehicleModel.findOne({ username: username }).lean();

const updateVehicle = async (id, data) =>
  vehicleModel
    .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
    .exec();

const deleteVehicle = async (id) => vehicleModel.findByIdAndDelete(id);

export {
  createVehicle,
  getVehicleById,
  getVehicleByEmail,
  getVehicleByVehicle,
  updateVehicle,
  deleteVehicle,
};
