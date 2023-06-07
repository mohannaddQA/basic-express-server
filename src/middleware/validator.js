module.exports = (req, res, next) => {
  const name = req.query.name;

  if (name) {
    next();
  } else {
    next("please provide any name");
  }
};
