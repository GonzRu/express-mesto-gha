module.exports = (req, res, next) => {
  req.user = {
    _id: '6323082955e2de14704d5966'
  };

  next();
}
