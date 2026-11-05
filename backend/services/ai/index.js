import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js'
import router from './routes/aiRoute.js';

dotenv.config()

const port = process.env.PORT || 6003


const app = express()
app.use(express.json())
app.use("/",router)

app.get('/',(req,res) => {
    res.json("AI started")
})

app.listen(port, ()=>{
    console.log(`AI Started at ${port}`)
    connectDB()
})
