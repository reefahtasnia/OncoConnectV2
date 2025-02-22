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

const memoryStorageConfig = multer.memoryStorage(); // Store files in memory as buffers
const fileUpload = multer({ storage: memoryStorageConfig });

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow the front-end origin
  credentials: true,               // Allow credentials like cookies
}));
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

const AppointmentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" }, // Reference to User model
    user_name: { type: String, required: true }, // Name of the user booking the appointment
    doctor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Doctor" }, // Reference to DoctorFinder model
    doctor_name: { type: String, required: true }, // Name of the doctor
    date: { type: Date, required: true }, // Appointment date
    medium: { type: String, required: true, enum: ["In-person", "Online"] } // Appointment mode
  },
  { collection: "appointment" } // Explicitly set the collection name
);
// Define Survival Schema
const survivalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  verified: { 
    type: String, 
    enum: ["hanging", "approved", "rejected"], 
    default: "hanging" 
  } // Default is "hanging"
});
//diary
const diarySchema = new mongoose.Schema({
  
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  timestamp: { type: Date, default: Date.now },
  entry: { type: String, required: true },
});


//Nutrition
const NutritionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" }, // Reference to User model
    date: { type: Date, required: true }, // Date of nutrition record
    total_calories: { type: Number, required: true } // Total calories intake
  },
  { collection: "Nutrition" } // Explicitly set the collection name
);

//hanging donation
const HangingDonationSchema = new mongoose.Schema(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "users" 
    }, // Reference to User model

    username: { type: String, required: true }, // Username of the person requesting donation
    amount: { type: Number, required: true }, // Total required amount

    amount_raised: { 
      type: Number, 
      default: 0 // Default value is 0
    }, // Total amount collected so far

    reason: { type: String, required: true }, // Reason for requesting donation
    bank_statement: { type: String, required: true }, // Bank statement file link
    image_url: { type: String, required: true }, // Path to the image file

    verified: { 
      type: String, 
      enum: ["hanging", "approved", "rejected"], 
      default: "hanging" 
    }, // Default is "hanging"

    // New field: only storing emails of donators
    donators: [{ type: String }] // Array of donor emails
  },
  { collection: "HangingDonation" }
);

//kid story
const KidStorySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" }, // Reference to User model
    favourite_animal: { type: String, required: true }, // User's favorite animal
    name: { type: String, required: true }, // Name of the kid
    story_1: { type: String, required: true }, // First story
    story_2: { type: String, required: true }, // Second story
    story_3: { type: String, required: true }, // Third story
    image_url: { type: String, required: true }
  },
  { collection: "kid_story" } // Explicitly set the collection name
);



// Create Models
const Doctor = mongoose.model('Doctor', doctorSchema);
const Survival = mongoose.model('Survival', survivalSchema);
const Appointment = mongoose.model("Appointment", AppointmentSchema);
const Diary = mongoose.model('Diary', diarySchema);
const Nutrition = mongoose.model("Nutrition", NutritionSchema);
const HangingDonation = mongoose.model("HangingDonation", HangingDonationSchema);
const kid_story = mongoose.model("kid_story", KidStorySchema);
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
      const stories = await Survival.find({ verified: "approved" }) // Fetch only approved stories
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .select('_id title content authorName imageUrl createdAt');

      // Modify content to show only the first 15 words
      const processedStories = stories.map(story => {
          const contentWords = story.content.split(' '); // Split content into words
          const shortContent = contentWords.slice(0, 15).join(' ') + (contentWords.length > 15 ? '...' : ''); // Get first 15 words
          return {
              ...story._doc, // Spread the story object
              content: shortContent
          };
      });

      const totalCount = await Survival.countDocuments({ verified: "approved" }); // Count only approved stories
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

