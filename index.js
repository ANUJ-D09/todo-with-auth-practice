const express = require('express')
const app = express()
const port = 3069
const jwt = require('jsonwebtoken');
const JWT_SECRET = "shreehari";

app.use(express.json());

const users = [];
let todo = [
    { id: 1, task: "Learn JS" },
    { id: 2, task: "Build project" }
]

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

app.get('/todos', (req, res) => {
    res.json(todo);
});
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
app.get('/', function(req, res) {
    res.sendFile("/Users/anujdamani/Desktop/100xdevs/Todofullstack/public/index.html");
})

app.post('/post', function(req, res) {
    const newtodo = {
        id: todo.length + 1,
        task: req.body.task
    };
    todo.push(newtodo);

    res.json({ message: "operation successful" });
});
app.put('/update', function(req, res) {


})
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todo = todo.filter(t => t.id !== id);
    res.json({
        message: "Deleted",
        remaining: todo
    });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})