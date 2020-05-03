const mongoose = require("mongoose");
mongoose.connect(process.env.connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});


// const me = new User({
//   name: "Himanshu",
//   password: "Hhkajin12",
//   email: "jain@duke.EDU",
//   age: 19,
// });

// me.save()
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));



// const taskHW = new Task({
//   description: "Do homework",
//   completed: true,
// });

// taskHW
//   .save()
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));