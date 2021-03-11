const express = require('express')

const getCards = require("./utils/getCards");
const createCard = require("./utils/createCard");

const app = express();

const port = 5000;

app.get('/api/getToDo', (req, res) => {
    getCards((error, lists) => {
        res.json(lists)
    });
});

app.get('/api/createCard', (req, res) => {
    let { name, list_id } = req.query
    createCard(name, list_id, (error, response) => {
        res.json(response)
    });
});

app.listen(port, () => {
    console.log("Server started on port " + port)
})