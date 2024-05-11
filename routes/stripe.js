const {Router} = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const router = Router();

router.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

router.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: 1999,
            automatic_payment_methods: {
                enabled: true
            }
        });
    
        res.send({clientSecret: paymentIntent.client_secret});
    } catch(err) {
        return res.status(400).send({
            error: {
                message: err.message,
            }
        });
    };
});

module.exports = router;