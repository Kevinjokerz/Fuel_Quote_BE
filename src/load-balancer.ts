import http from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors'
import httpProxy from 'http-proxy';
import {v4 as uuidv4} from 'uuid';

const app = express();
app.use(cors())

const proxy = httpProxy.createProxyServer({ ws: true });
app.set('trust proxy', true);
const httpServer = http.createServer(app);

const cacheIpToServer: any = {};

app.all('/api/*', async (req: Request, res: Response) => {
    const sessionID = uuidv4();
    req.headers.sessionID = sessionID;
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.socket.remoteAddress as string);
    const server = await getServer(ip);
    console.log('HTTP request', server);
    cacheIpToServer[ip] = server;
    proxy.web(req, res, { target: server }, async (err) => {
        console.log(err);
    });
})

httpServer.listen(6000, async () => {
    console.log('Load balancer is running on port 6000');
});

function stringToNumber(str: string) {
    let number = 0;

    for (let i = 0; i < str.length; i++) {
        number += str.charCodeAt(i);
    }

    return number;
}
async function getServers() {
    const serverSockets = ['http://localhost:3000'];
    return serverSockets;
}

function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}

async function getServer(ip: string) {
    const servers = await getServers()
    // const index = (Math.round(stringToNumber(ip)) + 1) % servers.length;
    const index = getRandomInt(servers.length);
    const server = servers[index];
    return server;
}