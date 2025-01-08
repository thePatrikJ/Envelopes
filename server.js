const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = 4000;

app.get('/', (req, res) => {
    res.send('HELLO');
})
    const envelopes = [];
    let totalBudget = 0;
    let nextId = 1

app.post('/newEnv', (req, res) => {
    let newEnv = req.body;
    if (newEnv && newEnv.amount && newEnv.name) {
        newEnv.id = nextId++;
        envelopes.push(newEnv);
        totalBudget += newEnv.amount;
        res.status(201).send(`Succes! ${totalBudget}, ${envelopes}`);
        console.log('succes');
    }
    else {
        res.sendStatus(400);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})