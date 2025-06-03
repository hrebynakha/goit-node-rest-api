import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const __dirname = path.resolve();
const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
const findContactById = (contacts, contactId) =>
  contacts.findIndex((contact) => contact.id === contactId);

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = findContactById(contacts, contactId);
  if (contactIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(contactIndex, 1)[0];
  updateContacts(contacts);
  return removedContact;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const contactIndex = findContactById(contacts, contactId);
  if (contactIndex === -1) {
    return null;
  }
  const updatedContact = { ...contacts[contactIndex], ...data };
  contacts[contactIndex] = updatedContact;
  updateContacts(contacts);
  return updatedContact;
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
