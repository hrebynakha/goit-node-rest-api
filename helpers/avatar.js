import { join, resolve } from "node:path";
import { rename } from "node:fs/promises";
import axios from "axios";
import gravatar from "gravatar";
import crypto from "crypto";
import { avatarsDir } from "../constants/auth.js";

const GRAVATAR_BASE_URL = "https://api.gravatar.com/v3";
const { GRAVATAR_API_KEY } = process.env;
const avatarsPath = resolve("public", avatarsDir);

const getGravatarHash = (email) => {
  email = email.trim().toLowerCase();
  const hash = crypto.createHash("sha256").update(email).digest("hex");
  return hash;
};

const getAvatarUrl = async (email) => {
  const hash = getGravatarHash(email);
  const profileUrl = `${GRAVATAR_BASE_URL}/profiles/${hash}`;
  const response = await axios.get(profileUrl, {
    headers: {
      Authorization: `Bearer ${GRAVATAR_API_KEY}`,
    },
  });
  const { data } = response;
  return data.avatar_url;
};

export const createAvatarUrl = async (email) => {
  try {
    const avatarUrl = await getAvatarUrl(email);
    return avatarUrl;
  } catch (error) {
    return gravatar.url(email, {
      protocol: "https",
      s: "200",
      r: "pg",
      d: "retro",
    });
  }
};

export const saveAvatar = async (file) => {
  if (file) {
    const { path: oldPath, filename } = file;
    const newPath = join(avatarsPath, filename);
    await rename(oldPath, newPath);
    return join(avatarsDir, filename);
  }
};
