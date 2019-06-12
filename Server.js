const Map = require('./Map');
const Bots = require('./Bots');
const Eat = require('./entities/Eat');

let map_for_send = '{}';
setInterval(() => {
    let send_bots = Bots.bots.filter(e => e).map(e => e.pos);
    let send_map = [];
    send_map =  Map.map.map(e => e.filter(e => !(e instanceof Eat)).map(t => t.reaction ));
    map_for_send = JSON.stringify([send_map, send_bots]);
}, 1);

var server = {
    start() {
        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 8080 });
        wss.on('connection', function connection(ws) {
            let a = setInterval(() => {
                ws.send(map_for_send);
            }, 1);
            ws.on('close', () => clearInterval(a));
        });
    }
}

if (global.server == undefined) {
    global.server = server;
    server.start();
}

module.exports = global.server;