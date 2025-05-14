const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ status: "failed", message: "Unauthorized Login!" });
  } else {
    const data = jwt.verify(token, 'khuch bhii');
    const userData = await UserModel.findOne({ _id: data.ID });
    req.udata = userData;
    next();
  }
};
module.exports = verifyToken;