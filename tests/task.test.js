const request = require("supertest");
const app = require("../src/app");
const {
    userOneID,
    UserOne,
    setUpDb,
    UserTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree
} = require("./fixtures/db");

beforeEach(setUpDb);
const Task = require("../src/models/task");

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
        .send({
            description: "Fill up my tests",
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test("Get the tasks for the user", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
        .send({
            owner: userOneID,
        })
        .expect(200);
    expect(response.body.length).toEqual(2);
});


test('Try deleting other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set("Authorization", `Bearer ${UserOne.tokens[0].token}`)
        .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})