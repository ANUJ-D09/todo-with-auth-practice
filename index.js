const express = require('express')
const app = express()
const port = 3069
const jwt = require('jsonwebtoken');
const { headers } = require('next/headers');
const JWT_SECRET = "shreehari";

app.use(express.json());

const users = [];
app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "signed up"
    });

})
app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const founduser = users.find(user => user.username === username && user.password === password);
    if (founduser) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ message: "You are signed in enjoy", token });

    } else {
        res.json({ message: "user not found" })
    }

})
app.get('/me', function(req, res) {

    const token = req.headers['token'];
    const decoded = jwt.verify(token, JWT_SECRET);
    const founduser = users.find(user => user.username === decoded.username);
    if (founduser) {
        return res.json({
            username: founduser.username,
            password: founduser.password
        });
    } else {
        res.json({ message: "notfound" });
    }
})

app.post('/post', function(req, res) {

    res.json({ message: "for create operation" })
})
app.put('/update', function(req, res) {
    res.json({ message: "for update operation" })

})
app.delete('/delete', function(req, res) {

    res.json({ message: "for Delete operation" })

})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})