// Fetch full article by ID (only approved)
app.get('/api/survival/story/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Survival.findOne({ _id: id, verified: "approved" }) // Fetch only if verified is approved
      .select('_id title content authorName imageUrl createdAt');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
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
  


const verifyToken = (req, res, next) => {
  console.log("Cookies:", req.cookies); 
  const token = req.cookies.token; // Read token from cookies
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded User ID:", decoded.userId);
    req.userId = decoded.userId; // Attach userId to request

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
app.get("/api/get-userid", verifyToken, (req, res) => {
  return res.status(200).json({ user_id: req.userId });
});
app.post("/api/appointments", async (req, res) => {
  try {
    const { user_id, user_name, doctor_id, date, medium } = req.body;
    console.log("Request Body:", req.body); // Debugging

    if (!user_id || !doctor_id) {
      return res.status(400).json({ error: "User ID and Doctor ID are required." });
    }

    // Find the doctor by their ID
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    // Find the user by their ID
    /*const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }*/

    // Create new appointment with doctor and user details
    const newAppointment = new Appointment({
      user_id,
      user_name,
      doctor_id,
      doctor_name: doctor.fullName,  // Add the doctor's name
      date,
      medium,
    });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully." });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Fetch doctor details by ID to get BMDC ID
app.get("/api/doctorprogga/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;  // Extract the doctor ID from the URL parameters
    const doctor = await Doctor.findById(doctorId);  // Find the doctor by ID in the database
    
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Return doctor details including BMDC ID
    return res.status(200).json({ bmdc_id: Doctor.BMDC });
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.post('/api/save-diary', verifyToken, async (req, res) => {
  console.log("Request Body:", req.body);

  const { entry, date } = req.body;
  console.log(entry);
  console.log(date);
  const userId = req.userId; // From the verifyToken middleware
  console.log(userId);

  if (!entry || !date) {
    return res.status(400).json({ message: 'Entry and date are required' });
  }

  // Format the date to match the date format in your state (YYYY-MM-DD)
  const formattedDate = new Date(date).toISOString().split('T')[0];
  console.log("Formatted Date:", formattedDate);

  try {
    // Create a new diary entry without checking for existing ones
    const newDiary = new Diary({
      user_id: userId,
      timestamp: new Date(formattedDate),
      entry: entry,
    });

    // Save the new diary entry
    await newDiary.save();
    return res.status(201).json({ message: 'Diary entry saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





// API to save calorie data
app.post("/api/nutrition", async (req, res) => {
  const { user_id, date, total_calories } = req.body;

  if (!user_id || !date || total_calories == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEntry = new Nutrition({ user_id, date, total_calories });
    await newEntry.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/api/donation", upload.fields([
  { name: "bank_statement", maxCount: 1 },
  { name: "donation_image", maxCount: 1 }
]), async (req, res) => {
  console.log("Received donation request:", req.body);
  console.log("Received files:", req.files);
  
  try {
    const { user_id, username, amount, reason } = req.body;
    const bank_statement = req.files["bank_statement"] ? `uploads/${req.files["bank_statement"][0].filename}` : '';
    const image_url = req.files["donation_image"] ? `uploads/${req.files["donation_image"][0].filename}` : '';

    if (!user_id || !username || !amount || !reason || !bank_statement || !image_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDonation = new HangingDonation({
      user_id,
      username,
      amount,
      reason,
      bank_statement,
      image_url ,// ✅ New field added
      amount_raised: 0, // Initializing with 0
      donators: [] // Initializing with an empty array
    });

    await newDonation.save();
    res.status(200).json({ message: "Donation request saved successfully!" });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: "Failed to submit donation request" });
  }
});

app.put("/api/update-donation/:id", async (req, res) => {
  const { status } = req.body; // Expected: "approved" or "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedDonation = await HangingDonation.findByIdAndUpdate(
      req.params.id,
      { verified: status },
      { new: true }
    );

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: "Error updating donation status", error });
  }
});
app.get("/api/pending-donations", async (req, res) => {
  try {
    const donations = await HangingDonation.find({ verified: "hanging" });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});
app.get("/api/approved-donations", async (req, res) => {
  try {
    const approvedDonations = await HangingDonation.find({ 
      verified: "approved", 
      $expr: { $lt: ["$amount_raised", "$amount"] } // Fetch only if amount_raised < amount_needed
    });

    res.json(approvedDonations);
  } catch (error) {
    console.error("Error fetching approved donations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/donate", async (req, res) => {
  try {
    const { donation_id, donor_email, amount } = req.body;

    if (!donation_id || !donor_email || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid donation details." });
    }

    const donation = await HangingDonation.findById(donation_id);
    if (!donation) {
      return res.status(404).json({ error: "Donation request not found." });
    }

    // Add donor's email to the donators array if not already included
    if (!donation.donators.includes(donor_email)) {
      donation.donators.push(donor_email);
    }

    // Increase the total amount raised
    donation.amount_raised += Number(amount);

    await donation.save();

    res.json({ message: "Donation successful!", updatedDonation: donation });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API to save kid's story
app.post("/api/kid-story", upload.single("image_url"), async (req, res) => {
  try {
    const { user_id, favourite_animal, name, story_1, story_2, story_3 } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : "";

    if (!user_id || !favourite_animal || !name || !story_1 || !story_2 || !story_3 || !image_url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newStory = new kid_story({
      user_id,
      favourite_animal,
      name,
      story_1,
      story_2,
      story_3,
      image_url, // ✅ Save file path in DB
    });

    await newStory.save();
    res.status(201).json({ message: "Story saved successfully!" });
  } catch (error) {
    console.error("Error saving story:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/kid-story/latest", async (req, res) => {
  try {
      const latestStory = await kid_story.findOne().sort({ createdAt: -1 }); // Fetch latest entry
      if (!latestStory) {
          return res.status(404).json({ message: "No stories found" });
      }
      res.json(latestStory);
  } catch (error) {
      console.error("Error fetching latest story:", error);
      res.status(500).json({ message: "Server error", error });
  }
});

//survival story
app.put("/api/update-story/:id", async (req, res) => {
  const { status } = req.body; // Expected: "approved" or "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedDonation = await Survival.findByIdAndUpdate(
      req.params.id,
      { verified: status },
      { new: true }
    );

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: "Error updating donation status", error });
  }
});
app.get("/api/pending-stories", async (req, res) => {
  try {
    const donations = await Survival.find({ verified: "hanging" });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});
  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));