require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

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

// Define Survival Schema
const survivalSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Create Models
const Doctor = mongoose.model('Doctor', doctorSchema);
const Survival = mongoose.model('Survival', survivalSchema);

// File Upload Configuration for Survival Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Search doctors
app.get('/api/doctors', async (req, res) => {
    const { service, location, preferredCounseling } = req.query;

    console.log("Received query:", { service, location, preferredCounseling }); // Log query parameters

    if (!service || !location) {
        return res.status(400).json({ message: "Missing service or location parameters" });
    }

    try {
        const query = {
            "counselling types": service,
            preferredPracticeArea: location,
        };

        if (preferredCounseling) {
            query.preferredCounseling = preferredCounseling;
        }

        const doctors = await Doctor.find(query);

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

// Survival Routes
// Create a new survival story
app.get('/api/survival/stories', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 8; // Limit to 8 entries per page
    const skip = (page - 1) * limit;
  
    try {
      const stories = await Survival.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sort by most recent first
  
      const totalCount = await Survival.countDocuments(); // Get total number of entries
      const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages
  
      res.json({
        stories,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stories', error });
    }
  });
  
  
  // Endpoint for uploading stories
  app.post('/api/survival/upload', async (req, res) => {
    const { title, content, authorName, email, imageUrl } = req.body;
  
    try {
      const newStory = new Survival({ title, content, authorName, email, imageUrl });
      await newStory.save();
      res.status(201).json({ message: 'Story uploaded successfully', story: newStory });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading story', error });
    }
  });
  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
