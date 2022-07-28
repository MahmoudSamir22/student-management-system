const userRouter = require("./userRoute");
const authRouter = require("./authRoute");
const courseRouter = require("./courseRoute");
const gradesRouter = require("./gradesRoute");
const taskRouter = require("./taskRoute");
const scheduleRouter = require("./scheduleRoute");
const studentRouter = require("./studentRoute");
const instructorRouter = require("./instructorRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/courses", courseRouter);
  app.use("/api/v1/grades", gradesRouter);
  app.use("/api/v1/tasks", taskRouter);
  app.use("/api/v1/schedules", scheduleRouter);
  app.use("/api/v1/students", studentRouter);
  app.use("/api/v1/instructor", instructorRouter);
};

module.exports = mountRoutes;
