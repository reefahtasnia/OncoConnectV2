require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Doctor Schema
const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    preferredPracticeArea: { type: String },
    experience: { type: Number, required: true },
    counsellingTypes: { type: [String], required: true },
    contactNumber: { type: String, required: true },
    certifications: { type: [String] },
    educationalBackground: { type: String },
    consultationFees: { type: Number, required: true },
    imagePath: { type: String }, // Manually saved relative path to the image
});

// Create Doctor Model
const Doctor = mongoose.model('Doctor', doctorSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Search doctors
app.get('/api/doctors', async (req, res) => {
    const { service, location } = req.query;

    console.log("Received query:", { service, location }); // Log query parameters

    if (!service || !location) {
        return res.status(400).json({ message: "Missing service or location parameters" });
    }

    try {
        const doctors = await Doctor.find({
            "counselling types": service, // Use the exact field name
            preferredPracticeArea: location, // Use the exact field name
        });

        console.log("Query result:", doctors); // Log the query result

        if (!doctors.length) {
            return res.status(404).json({ message: "No doctors found for the given criteria." });
        }

        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
