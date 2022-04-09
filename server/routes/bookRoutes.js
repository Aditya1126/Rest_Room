const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("./roomRoutes");
const moment = require("moment");
const {v4: uuidv4 } = require('uuid')
const stripe = require('stripe')('sk_test_51KkSUcSE4yGPDuAqVrIc6EcJZCuiy1kVdfOLIdVXXpqG8NSFlUicq2wajHYIm188Nj4WUXQ93Du2P0NGT83iYKoC00k1m3PtZ4')

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays,token } = req.body;
  try {
      const customer = await stripe.create({
         email:token.email,
         source:token.id 
      })
      const payment = await stripe.create({
          amount:totalamount*100,
          customer: customer.id,
          currency:'inr',
          receipt_email:token.email
      },{
          idempotencyKey:uuidv4()
      })
      if(payment){
            const newbooking = new Booking({
              room: room.name,
              roomid: room._id,
              userid,
              fromdate: moment(fromdate).format("DD-MM-YYYY"),
              todate: moment(todate).format("DD-MM-YYYY"),
              totalamount,
              totaldays,
              transactionId: "123",
            });
            const booking = await newbooking.save();
            const roomtemp = Room.findOne({ _id: room._id });
            roomtemp.currentbooking.push({
              booking: booking._id,
              fromdate: moment(fromdate).format("DD-MM-YYYY"),
              todate: moment(todate).format("DD-MM-YYYY"),
              userid:userid,
              status:booking.status
            });
            await roomtemp.save();
            res.send("Book Successful");
      }
      res.send("Payment is successfull, Your room is booked")
  } catch (error) {
    res.status(400).json({error})      
  }
  
});

router.post('/getbookingbyuserid',async(req,res)=>{
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({userid:userid});
        res.send(bookings);
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/cancelbooking',async(req,res)=>{
  const {bookingid,roomid} = req.body;
  try {
    const bookingitem = await Booking.findOne({_id:bookingid})
    bookingitem.status='cancelled';
    await bookingitem.save();
    const room = await Room.findOne({_id:roomid});
    const bookings = room.currentbooking
    const temp = bookings.filter(booking=>booking.bookingid.tosString() !== bookingid)
    room.currentbooking =temp;
    await room.save()
  } catch (error) {
    res.status(400).json({error}) 
  }
})

router.post('/getallbooking',async(req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(400).json({error})
  }
})

module.exports = router;
