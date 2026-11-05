import razorpay from "../config/razorpay.js";
import Payment from "../models/paymentModel.js";
import crypto from "crypto";
import { addCredits } from "../utils/updateCredits.js";

const Plans = {
    pro: {
        name: "Pro",
        amount: 29500,
        credits: 500,
    },

    team: {
        name: "Team",
        amount: 79500,
        credits: 2000,
    },
}

export const createOrder = async (req, res) => {
    try{
        const userId = req.headers["x-user-id"];
        if(!userId) {
            return res.status(400).json({message: "User ID is not found"})
        }
        const {plan} = req.body;
        const selectedPlan = Plans[plan];
        if(!selectedPlan) {
            return res.status(400).json({message: "Invalid plan selected"})
        }

        const order = await razorpay.orders.create({
            amount: selectedPlan.amount,
            currency: "INR",
            receipt: `receipt-${Date.now()}`,
            notes: {userId,plan}
        })
        
        const payment = await Payment.create({
            userId,
            plan,
            credits: selectedPlan.credits,
            amount: selectedPlan.amount,
            razorpayOrderId: order.id,
            currency: "INR",
            status: "created",
        })

        return res.status(201).json({
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                // receipt: order.receipt,
            },
            plan: {
                name: selectedPlan.name,
                credits: selectedPlan.credits,
            },

            key_id: process.env.RAZORPAY_KEY_ID
        })

    }catch(error) {
        return res.status(500).json({ message: `create order error ${error}`})
    }
}


export const verify = async (req, res) => {
    try{
        const userId = req.headers["x-user-id"];
        if(!userId) {
            return res.status(400).json({message: "User ID is not found"})
        }

        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({message: "razorpay_order_id, razorpay_payment_id, razorpay_signature not found"})
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        })

        if(!payment) {
            return res.status(400).json({message: "Payment not found"})
        }

        if(payment.status === "paid") {
            return res.status(400).json({message: "Payment already verified"})
        }

        const generatedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

        if(razorpay_signature !== generatedSignature) {
            payment.status = "failed";
            await payment.save();
            return res.status(400).json({message: "Invalid payment signature"})
        }

        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        const data = await addCredits({userId, credits: payment.credits})

        return res.status(200).json({
            message: "Payment verified"
        })
    }catch(error) {
        return res.status(500).json({ message: `verify paymenterror ${error}`})
    }
} 
