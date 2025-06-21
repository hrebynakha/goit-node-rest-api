import Contact from "../models/Contact.js";

const listContacts = async ({ query, limit, offset }) => {
  return Contact.findAll({
    where: query,
    limit,
    offset,
  });
};
const getContact = (query) => Contact.findOne({ where: query });
const addContact = (data) => Contact.create(data);

const removeContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;
  contact.destroy();
  return contact;
};

const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;
  contact.update(data);
  return contact;
};

const updateStatusContact = (query, data) => {
  return updateContact(query, data);
};

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
