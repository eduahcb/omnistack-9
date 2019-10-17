const express = require('express');
const requireDir = require('require-dir');
const connection = require('./config/dbConnection');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const { session, spot, dashboard, bookings } = requireDir('./app/routes');

const connectedUsers = {};

class App {
  constructor() {
    this.server = express();
    this.http = require('http').Server(this.server);
    this.io = socket(this.http);
    this.connectedUsers = {};

    this._io();
    this._middlewares();
    this._connection();
    this._routes();
  }

  _io() {
    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;

      connectedUsers[user_id] = socket.id;
    });
  }

  _middlewares() {
    this.server.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = connectedUsers;

      return next();
    });

    this.server.use(cors());
    this.server.use(express.json());
  }

  _routes() {
    this.server.use('/sessions', session);
    this.server.use('/spots', spot);
    this.server.use('/dashboard', dashboard);
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    this.server.use('/bookings', bookings);
  }
  _connection() {
    connection();
  }

  getServer() {
    return this.http;
  }
}

module.exports = new App();
