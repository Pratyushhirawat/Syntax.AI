import express from "express"
import { createOrder, verify } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/create", createOrder)
router.post("/verify", verify)

export default router