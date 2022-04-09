const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    room:{
        type: 'string',
        required: true
    },
    roomid:{
        type: 'string',
        required: true
    },
    userid:{
        type: 'string',
        required: true
    },
    fromdate:{
        type: 'string',
        required: true
    },
    todate:{
        type: 'string',
        required: true
    },
    totalamount:{
        type: Number,
        required: true
    },
    totaldays:{
        type: Number,
        required: true
    },
    transactions:{
        type:'string',
        required: true
    },
    status:{
        type: 'string',
        required: true,
        default: 'booked'
    }
},{
    timestamps: true,
})

const bookingmodel = mongoose.model('booking',bookSchema)
module.exports = bookingmodel