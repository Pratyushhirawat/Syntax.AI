import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import router from './routes/paymentRoute.js';
dotenv.config()

const port = process.env.PORT || 6006


const app = express()
app.use(express.json())

app.use("/", router)

app.listen(port, ()=>{
    console.log(`Payment Started at ${port}`)
    connectDB()
})
