import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import auth from "../config/config-passport.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, contactsControllers.getAllContactsController);

contactsRouter.get("/:id", auth, contactsControllers.getOneContactController);

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

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteContactSchema),
  contactsControllers.updateStatusContactController
);

export default contactsRouter;
