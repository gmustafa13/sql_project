/** @format */
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const base64 = require("base-64");
const bodyParser = require('body-parser')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./swagger/swaggerConfig");

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const port = process.env.port || 3000;
const sequelize = require('./config/db.config')
const UserTable = require('./model/User')



const initializePassport = require('./passport.config');
//calling initialize function
/**
 * passing passport as a parameter
 */


app.set('view-engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())

/**
 * Db connection
 */
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


initializePassport(passport, async email => {
      return await UserTable.getOne({
        email: email
      })
    },
    async id => {
      return await UserTable.getOne({
        email: id
      })
    }

)


/**
 * controller
 */
const userRoute = require('./controller/userController')

// const testingStream = require('./src/streamPractice')
//  testingStream.testingStream()
// testingStream.anotherTesting()

app.use(bodyParser.json())


/**
 * listing on port 3000
 */

/** swagger  */
const optionsroute = {
  swaggerDefinition,
  apis: ["./swagger/*.js"],
};

const swaggerDocs = swaggerJsDoc(optionsroute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * using route
 */

app.use(userRoute);

/**
 * route for login and sign up
 */

app.get('/', (req, res) => {
  console.log("req.user", req.user)
  res.render('index.ejs', {
    name: req.user.name
  })
})
app.get('/login', (req, res) => {
  res.render('login.ejs')
})
app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})


app.listen(port, (err, connect) => {
  if (err) {
    console.log("err");
  } else {
    console.log("server connected at " + `${port}` + " port");
  }
});