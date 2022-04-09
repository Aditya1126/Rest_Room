const express = require('express')
const router = express.Router()

const Room = require('../models/room')

router.get('/getallrooms',async(req, res) => {
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(404).json({message: error})
    }
})

router.post('/getroom',async(req, res) => {
    const roomid = req.params.roomid
    try {
        const room = await Room.findOne({_id:roomid})
        res.send(room)
    } catch (error) {
        return res.status(404).json({message: error})
    }
})

router.post('/addroom',async(req, res) => {
    try {
      const room = new Room(req.body);
      await room.save();
      res.send('New room added successfully')
    } catch (error) {
      res.status(400).json({error})
    }
  })

module.exports = router;