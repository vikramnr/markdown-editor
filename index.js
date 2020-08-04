//require('dotenv').config();
const express = require('express')
const sharejs = require('share')
// const redis = require('redis')
const app = express()
const PORT = process.env.PORT || 3000

const redisClient = require('redis').createClient({
  port: 15243, // replace with your port
  host: process.env.REDIS_HOST, // replace with your hostanme or IP address
  password: process.env.REDIS_PASSWORD,
})


var options = {
  db: { type: 'redis', client: redisClient },
}
//redis-15243.c10.us-east-1-4.ec2.cloud.redislabs.com:15243

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('pad')
})

app.get('/(:id)', (req, res) => {
  res.render('pad')
})

sharejs.server.attach(app, options)

app.listen(PORT, () => {
  console.log('Server started at', PORT)
})
