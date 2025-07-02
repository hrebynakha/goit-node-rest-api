import HttpError from "./HttpError.js";

const ExeFileFormatError = () => {
  return HttpError(400, ".exe file format is not allowed");
};

export default {
  ExeFileFormatError,
};
