const express = require('express')
const cors = require('cors')

const app = express()

const skillRouter = require("./routes/skill")
const creditPackageRouter = require("./routes/creditPackage")
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const adminCourseRouter = require("./routes/adminCourse")
const coachRouter = require("./routes/coach")
const coursesRouter = require("./routes/courses")

app.use(cors())          
app.use(express.json())

// M0：健康檢查——回純文字 OK，不是 JSON；路徑不在 /api 底下
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK')
})

// 之後每完成一個里程碑，路由就多掛一條：
// app.use('/api/credit-package', require('./routes/creditPackage'))
app.use("/api/admin/coaches/courses", adminCourseRouter)
app.use("/api/admin/coaches", adminRouter)
app.use("/api/coaches/skill", skillRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/credit-package", creditPackageRouter);
app.use("/api/users", userRouter)

// 404（W3）
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: '無此路由' })
  return
})

// 錯誤處理守門員（W4：四個參數）
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode === 500 ? "error" : "failed",
    message: err.message || "伺服器錯誤",
  });
})

module.exports = app