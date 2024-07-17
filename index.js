const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const { errorHandler, unknownEndpoint } = require("./utils/middleware")

const blogsRouter = require('./controllers/blogs')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorRouter = require("./controllers/authors")
const readinglistRouter = require("./controllers/readinglists")

app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorRouter)
app.use("/api/readinglists", readinglistRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()