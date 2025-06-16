import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email is not valid",
      },
    },
    unique: {
      args: true,
      msg: "Email must be unique",
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// Contact.sync({ alter: true });

export default User;
