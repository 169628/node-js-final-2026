const { DataSource } = require('typeorm')
const config = require("../src/config/index")

const Skill = require("./entities/Skill")

const { host,port,username,password,database,synchronize,ssl } = config.db

const dataSource = new DataSource({
  type: 'postgres',
  host,
  port: Number(port),
  username,
  password,
  database,
  synchronize,
  ssl,
  entities: [
    Skill
  ],
})

module.exports = { dataSource }