const expressError = class expressError extends Error {
  constructor(status = 500, error = false, message = "Internal Server Error") {
    super();
    this.status = status;
    this.error = error;
    this.message = message;
  }
};
export default expressError;
