const express = require("express");
require("./db/mongoose");
const taskRouter = require("./routers/task");
const app = express();
const userRouter = require("./routers/user");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app