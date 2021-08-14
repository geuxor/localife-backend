"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Welcome!');
});
// Server setup
app.listen(process.env.PORT, function () {
    console.log('The application is listening '
        + 'on port http://localhost:' + process.env.PORT);
});
