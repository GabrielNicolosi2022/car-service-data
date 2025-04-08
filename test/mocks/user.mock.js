import path from "path";

const thumbnailPath = path.resolve("./test/assets/test-thumbnail.jpg");

export const invalidFormat_1 = "Invalid format request";

export const invalidFormat_2 = {};

export const incompleteUser = {
  first_name: "Jose",
  last_name: "Moñoz",
  email: "josemunoz@gmail.com",
  password: "miPass1234",
  thumbnail: thumbnailPath,
};

export const invalidUser = {
  first_name: "Jose",
  last_name: "Moñoz",
  nickname: 123456,
  email: "josemunoz@gmail.com",
  password: "miPass1234",
  thumbnail: thumbnailPath,
};

export const userAdmin = {
  first_name: "Gabriel",
  last_name: "Nicolosi",
  nickname: "Gabrieldev",
  email: "gabrielDev80@gmail.com",
  password: "hashedPass80",
  role: "admin",
};

export const commonUser = {
  first_name: "Miguel",
  last_name: "Perez",
  nickname: "miguerez",
  phone: "1150485672",
  email: "miguerez@gmail.com",
  password: "Password1234",
  thumbnail: thumbnailPath,
};

export const commonUserUpdated = {
  phone: "1150482345",
};

export const commonUserUpdatedNickname = {
  nickname: "1150482345",
};

export const commonUserUpdatedEmail = {
  email: "migueperez@gmail.com",
};

export const correctLogin = {
  email: "miguerez@gmail.com",
  password: "Password1234",
};

export const LoginWhitoutEmail = {
  password: "Password1234",
};

export const LoginWhitoutPassword = {
  email: "miguerez@gmail.com",
};
