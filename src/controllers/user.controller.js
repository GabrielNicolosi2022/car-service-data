import getLogger from "../utils/logger.utils.js";
import * as services from "../services/user.services.js";
import { userDTO } from "../dto/user.dto.js";

const log = getLogger();

// Registro local de usuario - toda la lógica está en el controlador de registro en passportStrategies
const userRegister = async (req, res) => {
  console.log("controller - userRegister: ", req);
  try {
    const userCreated = req.user;

    res.status(201).json({
      status: "success",
      message: "Registro exitoso. Inicia sesión para continuar.",
      user: userCreated,
    });
  } catch (error) {
    log.error("Error creating user", error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

// Login local de usuario
const userLogin = async (req, res) => {
  // TODO CREAR LOGIN A PARTIR DE ECOMMBACK LOGIN
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
  userRegister,
  userLogin,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUser,
};
