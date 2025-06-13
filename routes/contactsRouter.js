import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContactsController);

contactsRouter.get("/:id", contactsControllers.getOneContactController);

contactsRouter.delete("/:id", contactsControllers.deleteContactController);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContactController
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContactController
);

export default contactsRouter;
