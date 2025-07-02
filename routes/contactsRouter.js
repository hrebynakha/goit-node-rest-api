import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

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

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteContactSchema),
  contactsControllers.updateStatusContactController
);

export default contactsRouter;
