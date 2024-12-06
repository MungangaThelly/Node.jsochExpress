// server.js 
const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');


dotenv.config(); // Ladda miljövariabler från .env 


const app = express();
app.use(bodyParser.json()); 


// Databasanslutning
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Database connection error:', err)); 


// API-rutter 
const userRouter = require('./routes/userRoutes'); 
app.use('/api/users', userRouter); 


//Starta servern 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});