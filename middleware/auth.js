function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      const payload = jwt.verify(token, SECRET_KEY);
      res.locals.user = payload; // Attach the decoded token payload to res.locals
    }
    return next(); // Proceed to the next middleware/route
  } catch (err) {
    return next(new UnauthorizedError("Invalid token"));
  }
}
