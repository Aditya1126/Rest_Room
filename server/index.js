const express = require('express')
const app = express()
const config = require('./db')
const roomRoutes = require('./routes/roomRoutes')
const userRoutes = require('./routes/userRoute')
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json())

app.use('/api/rooms', roomRoutes)
app.use('/api/users', userRoutes)
app.use('/api/booking', bookRoutes)
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server is running on port ${port}`))