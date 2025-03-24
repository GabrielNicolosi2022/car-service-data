import userModel from "../models/user.model.js";

const create = async (data) => userModel.create(data);

const getById = async (id) => userModel.findById(id).lean();

const getByEmail = async (email) => userModel.findOne({ email: email }).lean();

const getByUsername = async (username) =>
  userModel.findOne({ username: username }).lean();

const getByEmailOrUsername = async (email, username) => {
  return await userModel
    .findOne({
      $or: [{ email: email }, { username: username }],
    })
    .lean();
};

const update = async (id, data) =>
  userModel
    .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
    .exec();

const eliminate = async (id) => userModel.findByIdAndDelete(id);

export {
  create,
  getById,
  getByEmail,
  getByUsername,
  getByEmailOrUsername,
  update,
  eliminate,
};
