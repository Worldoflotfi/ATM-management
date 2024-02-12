// eventHandler.js

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const eventHandler = new MyEmitter();

module.exports = eventHandler;
