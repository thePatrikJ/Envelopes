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

app.post('/envelopes/newEnv', (req, res) => {
    let newEnv = req.body;
    if (newEnv && newEnv.amount && newEnv.name) {
        newEnv.id = nextId++;
        envelopes.push(newEnv);
        totalBudget += newEnv.amount;
        res.status(201).send(`Succes! Total Buget: ${totalBudget}`);
        console.log('succes');
    }
    else {
        res.sendStatus(400);
    }
})

app.get('/envelopes', (req, res) => {
    res.send(envelopes);
})

app.get('/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
        if (id && envelopes.length >= id && id > 0) {
        const envelopeById = envelopes[id - 1];
        res.send(envelopeById);
    }
    else {
        res.sendStatus(404);
    }
})

app.put('/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
    const updateEnv = req.body;
    const index = envelopes.findIndex(env => env.id === id)
    if (index !== -1 && !envelopes.hasOwnProperty(amount) || !envelopes.hasOwnProperty(extract)) {
        const envelope = envelopes[index];
        if (updateEnv.extract !== undefined) {
            envelope.amount -= updateEnv.extract;
        }
        if (updateEnv.amount !== undefined) {
            envelope.amount = updateEnv.amount;
        }
        if (updateEnv.name) {
            envelope.name = updateEnv.name;
        }
        envelopes[index] = {...envelopes[index], ...updateEnv};
        res.sendStatus(200);
    } 
    else {
        res.sendStatus(404);
    }
})

app.delete('/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = envelopes.findIndex(env => env.id === id)
    if (index !== -1) {
        envelopes.splice(index, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
})

app.post("/envelopes/transfer", (req, res) => {
    const {fromId, toId} = req.query;
    const {amount} = req.body;
    const fromEnv = envelopes.find(env => {env.id === Number(fromId)})
    const toEnv = envelopes.find(env => {env.id === Number(toId)})
    if (!fromEnv || !toEnv) {
        res.sendStatus(404);
    }
    if (fromEnv.amount < amount) {
        res.send('Insufficient funds!!! in the source envelope!')
    }
    //transfer
    fromEnv.amount -= amount;
    toEnv.amount += amount;
    res.status(200).send('The transfer was Succesful!');
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})