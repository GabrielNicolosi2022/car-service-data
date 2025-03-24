import * as services from "../services/user.services.js";
import { userDTO } from "../dto/user.dto.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const createUser = async (req, res) => {
  const data = req.body;
  try {
    // Verificar si el email o el username ya existen
    const userExist = await services.getByEmailOrUsername(
      data.email,
      data.username
    );
    if (userExist) {
      if (userExist.email === data.email) {
        return res
          .status(409)
          .json({ status: "Error", message: "Email already exists" });
      }
      if (userExist.username === data.username) {
        return res
          .status(409)
          .json({ status: "Error", message: "Username already exists" });
      }
    }

    // Procesar la imagen si está presente
    if (req.file) {
      data.thumbnail = req.file.buffer; // Almacenar el Buffer de la imagen en el campo thumbnail
    }

    const userCreated = await services.create(data);
    const newUser = userDTO(userCreated);

    res.status(201).json({
      status: "Success",
      message: "New user created succesfully",
      payload: newUser,
    });
  } catch (error) {
    log.error("Error creating user", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

// Only the development team can use this controller
const getAllUsers = async (req, res) => {
  try {
    const users = await services.getAll();
    if (!users) {
      return res
        .status(404)
        .json({ status: "Error", message: "No users found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Users retrieved successfully",
      payload: users,
    });
  } catch (error) {
    log.error("Error getting users", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

// this controller should be preceded by a middleware that checks if the user is authenticated
const getCurrentUser = async (req, res) => {
  const { id } = req.session.user || req.params;

  try {
    if (!req.session) {
      log.error("Session user not initialized");
      return res
        .status(401)
        .json({ status: "Error", message: "Session user not initialized" });
    }

    const user = await services.getById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    const currentUser = userDTO(user);
    res.status(200).json({
      status: "Success",
      message: "User retrieved successfully",
      payload: currentUser,
    });
  } catch (error) {
    log.error("Error recovering user", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};
// this controller should be preceded by a middleware that checks if the user is authenticated
const updateCurrentUser = async (req, res) => {
  const { id } = req.session.user;
  const data = req.body;
  try {
    if (!req.session.user) {
      log.error("Session user not initialized");
      return res
        .status(401)
        .json({ status: "Error", message: "Session user not initialized" });
    }

    const updatedUser = await services.update(id, data);
    if (!user) {
      log.error("Error updating user", error.message);
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    const formattedUser = userDTO(user);
    res.status(200).json({
      Status: "Success",
      message: "User updated succesfully",
      payload: formattedUser,
    });
  } catch (error) {
    log.error("Error updating user", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

// this controller should be preceded by a middleware that checks if the user is authenticated
const deleteUser = async (req, res) => {
  try {
    const { id } = req.session.user;
    if (!req.session.user) {
      log.error("Session user not initialized");
      return res
        .status(401)
        .json({ status: "Error", message: "Session user not initialized" });
    }
    const user = await services.eliminate(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (error) {
    log.error("Error deleting user", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export {
  createUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUser,
};
