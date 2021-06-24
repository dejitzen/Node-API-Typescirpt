"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var getCakes_1 = require("../controllers/getCakes");
var deleteCakes_1 = require("../controllers/deleteCakes");
var addCakes_1 = require("../controllers/addCakes");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.json({ strict: false, limit: "50mb" }));
app.use(cors());
var Pool = require('pg').Pool;
console.log(process.env);
var pool = new Pool({
    host: process.env.database_host,
    database: process.env.database,
    user: process.env.database_user,
    port: process.env.database_port,
    password: process.env.database_password,
    ssl: { rejectUnauthorized: false }
});
app.post('/cakes', function (req, res) {
    addCakes_1.addCakes(pool, req, res);
});
app.get('/cakes', function (req, res) {
    getCakes_1.getCakes(pool, req, res);
});
app.delete('/cakes', function (req, res) {
    deleteCakes_1.deleteCakes(pool, req, res);
});
app.listen(process.env.PORT || 3000, function () {
    console.log("App listening at cakesapi.herokuapp.com request_id=e8f85390-c6aa-44f3-b29d-ad654290e095:" + 5432);
});
