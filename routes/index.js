const userRouter = require('./userRoute')

const mountRoutes = (app) => {
    app.use('/api/v1/users', userRouter)
}

module.exports = mountRoutes