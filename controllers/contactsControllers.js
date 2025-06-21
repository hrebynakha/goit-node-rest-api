import contactsService from "../services/contactsServices.js";
import HttpError from "../exceptions/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const getAllContactsController = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;
  const favorite = req.query.favorite || null;
  const { id } = req.user;
  const query = { owner: id };
  if (favorite) query.favorite = favorite;
  const contacts = await contactsService.listContacts({
    query,
    limit,
    offset,
  });
  return res.status(200).json(contacts);
};

const getOneContactController = async (req, res) => {
  const { id } = req.user;
  const contact = await contactsService.getContact({
    id: req.params.id,
    owner: id,
  });
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const deleteContactController = async (req, res) => {
  const { id } = req.user;
  const contact = await contactsService.removeContact({
    id: req.params.id,
    owner: id,
  });
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const createContactController = async (req, res) => {
  const { id } = req.user;
  const contact = await contactsService.addContact({ ...req.body, owner: id });
  return res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  const { id } = req.user;
  const contact = await contactsService.updateContact(
    { id: req.params.id, owner: id },
    req.body
  );
  if (!contact) throw HttpError(404);
  return res.status(200).json(contact);
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.user;
  const contact = await contactsService.updateStatusContact(
    { id: req.params.id, owner: id },
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
