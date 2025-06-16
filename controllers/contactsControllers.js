import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const getAllContactsController = async (req, res) => {
  const contacts = await contactsService.listContacts();
  return res.status(200).json(contacts);
};

const getOneContactController = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const deleteContactController = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const createContactController = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  return res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  const contact = await contactsService.updateContactById(
    req.params.id,
    req.body
  );
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const updateStatusContactController = async (req, res) => {
  const contact = await contactsService.updateStatusContact(
    req.params.id,
    req.body
  );
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

export default {
  getAllContactsController: controllerWrapper(getAllContactsController),
  getOneContactController: controllerWrapper(getOneContactController),
  deleteContactController: controllerWrapper(deleteContactController),
  createContactController: controllerWrapper(createContactController),
  updateContactController: controllerWrapper(updateContactController),
  updateStatusContactController: controllerWrapper(
    updateStatusContactController
  ),
};
