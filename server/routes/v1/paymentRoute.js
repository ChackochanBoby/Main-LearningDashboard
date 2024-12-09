const express = require("express")
const { userAuth } = require("../../middleware/userAuth")
const { webhook, createPaymentSession } = require("../../controllers/paymentControllers");

const router = express.Router()

router.post("/create-payment-session", userAuth, createPaymentSession)

router.post("/webhook", express.raw({ type: 'application/json' }),webhook)





module.exports={paymentRouter:router}