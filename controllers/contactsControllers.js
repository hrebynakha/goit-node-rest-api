import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  return res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) {
    const { status, message } = HttpError(404, "Not found");
    return res.status(status).json({ message });
  }
  return res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  if (!contact) {
    const { status, message } = HttpError(404, "Not found");
    return res.status(status).json({ message });
  }
  return res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  return res.status(201).json(contact);
};

export const updateContact = async (req, res, next) => {
  const contact = await contactsService.updateContactById(
    req.params.id,
    req.body
  );
  if (!contact) {
    const { status, message } = HttpError(404, "Not found");
    return res.status(status).json({ message });
  }
  return res.status(200).json(contact);
};
