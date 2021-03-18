const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

// db
mongoose
  .connect(process.env.MONGO_CONNECTION_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err))

// import routes
const authRoutes = require("./routes/auth")

// app middlewares
app.use(morgan("dev"))
app.use(express.json({ extended: false }))
app.use(cors({ origin: "http://localhost:19002", credentials: true }))

// middlewares
app.use("/api", authRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`API is running on port ${port}`))
