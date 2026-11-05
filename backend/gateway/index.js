import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import proxy from "express-http-proxy";
import { getCurrentUser } from "./controllers/userController.js";
import { protect } from "./middleware/protect.js";
import { proxyHeader } from "./utils/proxyHeader.js";

const port = process.env.PORT || 6000


const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(morgan("dev"))

app.use('/api/auth',proxy(process.env.AUTH_SERVICE))
app.use('/api/project',protect,proxyHeader(process.env.PROJECT_SERVICE))
app.use('/api/file',protect,proxyHeader(process.env.FILE_SERVICE))
app.use('/api/ai',protect,proxyHeader(process.env.AI_SERVICE))
app.use('/api/payment',protect,proxyHeader(process.env.PAYMENT_SERVICE))
app.get("/api/me",protect,getCurrentUser)


app.get('/',(req,res) => {
    res.json("Gateway started")
})

app.listen(port, ()=>{
    console.log(`Gateway Started at ${port}`)
})
