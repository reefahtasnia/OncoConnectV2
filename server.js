require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Doctor Schema
// Define Doctor Schema
const doctorSchema = new mongoose.Schema({
  fullName: { type: String },
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  BMDC: { type: String, unique: true },
  phoneNumber: { type: String },
  specialization: { type: String },
  preferredPracticeArea: { type: String },
  practiceSchedule: [
    {
      hospitalName: String,
      address: String,
      area: String,
      city: String,
      startTime: String,
      endTime: String,
      daysAvailable: [String],
    },
  ],
  preferredPatientNo: { type: Number },
  dateOfBirth: { type: Date },
  experience: { type: Number },
  certifications: [{ name: String, year: Number }],
  isVerified: { type: Boolean, default: false },
  preferredCounseling: {
    type: String,
    enum: ["Physical", "Call", "Online"],
  },
  counsellingtypes: {
    type: [String], // Allow multiple options
    enum: [
      "Couples Counselling",
      "Psychodynamic Therapy",
      "Career Counseling",
      "Cognitive Behavioral Therapy",
      "Mental Health Counseling",
      "Group Therapy",
      "Family Therapy",
      "Grief Counseling",
      "Abuse Counseling",
      "Behavioral Therapy",
    ],
  },
  consultationFees: { type: Number },
  imagePath: { type: String },
  ratings: { type: Number, min: 0, max: 5, default: 0 }, // Average Rating
  reviews: [
    {
      patientName: String,
      comment: String,
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  aboutDr: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AppointmentSchema = new mongoose.Schema({
  appointment_id: {
      type: Number,
      unique: true,
      required: true,
      autoIncrement: true, // Auto-increment-like behavior will be handled manually
  },
  user_id: {
      type: mongoose.Schema.Types.ObjectId, // Foreign key reference to User table
      ref: "User",
      required: true,
  },
  name: {
      type: String,
      required: true,
      trim: true,
  },
  medium: {
      type: String,
      enum: ["Online", "In-Person", "Phone"], // Example mediums
      required: true,
  },
  date: {
      type: Date,
      required: true,
  },
  bmdc_id: {
      type: mongoose.Schema.Types.ObjectId, // Foreign key reference (doctor's ID)
      ref: "Doctor",
      required: true,
  },
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
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// File Upload Configuration for Survival Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
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

// Validate that required parameters are present
if (!service || !location) {
    return res.status(400).json({ message: "Missing service or location parameters" });
}

try {
    // Query with just service and location
    const doctorsBaseQuery = await Doctor.find({
        counsellingtypes: service, // Use the exact field name
        preferredPracticeArea: location, // Use the exact field name
    });

    console.log("Base query result:", doctorsBaseQuery); // Log base query result

    // Create the base query object
    const query = {
        counsellingtypes: service, // Match service
        preferredPracticeArea: location, // Match location
    };

    // Add the preferredCounseling filter if provided
    if (preferredCounseling) {
        query[preferredCounseling] = preferredCounseling;
    }

    // Query the database with the updated query
    const doctors = await Doctor.find(query);

    console.log("Query result:", doctors); // Log the query result
    res.status(200).json(doctors); // Return the doctors as response
} catch (error) {
    res.status(500).json({ message: "An error occurred", error });
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
          .sort({ createdAt: -1 })
          .select('_id title content authorName imageUrl createdAt'); // Fetch only required fields

      // Modify content to show only the first 15 words
      const processedStories = stories.map(story => {
          const contentWords = story.content.split(' '); // Split content into words
          const shortContent = contentWords.slice(0, 15).join(' ') + (contentWords.length > 15 ? '...' : ''); // Get the first 15 words
          return {
              ...story._doc, // Spread the story object
              content: shortContent
          };
      });

      const totalCount = await Survival.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      res.json({
          stories: processedStories,
          totalPages,
          currentPage: page,
      });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching stories', error });
  }
});

// Fetch full article by ID
app.get('/api/survival/story/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Survival.findById(id).select('_id title content authorName imageUrl createdAt');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article); // Send the full article data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
});

  
  // Endpoint for uploading stories
  app.post('/api/survival/upload', upload.single('image'), async (req, res) => {
    try {
      const { title, content, authorName, email } = req.body;
      const imageUrl = req.file ? `uploads/${req.file.filename}` : ''; // Store image path
  
      if (!title || !content || !authorName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newStory = new Survival({
        title,
        content,
        authorName,
        email,
        imageUrl, // Save file path in MongoDB
        createdAt: new Date(),
      });
  
      await newStory.save();
      res.status(201).json({ message: 'Story uploaded successfully', story: newStory });
    } catch (error) {
      console.error('Error uploading story:', error);
      res.status(500).json({ message: 'Server error' });
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

const caregiverArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Path to the image in the public directory
  description: { type: String, required: true },
  pdf: { type: String, required: true }, // Path to the PDF file in the public directory
});

const CaregiverArticle = mongoose.model('CaregiverArticle', caregiverArticleSchema);


app.get("/api/caregiver_articles", async (req, res) => {
  try {
    const articles = await CaregiverArticle.find(); // Fetch all articles from the DB
    console.log("Caregiving articles fetched from DB:", articles); // Log the articles
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching caregiving articles:", error);
    res.status(500).json({ error: "Failed to fetch caregiving articles" });
  }
});

// API Route to download PDF
app.get('/api/download-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public', 'uploads', filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).send('Error downloading the file.');
    }
  });
});

//cancer screening

const cancerScreeningSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Type of cancer
  description: { type: String, required: true }, // Short description of the screening
  details: { type: [String], required: true }, // Array of detailed information
  id: { type: String, required: true, unique: true } // Unique identifier for each screening type
});

const CancerScreening = mongoose.model("CancerScreening", cancerScreeningSchema);

app.get("/api/cancerscreen", async (req, res) => {
  try {
    const screen = await CancerScreening.find(); // Fetch all articles from the DB
    console.log("Cancer Screening fetched from DB:", screen); // Log the screens
    res.status(200).json(screen);
  } catch (error) {
    console.error("Error fetching cancer screening:", error);
    res.status(500).json({ error: "Failed to fetch cancer screening" });
  }
});


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your .env file
    req.user = decoded; // Add the decoded user data to the request
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

// POST /api/submit-appointment - Create a new appointment
app.post("/api/submit-appointment", verifyToken, async (req, res) => {
  const { user_name, doctor_id, date, medium } = req.body;

  // Validate required fields
  if (!user_name || !doctor_id || !date || !medium) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Retrieve doctor details by doctor_id
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    // Create new appointment
    const appointment = new Appointment({
      user_id: mongoose.Types.ObjectId(req.user.userId), // Use the userId from the decoded JWT
      name: user_name,
      medium,
      date: new Date(date),
      bmdc_id: doctor.BMDC, // Store the BMDC of the doctor
    });

    // Save the appointment to the database
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
