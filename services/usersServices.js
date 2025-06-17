import User from "../models/User.js";

const addUser = (data) => User.create(data);
const getUserById = (userId) => User.findByPk(userId);
const getUserByEmail = (email) => User.findOne({ where: { email } });

export default {
  addUser,
  getUserById,
  getUserByEmail,
};
