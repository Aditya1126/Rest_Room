const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://restroomadmin:restroom@cluster0.csyfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true});

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose
