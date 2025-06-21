import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import { emailRegexp } from "../constants/global.js";
import { subscriptions } from "../constants/auth.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: emailRegexp,
    },
    unique: {
      args: true,
      msg: "Email must be unique",
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscriptions,
    defaultValue: subscriptions[0],
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync();

export default User;
