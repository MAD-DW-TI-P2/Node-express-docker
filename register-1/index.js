import { connectDB } from "./src/DataBase/connection.js"
import cors from 'cors'
import express from "express"
import 'dotenv/config'

import authRoutes from './src/Routes/Auth.routes.js'

const app = express();

connectDB()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.listen(process.env.PORT_CONNECTION)
console.log("server on port", process.env.PORT_CONNECTION)