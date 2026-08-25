const { DataSource } = require('typeorm')
const config = require("../src/config/index")

const Skill = require("./entities/Skill")
const CreditPackage = require("./entities/CreditPackage")

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
    Skill,
    CreditPackage
  ],
  migrations: [
    __dirname + '/migrations/*.js'
  ],
})

module.exports = { dataSource }