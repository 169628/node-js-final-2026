const jwt = require("jsonwebtoken");

const responseMessage = require("../utils/responseMessage")
const config = require("../config/index");

const { jwtSecret } = config.secret

async function isAuth(req, res, next) {
  try {
    // 1. 從 header 取 token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(responseMessage.error("請先登入",401));
    }

    const token = authHeader.split(" ")[1];

    // 2. 驗證 token
    const decoded = jwt.verify(token, jwtSecret );

    // 3. 用 decoded.id 查 User
    // const userRepo = dataSource.getRepository("User");
    // const user = await userRepo.findOneBy({ id: decoded.id });
    // if (!user) {
    //   return next(appError(401, "無效的 token"));
    // }

    // 4. 掛到 req.user，後續 controller 就能用
    // req.user = user;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(responseMessage.error("Token 已過期",401));
    }
    return next(responseMessage.error("無效的 token",401));
  }
}
module.exports = isAuth;