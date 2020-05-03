const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const taskRouter = require("./routers/task");
const app = express();
const userRouter = require("./routers/user");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
//middleware
// app.use((req, res, next) => {
//   res.status(503).send("Site under maintenance")
// })
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Up and running on " + port);
});
// const bcrypt = require("bcrypt");
// const myFunction = async () => {
//   const password = "123uhuj";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   const isMatch = await bcrypt.compare("123usshuj", hashedPassword);
//   console.log(isMatch);
//   console.log(password);
//   console.log(hashedPassword);
// };

// myFunction();



// const multer = require('multer')

// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please upload a word doc file'))
//     }
//     return cb(undefined, true)
//   }
// })

// const errorMiddleware = (req, res, next) => {
//   throw new Error('From my middleware')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({
//     error: error.message
//   })
// })