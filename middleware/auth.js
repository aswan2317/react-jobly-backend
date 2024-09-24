const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      const payload = jwt.verify(token, SECRET_KEY);
      req.user = payload; // Attach the decoded token payload (user) to the request object
    }
    return next(); // If authenticated or no token, proceed to the next middleware/route
  } catch (err) {
    return next(); // If there's an error, continue without authentication
  }
}
