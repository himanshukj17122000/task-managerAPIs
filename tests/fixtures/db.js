const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const userOneID = new mongoose.Types.ObjectId();
const UserOne = {
    _id: userOneID,
    name: "jain",
    email: "jain@duke.edu",
    password: "1234567@",
    tokens: [{
        token: jwt.sign({
                _id: userOneID,
            },
            process.env.SECRET
        ),
    }, ],
};

const userTwoID = new mongoose.Types.ObjectId();
const UserTwo = {
    _id: userTwoID,
    name: "Himanshu",
    email: "jain2@duke.edu",
    password: "1234567@",
    tokens: [{
        token: jwt.sign({
                _id: userOneID,
            },
            process.env.SECRET
        ),
    }, ],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Hello check the course again",
    completed: false,
    owner: UserOne._id,
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Hello again",
    completed: false,
    owner: UserOne._id,
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Hello complete the course",
    completed: false,
    owner: UserTwo._id,
};

const setUpDb = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(UserOne).save();
    await new User(UserTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};
module.exports = {
    userOneID,
    UserOne,
    setUpDb,
    userTwoID,
    UserTwo,
    taskOne,
    taskTwo,
    taskThree
};