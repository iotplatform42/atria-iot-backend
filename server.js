require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const generateAccessToken = require('./genAccessToken');
const verify = require('./verify');
const cors = require('cors')
const { createDevice, deleteDevice, getDevices, getDeviceState } = require('./supabse')

app.use(cors())
app.get('/', (req, res) => {
    res.send('<h1>G42</h1>');
});

app.get('/token/:id', (req, res) => {
    if (req.params.id) {
        res.json({ token: generateAccessToken(req.params.id) });
    }
});
app.get('/delete/:id', async (req, res) => {
    if (req.params.id) {

        try {

            return res.json({ data: (await deleteDevice({ id: req.params.id }))[0] })
        } catch (error) {
            return res.sendStatus(501)
        }
    }
    res.statusCode = 501
    res.json({ message: 'delete failed' })

});
app.get('/new', async (req, res) => {

    try {
        const data = await createDevice()
        console.log('created: ', data)
        return res.jsonp({ ...data[0], token: generateAccessToken(data.id) })
    } catch (error) {
        return res.sendStatus(501)
    }
    return res.sendStatus(501)

});
app.get('/verify/:id', (req, res) => {

    if (req.params.id) {
        try {
            res.json(verify(req.params.id));
        } catch (error) {
            res.json(error);
        }
    }
});

app.get('/devices/', async (req, res) => {
    try {
        const data = await getDevices()
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.get('/test-device/:id', async (req, res) => {
    if (req.params.id) {
        try {
            return res.send((await getDeviceState({ id: req.params.id }))[0])
        } catch (error) {
            return res.sendStatus(501)
        }
    }
    res.statusCode = 501
    res.json({ message: 'delete failed' })

});

app.get('/device/:jwt', async (req, res) => {
    if (req.params.id) {
        const { deviceId } = verify(req.params.id)
        if (deviceId)
            try {
                return res.json({ data: (await getDeviceState({ id: deviceId }))[0] })
            } catch (error) {
                res.statusCode = 501
                return res.json({ message: 'delete failed' })
            }
        res.statusCode = 501
        return res.json({ message: 'delete failed' })

    }
    res.statusCode = 501
    res.json({ message: 'delete failed' })

});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(process.env.PORT || 8000, () => {
    console.log('listening on ', process.env.PORT);
});