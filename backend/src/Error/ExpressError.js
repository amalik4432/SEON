class ExpressError extends Error {
  constructor(status, message) {
    super();
    status = this.status;
    message = this.message;
  }
}

export default ExpressError;
