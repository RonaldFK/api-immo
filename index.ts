import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { dataSource } from './app/data/dataSource';
import {router} from './app/routers/index';
import cors from 'cors';
import { Server } from 'socket.io';
const app = express();
const port = process.env.PORT || 3000;

// Connecion à la source de donnée pour TypeOrm
dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

//
// // soket IO
const serverSocketIo = require('http').createServer(app);
const io = require('socket.io')(serverSocketIo,{
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }});

// const io = new Server({
//   cors: {
//     origin: "http://localhost:8080"
//   }
// });

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/app/controllers/index.html');
// });
// serverSocketIo.use(router);
// io.on('connection', (socket) => {
//   console.log('user connected');
//   // socket.on('disconnect', function () {
//   //   console.log('user disconnected');
//   // });
// })
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', {message:msg});
  });
});
serverSocketIo.listen(3005, function() {
  console.log(`Listening on port 3005`);
});
// //
//
const allowedOrigins = ['http://localhost:8080'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`server launched on port : ${port}`);
});





