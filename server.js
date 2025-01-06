require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

const notificationSchema = new mongoose.Schema({
    username: { type: String, required: true }, // The recipient of the notification
    sentBy: { type: String, required: true },  // The sender of the request
    message: { type: String, required: true }, // The notification message
    status: { type: String, default: 'pending' }, // Pending or Accepted
});

const Notification = mongoose.model('Notification', notificationSchema);

// Friend Schema
const friendSchema = new mongoose.Schema({
    friend1: { type: String, required: true },
    friend2: { type: String, required: true },
});

const Friend = mongoose.model('Friend', friendSchema);


// Routes
// Test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username,password,name, mobile, gender, age } = req.body;

        // Validate input
        if (!username||!password||!name || !mobile || !gender || !age) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if mobile number already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ message: 'Mobile number already exists.' });
        }

        // Create and save the new user
        const newUser = new User({ username,password,name, mobile, gender, age });
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//const bcrypt = require('bcrypt'); // Optional: For hashing passwords, if used during signup

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Optional: Compare the hashed password (if used during signup)
        const isPasswordValid = password === user.password; // Replace with bcrypt comparison if hashed
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error in /login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/search', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(200).json({ success: true, user: { username: user.username } });
        } else {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error searching for users:', error);
        return res.status(500).json({ success: false, message: 'Server error while searching for users.' });
    }
});

app.post('/friend-request', async (req, res) => {
    const { username } = req.body;

    // Validate recipient existence
    const recipient = await User.findOne({ username });
    if (!recipient) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Logic for storing friend requests (e.g., in a separate collection or user schema)
    res.json({ message: 'Friend request sent successfully' });
});
app.post('/addFriend', async (req, res) => {
    const { username, sentBy } = req.body;

    // Validate input
    if (!username || !sentBy) {
        return res.status(400).json({ success: false, message: 'Username and Sent By fields are required.' });
    }

    try {
        // Check if recipient exists
        const recipient = await User.findOne({ username });
        if (!recipient) {
            return res.status(404).json({ success: false, message: 'Recipient not found.' });
        }

        // Create notification message
        const message = `Username ${sentBy} sent you a request.`;

        // Save notification to the database
        const notification = new Notification({ username, sentBy, message });
        await notification.save();

        res.status(201).json({ success: true, message: 'Friend request sent successfully.' });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
