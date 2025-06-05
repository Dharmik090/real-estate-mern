const checkUserAccess = (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
}

module.exports = {
  checkUserAccess
}