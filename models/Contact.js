import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import { phoneRegex } from "../constants/contacts.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: "Name must be between 3 and 30 characters long",
      },
    },
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: phoneRegex,
    },
    unique: {
      args: true,
      msg: "Phone must be unique",
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Contact.sync({ alter: true });

export default Contact;
