import bcrypt from "bcrypt";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isSamePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export { createHash, isSamePassword, isValidPassword };
