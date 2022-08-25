import fs from 'fs';

import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';

import routerMessages from "./routes/messageRoutes.js"
import routerProducts from './routes/productRoutes.js'

import { buildProduct } from './controllers/productsController.js'
import { buildMessage } from './controllers/messagesController.js'

import { Container } from './DAO/container.js'

import util from 'util';

import pkg from 'normalizr';



const app = express();

const httpServer = http.Server(app)
const io = new IOServer(httpServer)


const PORT = process.env.PORT || 11000;

const server = httpServer.listen(PORT, () => {
    console.log(`Server online at port ${server.address().port}`);
});

server.on('error', err => console.log(err));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


export const Messages = new Container('messages.json')





//Routers


app.use('/api/products-test', routerProducts);
app.use('/api/messages', routerMessages)


const _products = buildProduct();

let messages = [];
const handleMsg = async () => {
    await Messages.getAll().then(data =>
        data.messages.forEach(msg => messages.push(msg)))
}
handleMsg();

// NORMALIZR ······························
const { schema, normalize, denormalize } =  pkg;


function print(obj){
    console.log(util.inspect(obj, false, 12, true));
}

const autores = new schema.Entity('autores');

const organigrama = new schema.Entity('autores',{
    autores:[autores]
})

const msgSchema = new schema.Entity('autores', {autores: [organigrama]})


const data = JSON.parse(fs.readFileSync('./messages.json'))
const normalizeMsg = normalize(data, msgSchema);

print(normalizeMsg)
const desnormalizeMsg = denormalize( normalizeMsg.result, msgSchema , normalizeMsg.entities)
console.log("###########Desnormalizado######")
print(desnormalizeMsg)

const long0 = JSON.stringify(data).length

const long1 = JSON.stringify(normalizeMsg).length

const porcentaje = (long1 * 100) / long0;

console.log(long0+ " bytes")
console.log(long1+ " bytes")

console.log("porcentaje de compresión: ", porcentaje.toFixed(2)+' %')

// NORMALIZR ·········································

io.on('connection', socket => {
    console.log('Nueva conexión');

    socket.emit('products', _products)
    socket.emit('messages', messages)

    socket.on('msg', async socket => {
        const {email, msg} = socket;
        const MSG = buildMessage(email, msg)
       await Messages.save(MSG)
    })

    socket.emit('porcentaje',porcentaje)
})

