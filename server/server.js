const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const Razorpay = require("razorpay");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.ID,
            key_secret: process.env.SECRET
        });
        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(400).send('Error');
        }

        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
