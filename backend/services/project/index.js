import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import router from './routes/projectRoute.js';

dotenv.config()

const port = process.env.PORT || 6002


const app = express()
app.use(express.json())

app.use("/", router)

app.get('/',(req,res) => {
    res.json("Project started")
})

app.listen(port, ()=>{
    console.log(`Project Started at ${port}`)
    connectDB()
})
