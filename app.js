const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const indexRouter = require('./api/index');
app.use('/api', indexRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const io = require('socket.io')();
io.on('connection', (socket) => {
    console.log('test');
    socket.emit('test');
});
app.io = io;

module.exports = app;
