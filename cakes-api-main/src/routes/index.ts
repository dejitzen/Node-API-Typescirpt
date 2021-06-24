import {getCakes} from "../controllers/getCakes"
import {deleteCakes} from "../controllers/deleteCakes"
import {addCakes} from "../controllers/addCakes"
import {Json,CustomResponse} from "../../models/cake"
import * as dotenv from 'dotenv';
dotenv.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser")
var cors = require("cors");
app.use(bodyParser.json({ strict: false, limit: "50mb" }));
app.use(cors());
const { Pool } = require('pg')
console.log(process.env)
const pool = new Pool({
  host: process.env.database_host,
  database: process.env.database,
  user: process.env.database_user,
  port: process.env.database_port,
  password: process.env.database_password, 
  ssl: { rejectUnauthorized: false }
})
app.post('/cakes',(req: Request, res: CustomResponse) => {
    addCakes(pool,req,res)
 })
app.get('/cakes',(req: Request, res: CustomResponse) => {
  getCakes(pool,req,res)
})
app.delete('/cakes',(req: Request, res: CustomResponse) => {
  deleteCakes(pool,req,res)
})
app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at cakesapi.herokuapp.com request_id=e8f85390-c6aa-44f3-b29d-ad654290e095:${5432}`)
})