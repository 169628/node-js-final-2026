require("dotenv").config();
const db = require("./db");
const web = require("./web");
const secret = require("./secret");


module.exports = { 
    db,
    web,
    secret
 };