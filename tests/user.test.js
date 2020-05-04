const request = require('supertest')
const app = require('../src/app')
const {
    userOneID,
    UserOne,
    setUpDb
} = require('./fixtures/db')
const User = require('../src/models/user')

beforeEach(setUpDb)
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "Himanshu",
        email: 'himasssns@duke.edu',
        password: '1234467@'
    }).expect(201)
    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assert that the right information was sent
    expect(response.body).toMatchObject({
        user: {
            name: 'Himanshu',
            email: 'himasssns@duke.edu',

        },
        token: user.tokens[0].token

    })

    expect(user.password).not.toBe('1234467@')

})

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: UserOne.email,
        password: UserOne.password
    }).expect(200)

    //assert that the database was changed correctly
    const user = await User.findById(userOneID)
    expect(user).not.toBeNull()


    //assert that the right information was sent
    expect(response.body).toMatchObject({
        user: {
            name: UserOne.name,
            email: UserOne.email,

        },
        token: user.tokens[1].token

    })
})

test('Should not log in the user', async () => {
    await request(app).post('/users/login').send({
        email: UserOne.email,
        password: '123snjn'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get the user for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('Delete the authorised user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should not delete the unauthorised user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Updating the user values', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            name: 'Himanshu'
        })
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.name).toBe('Himanshu')
})

test('Should not update invalid fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            location: 'Delhi'
        })
        .expect(400)
})