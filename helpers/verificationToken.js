import { nanoid } from "nanoid";

export const createVerificationToken = () =>
  `${nanoid()}_${Math.round(Math.random() * 1e9)}`;
