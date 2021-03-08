const express = require('express')

const app = express();

const port = 5000;

app.get('/api/getToDo', (req, res) => {
    console.log("In")
    res.json([{
        id: 1,
        description: "Wash"
    }])
});

app.listen(port, () => {
    console.log("Server started on port " + port)
})