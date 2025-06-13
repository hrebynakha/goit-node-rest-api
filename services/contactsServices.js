import Contact from "../models/contacts.js";

const listContacts = () => Contact.findAll();
const getContactById = (contactId) => Contact.findByPk(contactId);
const addContact = (data) => Contact.create(data);

const removeContact = (contactId) => {
  const contact = getContactById(contactId);
  if (!contact) return null;
  contact.destroy();
  return contact;
};

const updateContactById = async (contactId, data) => {
  const contact = getContactById(contactId);
  if (!contact) return null;
  contact.update(data);
  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
