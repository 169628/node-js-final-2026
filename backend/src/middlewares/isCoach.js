const responseMessage = require("../utils/responseMessage")

function isCoach(req, res, next) {
  if (!req.user || req.user.role !== "COACH") {
    return next(responseMessage.error("使用者尚未成為教練",401))
  }
  next();
}

module.exports = isCoach;