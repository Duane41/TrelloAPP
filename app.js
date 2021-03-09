const express = require('express')

const toDo = require("./utils/getCards");

const app = express();

const port = 5000;

app.get('/api/getToDo', (req, res) => {
    toDo((error, lists) => {
        res.json(lists)
    });
});

app.listen(port, () => {
    console.log("Server started on port " + port)
})