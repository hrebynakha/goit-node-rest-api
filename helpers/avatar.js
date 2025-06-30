import { join, resolve } from "node:path";
import { rename } from "node:fs/promises";
import gravatar from "gravatar";
import { avatarsDir } from "../constants/auth.js";

const avatarsPath = resolve("public", avatarsDir);

export const createAvatarUrl = (email) => {
  return gravatar.url(email, {
    protocol: "https",
    s: "200",
    r: "pg",
    d: "identicon",
  });
};

export const saveAvatar = async (file) => {
  if (file) {
    const { path: oldPath, filename } = file;
    const newPath = join(avatarsPath, filename);
    await rename(oldPath, newPath);
    return join(avatarsDir, filename);
  }
};
