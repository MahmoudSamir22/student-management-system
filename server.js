const express = require('express')
const cors = require('cors')
require('dotenv').config({path: 'config.env'})


const dbConnection = require('./database/dbConnection')
const mountRoutes = require('./routes')
const ApiError = require("./utils/apiErrors");
const globalError = require("./middlewares/errorMiddleware");

//Create DB Connection
dbConnection()

const app = express()


app.use(cors())
app.options('*', cors())


app.use(express.json({limit: '20kb'}))

app.use(express.static('uploads'))

mountRoutes(app)
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

//Global error handling middleware
app.use(globalError);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})
