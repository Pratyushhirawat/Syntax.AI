import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import router from './routes/authRoute.js';
dotenv.config()

const port = process.env.PORT || 6001


const app = express()
app.use(express.json())

app.use('/', router)

app.get('/',(req,res) => {
    res.json("Auth started")
})

app.listen(port, ()=>{
    console.log(`Auth Started at ${port}`)
    connectDB()
})
