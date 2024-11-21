const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const stripe = require('stripe')('sk_test_51QMspvRuBWT5LOqr11GTOKQb27Z3q8lbTvgp0Tdc4sGnV8wqOEu1K6EDeBB7TS3NglvpAjSPmMB3xCKoyPzjlrey00L8Ihoo4v');
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: 'INR',
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4()
      }
    );

    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionid: payment.id,
      });

      const booking = await newBooking.save();
      const roomtemp = await Room.findOne({ _id: room._id });

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();

      return res.send('Payment Successful, Your room is booked');
    }

    res.status(400).send('Payment Failed');
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(400).json({ error: error.message });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});


module.exports = router;
