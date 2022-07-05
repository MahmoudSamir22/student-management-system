const userRouter = require('./userRoute')
const authRouter = require('./authRoute')
const courseRouter = require('./courseRoute')


const mountRoutes = (app) => {
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/courses', courseRouter)
}

module.exports = mountRoutes