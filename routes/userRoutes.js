// routes/userRoutes.js 

const express = require('express'); 
const router =  express.Router(); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const authenticate =require('../middleware/auth') // Importera din middleware


// Skapa användare (POST)
router.post('/register', async (req, res) => { 
    const { name, email, password } = req.body; 
    
    try { const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ name, email, password: hashedPassword }); 
        await newUser.save();
        res.status(201).json(newUser); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
}); 


// skydda en route 
router.get('/secret', authenticate, async (req, res) => { 
    try {
        const secretData = { secret: 'This is protected data!' };
        res.status(200).json(secretData); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
});


// Hämta användare (GET) 
router.get('/', async (req, res) => {
try { 
    const users = await User.find(); 
    res.status(200).json(users); 
} catch (error) {
    res.status(500).json({ message: error.message }); 
} 
}); 


// Uppdatera användare (PUT)
router.put('/:id', async (req, res) => { 
    try { 
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!user) return res.status(404).json({ message: 'User not found' }); 
        res.status(200).json(user); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
}); 


// Radera användare (DELETE) 
router.delete('/:id', async (req, res) => { 
    try { 
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) return res.status(404).json({message: 'User not found' }); 
        res.status(200).json({ message: 'Användare borttagen' }); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    } 
}); 


// Logga in användare (POST)
router.post('/login', async (req, res) => { 
    const { email, password } = req.body; 
    
    try { 
        const user = await User.findOne({ email }); 
        if (!user) return res.status(404).json({ message: 'User not found' }); 
        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' }); 
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.json({ token }); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
}); 

module.exports = router;