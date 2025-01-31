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
            counsellingTypes: service,
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

  const DoctorFinderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Relative path or URL to the image
    credentials: { type: String, required: true }, // Medical degrees and certifications
    hospital: { type: String, required: true }, // Associated hospital or clinic
    location: { type: String, required: true }, // City or district
    area: { type: String, required: true }, // Specific area within the location
    specialization: { type: String, required: true }, // Doctor's field of expertise
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1-5
    reviews: { type: Number, required: true }, // Number of reviews
    about: { type: String, required: true }, // Detailed description of the doctor
    workingHours: { type: String, required: true }, // Available hours and closed days
    maxpatient: { type: Number, required: true },
}, { collection: 'DoctorFinder' }); // Explicitly set the collection name

  // Create Model
  const DoctorFinder = mongoose.model('DoctorFinder', DoctorFinderSchema);
  



// Filter API Endpoint for Doctors
app.get('/api/doctor_finder', async (req, res) => {
  let filteredDoctors = await DoctorFinder.find(); // Fetch all doctors initially

  const { location, specialization, rating } = req.query;

  // Filter by location
  if (location) {
    if (location === "Dhaka") {
      // Filter only doctors in Dhaka
      filteredDoctors = filteredDoctors.filter(doctor => doctor.location.toLowerCase() === "dhaka");
    } else if (location === "Outside Dhaka") {
      // Filter doctors not in Dhaka
      filteredDoctors = filteredDoctors.filter(doctor => doctor.location.toLowerCase() !== "dhaka");
    }
  }


  // Filter by specialization (cancer type)
  if (specialization) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.specialization.toLowerCase() === specialization.toLowerCase());
  }

  // Filter by rating
  if (rating) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.rating.toString() === rating);
  }

  

  

  res.json(filteredDoctors); // Return filtered doctors list
});



// Search doctors by name or hospital
app.get("/api/doctor_finder/search", async (req, res) => {
  const { query } = req.query; // Get the search query from request
  try {
    const doctors = await DoctorFinder.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
        { hospital: { $regex: query, $options: "i" } }, // Case-insensitive search for hospital
      ],
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error searching doctors:", error);
    res.status(500).json({ error: "Failed to search doctors" });
  }
});


const AppointFormSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" }, // Reference to User model
    user_name: { type: String, required: true }, // Name of the user booking the appointment
    doctor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "DoctorFinder" }, // Reference to DoctorFinder model
    doctor_name: { type: String, required: true }, // Name of the doctor
    date: { type: Date, required: true }, // Appointment date
    medium: { type: String, required: true, enum: ["In-person", "Online"] } // Appointment mode
  },
  { collection: "appointform" } // Explicitly set the collection name
);

// Create Model
const AppointForm = mongoose.model("AppointForm", AppointFormSchema);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
  },
  { collection: "users" } // Explicitly set the collection name
);

// Create Model
const User = mongoose.model("users", UserSchema);


const router = express.Router();

router.post("/submit-appointment", async (req, res) => {
  try {
    const { user_id, user_name, doctor_id, date, medium } = req.body

    // Validate input
    if (!user_id || !user_name || !doctor_id || !date || !medium) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // Find the doctor to get their name
    const DoctorFinder = mongoose.model("DoctorFinder")
    const doctor = await DoctorFinder.findById(doctor_id)
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" })
    }

    // Create new appointment
    const newAppointment = new AppointForm({
      user_id,
      user_name,
      doctor_id,
      doctor_name: doctor.name,
      date,
      medium,
    })

    // Save the appointment
    await newAppointment.save()

    res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment })
  } catch (error) {
    console.error("Error submitting appointment:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})


  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
