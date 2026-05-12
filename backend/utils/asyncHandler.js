/**
 * asyncHandler wraps an async Express route handler and forwards any thrown
 * errors to Express's next() error middleware. This eliminates the need for
 * try/catch blocks in every controller.
 *
 * Usage: router.get("/route", asyncHandler(myController))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
