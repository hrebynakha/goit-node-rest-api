import path from "node:path";
import fs from "node:fs";
import "dotenv/config";
import "./sequelize.js";

import Contact from "../models/Contact.js";

const contactsPath = path.join(path.resolve(), "db", "contacts.json");

const jsonContacts = JSON.parse(fs.readFileSync(contactsPath));

const contacts = jsonContacts.map((contact) => ({
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  owner: 1,
}));

console.log("---> Seed started!!");
console.table(contacts);

const seedContacts = async () => {
  try {
    await Contact.bulkCreate(contacts);
  } catch (error) {
    console.error("Seed error: ", error);
    process.exit(1);
  }
};

await seedContacts();
console.log("---> Seed completed!!");
process.exit(0);
