import { createServer } from 'http';
import express from 'express';
import next, { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { Server } from "socket.io";
import { v4 } from "uuid";
import { } from '../common/types/global';

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    const app = express();
    const server = createServer(app);

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

    app.get('/health', async (req, res) => {
        res.send('Health').status(200);
    })

    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('draw', (moves, options) => {
            console.log('drawing');
            socket.broadcast.emit('socket_draw', moves, options);
        })
        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    })

    app.all('*', (req: any, res: any) => nextHandler(req, res));
    server.listen(port, () => {
        console.log(`Server is ready listening on ${port}`)
    })
})
