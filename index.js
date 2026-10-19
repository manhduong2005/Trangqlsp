const express = require('express')

const bodyParser = require('body-parser')

var methodOverride = require('method-override');

require('dotenv').config();

const database = require("./config/database.js")
const systemconfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route.js");
const route = require("./routes/clients/index.route.js");

database.connect();

const app = express()

const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

app.use(methodOverride('_method'))

//cấu hình pug vào dự án
app.set('views', './views')// chứa các file pug 
app.set('view engine', 'pug');

// App local variables
app.locals.prefixAdmin = systemconfig.prefixAdmin;

app.use(express.static('public'));// nhúng file tĩnh cho dự án trong thư mục public 

routeAdmin(app)
route(app)

app.get("/test", (req, res) => {
  res.send("Server OK");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});