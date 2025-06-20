const express = require('express')
const app = express()
const port = 3069

app.use(express.json());

app.post('/signin', function(req, res) {
    res.json({ message: "You are signed in sp enjoy" });
})
app.post('/signup', function(req, res) {

    res.json({ message: "You are signed up sp enjoy" });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})