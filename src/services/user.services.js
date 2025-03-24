import userModel from "../models/user.model.js";

const createUser = async (data) => userModel.create(data);

const getUserById = async (id) => userModel.findById(id).lean();

const getUserByEmail = async (email) =>
  userModel.findOne({ email: email }).lean();

const getUserByUsername = async (username) =>
  userModel.findOne({ username: username }).lean();

const updateUser = async (id, data) =>
  userModel
    .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
    .exec();

const deleteUser = async (id) => userModel.findByIdAndDelete(id);

export {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  deleteUser,
};
