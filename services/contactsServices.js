import Contact from "../models/Contact.js";

const listContacts = () => Contact.findAll();
const getContactById = (contactId) => Contact.findByPk(contactId);
const addContact = (data) => Contact.create(data);

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  contact.destroy();
  return contact;
};

const updateContactById = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  contact.update(data);
  return contact;
};

const updateStatusContact = (contactId, data) => {
  return updateContactById(contactId, data);
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
