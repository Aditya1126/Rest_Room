const express = require('express');
const route = express.Router();
const User = require('../models/user');

route.post('/register',async (req, res)=>{
    const newuser = new User({name: req.body.name,password: req.body.password,email: req.body.email});
    try {
        const user = await newuser.save();
        res.send('User register successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})


route.post('/login',async (req, res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email: email ,password: password});
        if(user){
            res.send(user)
        }
        else {
            return res.status(400).json({message: 'Login faield'})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})

route.get('/getalluser',async(req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(400).json({error})
    }
  })

module.exports = route