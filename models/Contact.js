import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import { phoneRegex } from "../constants/contacts.js";
import { emailRegexp } from "../constants/global.js";

const Contact = sequelize.define(
  "contact",
  {
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
        is: emailRegexp,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: phoneRegex,
      },
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    indexes: [
      {
        name: "contact_email_owner_unique",
        unique: true,
        fields: ["email", "owner"],
      },
      {
        name: "contact_phone_owner_unique",
        unique: true,
        fields: ["phone", "owner"],
      },
    ],
  }
);

// Contact.sync();

export default Contact;
