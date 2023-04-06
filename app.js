const router = require('./routers/router')
const express = require('express')
const app = express()
const session = require('express-session')


const port = 3000;
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/Images'))
app.use(express.static(__dirname + '/css'))
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'mau tau yaaaa',
  resave: false,
  saveUninitialized: false,
  maxAge: Date.now() + (30 * 86400 * 1000),
  cookie: {
     secure: false,
     sameSite: true
    }
}))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
