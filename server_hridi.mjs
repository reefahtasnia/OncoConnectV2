import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import multer from "multer";

import Tesseract from "tesseract.js";
import fs from "fs";
import { pipeline } from "@xenova/transformers";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 5002;
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only frontend origin
    credentials: true, // Allow cookies and authentication headers
  })
);
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Doctor Schema
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

const Doctor = mongoose.model("doctors", doctorSchema);

// Filter API Endpoint for Doctors
// Filter API Endpoint for Doctors
app.get("/api/doctor_finder", async (req, res) => {
  // Fetch doctors with 'cancer' in specialization (case-insensitive)
  let filteredDoctors = await Doctor.find({
    specialization: /cancer/i, // Using regex to match 'cancer' in specialization
  });
  console.log(
    "Fetched doctors with 'cancer' in specialization:",
    filteredDoctors.length
  );

  const { location, specialization, rating } = req.query;
  console.log("Received query parameters:", {
    location,
    specialization,
    rating,
  });

  // Filter by location
  if (location) {
    console.log("Filtering by location:", location);
    if (location === "Dhaka") {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.practiceSchedule.some(
          (schedule) => schedule.city.toLowerCase() === "dhaka"
        )
      );
      console.log("Filtered doctors in Dhaka:", filteredDoctors.length);
    } else if (location === "Outside Dhaka") {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.practiceSchedule.some(
          (schedule) => schedule.city.toLowerCase() !== "dhaka"
        )
      );
      console.log("Filtered doctors outside Dhaka:", filteredDoctors.length);
    }
  }

  // Filter by specialization (cancer type) if provided
  if (specialization) {
    console.log("Filtering by specialization:", specialization);
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.specialization.toLowerCase() === specialization.toLowerCase()
    );
    console.log("Filtered doctors by specialization:", filteredDoctors.length);
  }

  // Filter by rating if provided
  if (rating) {
    console.log("Filtering by rating:", rating);
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.ratings.toString() === rating
    );
    console.log("Filtered doctors by rating:", filteredDoctors.length);
  }

  // Return the filtered list of doctors
  console.log("Final filtered doctors:", filteredDoctors.length);
  res.json(filteredDoctors);
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    }, // Reference to User model
    user_name: { type: String, required: true }, // Name of the user booking the appointment
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DoctorFinder",
    }, // Reference to DoctorFinder model
    doctor_name: { type: String, required: true }, // Name of the doctor
    date: { type: Date, required: true }, // Appointment date
    medium: { type: String, required: true, enum: ["In-person", "Online"] }, // Appointment mode
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
    const { user_id, user_name, doctor_id, date, medium } = req.body;

    // Validate input
    if (!user_id || !user_name || !doctor_id || !date || !medium) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the doctor to get their name
    const DoctorFinder = mongoose.model("DoctorFinder");
    const doctor = await DoctorFinder.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Create new appointment
    const newAppointment = new AppointForm({
      user_id,
      user_name,
      doctor_id,
      doctor_name: doctor.name,
      date,
      medium,
    });

    // Save the appointment
    await newAppointment.save();

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    console.error("Error submitting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const caregiverArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Path to the image in the public directory
  description: { type: String, required: true },
  pdf: { type: String, required: true }, // Path to the PDF file in the public directory
});

const CaregiverArticle = mongoose.model(
  "CaregiverArticle",
  caregiverArticleSchema
);

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

app.get("/api/view-pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "public", "uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving PDF:", err);
      res.status(500).send("Error loading the PDF file.");
    }
  });
});

// API Route to download PDF
app.get("/api/download-pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "public", "uploads", filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).send("Error downloading the file.");
    }
  });
});

//cancer screening

const cancerScreeningSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Type of cancer
  description: { type: String, required: true }, // Short description of the screening
  details: { type: [String], required: true }, // Array of detailed information
  id: { type: String, required: true, unique: true }, // Unique identifier for each screening type
});

const CancerScreening = mongoose.model(
  "CancerScreening",
  cancerScreeningSchema
);

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

//QUIZ

const cancerTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image or path
});

const CancerType = mongoose.model("cancertypes", cancerTypeSchema);

app.get("/api/cancer-types", async (req, res) => {
  try {
    const cancerTypes = await CancerType.find();
    res.json(cancerTypes);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

const questionCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the question category (e.g., Personal, Family, Genetics)
  },
  { collection: "quescat" }
);

const QuestionCategory = mongoose.model("quescat", questionCategorySchema);

// API Endpoint to fetch categories
app.get("/api/categories", async (req, res) => {
  try {
    //console.log("categories");
    const categories = await QuestionCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

const questionSchema = new mongoose.Schema(
  {
    cancer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cancertypes",
      required: true,
    }, // Reference to Cancer Type
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quescat",
      required: true,
    }, // Reference to Question Category
    question_text: { type: String, required: true }, // Question description
  },
  { collection: "ques" }
);

const Question = mongoose.model("ques", questionSchema);

// Define the answer schema
const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ques", // Reference to the Questions collection
    required: true,
  }, // Associated question

  answer_text: {
    type: String,
    required: true,
  }, // Answer option (e.g., Yes, No, Male, Female)

  score: {
    type: Number,
    required: true,
  }, // Points assigned to this answer
});

const Answer = mongoose.model("ans", answerSchema);

// API endpoint to fetch questions based on cancer_id and category_id
app.get("/api/questions", async (req, res) => {
  try {
    console.log("questions\n");
    const { cancerId, categoryId } = req.query; // Get query params

    if (!cancerId || !categoryId) {
      return res
        .status(400)
        .json({ error: "cancerId and categoryId are required" });
    }
    console.log(cancerId);
    console.log(categoryId);
    const cancerObjectId = new mongoose.Types.ObjectId(cancerId);
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const questions = await Question.find({
      cancer_id: cancerObjectId,
      category_id: categoryObjectId,
    })

      .populate("cancer_id", "_id") // Get Cancer Type name
      .populate("category_id", "_id") // Get Category name
      .lean(); // Convert to plain JSON
    console.log(questions.length);
    if (!questions.length) {
      return res
        .status(404)
        .json({
          error: "No questions found for the given cancer type and category",
        });
    }

    // Fetch answers for the questions
    const questionIds = questions.map((q) => q._id);
    const answers = await Answer.find({
      question_id: { $in: questionIds },
    }).lean();

    // Group answers under their respective questions
    const questionsWithAnswers = questions.map((q) => ({
      ...q,
      answers: answers.filter(
        (ans) => ans.question_id.toString() === q._id.toString()
      ), // Attach answers
    }));

    res.json(questionsWithAnswers);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

const verifyToken = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token; // Read token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    console.log("Decoded User ID:", decoded.userId);
    req.userId = decoded.userId; // Attach userId to request

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
app.get("/api/get-userid", verifyToken, (req, res) => {
  try {
    // Assuming `verifyToken` middleware attaches `req.userId`
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }
    res.status(200).json({ user_id: req.userId });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const userResponseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true, // ID of the user taking the quiz
  },
  cancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cancertypes",
    required: true, // Reference to the cancer type
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ques",
    required: true, // Reference to the question answered
  },
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ans",
    required: true, // Reference to the selected answer
  },
});

const UserResponse = mongoose.model("user_responses", userResponseSchema);

// POST API to save user responses dynamically
app.post("/api/user-responses", async (req, res) => {
  try {
    const { user_id, cancer_id, responses } = req.body;
    console.log("User ID:", user_id);
    console.log("Cancer ID:", cancer_id);
    console.log("Responses:", responses);

    if (!user_id || !cancer_id || !responses || !Array.isArray(responses)) {
      return res
        .status(400)
        .json({ error: "Missing required fields or invalid format" });
    }

    // Loop through responses and update or insert one by one
    for (const { question_id, answer_id } of responses) {
      await UserResponse.findOneAndUpdate(
        { user_id, cancer_id, question_id }, // Find existing record
        { answer_id }, // Update the answer
        { upsert: true, new: true } // If not found, create new
      );
    }

    res.status(201).json({ message: "User responses updated successfully" });
  } catch (error) {
    console.error("Error saving user responses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/user-result", async (req, res) => {
  try {
    const { user_id, cancer_id } = req.query;

    if (!user_id || !cancer_id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Fetch all user responses for the given cancer type, and populate the answer_id with answer details
    const responses = await UserResponse.find({ user_id, cancer_id }).populate(
      "answer_id"
    ); // This will include the answer details, such as the score

    if (!responses.length) {
      return res.status(404).json({ error: "No responses found" });
    }

    // Calculate total score based on the answers' scores
    let totalScore = responses.reduce(
      (sum, response) => sum + (response.answer_id.score || 0),
      0
    );

    // Determine verdict based on score ranges
    let verdict;
    if (totalScore >= 80) {
      verdict =
        "You are at high risk of cancer. Please consult a doctor immediately.";
    } else if (totalScore >= 40) {
      verdict = "You might be at risk. Consider checking with a doctor.";
    } else {
      verdict = "You have no significant risk based on this assessment.";
    }

    res.json({ totalScore, verdict });
  } catch (error) {
    console.error("Error fetching user result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//AI Try

// Define the Image schema for storing data in MongoDB
/*const imageSchema = new mongoose.Schema({
  userId: String,
  originalImage: String,
  extractedText: String,
});
const ImageModel = mongoose.model("Image", imageSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Store in the 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept only image files
    } else {
      cb(new Error("File type is not supported!"));
    }
  },
});

// **Upload & Process Image**
// Load summarization model
let summarizer;
(async () => {
  summarizer = await pipeline("summarization");
})();

// 🔹 **Upload & Process Image**
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    // OCR: Extract text from image
    const { data } = await Tesseract.recognize(filePath, "eng");
    const extractedText = data.text;
    console.log("Extracted Text:", extractedText);

    // **Ensure summarizer is ready**
    if (!summarizer) {
      return res.status(503).json({ success: false, error: "Summarizer not initialized yet. Please retry." });
    }

    // Summarize extracted text
    const summary = await summarizer(extractedText, { max_length: 100, min_length: 30 });
    const simplifiedText = summary[0].summary_text;
    console.log("Simplified Text:", simplifiedText);

    res.json({ success: true, extractedText, simplifiedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error processing image" });
  }
});

// **Retrieve Processed Image Data**
app.get("/images/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const images = await ImageModel.find({ userId });
    res.json(images);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching images" });
  }
});*/

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyDJz6uxTZOqxZ9TAIO-7vyeVLe4ooX0tEs");

// MongoDB Image Schema
const imageSchema = new mongoose.Schema({
  userId: String,
  originalImage: String,
  extractedText: String,
  simplifiedText: String,
});
const ImageModel = mongoose.model("Image", imageSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("File type is not supported!"));
  },
});

// **Upload & Process Image**
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    // OCR: Extract text from image
    const { data } = await Tesseract.recognize(filePath, "eng");
    const extractedText = data.text;
    console.log("Extracted Text:", extractedText);

    // Use Gemini API for summarization
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Summarize this medical text, highlighting any abnormal values and advising consultation with a doctor: ${extractedText}`
    );
    //const result = await model.generateContent(`Analyze this medical report data:${extractedText}. Return a JSON object with the following format: { "normal": [list of normal components], "abnormal": [list of abnormal components], "summary": "[summary of the report with a focus on abnormal values and a disclaimer about consulting a doctor]" }`);

    const simplifiedText = result.response.text();

    console.log("Simplified Text:", simplifiedText);

    // Save to MongoDB
    const newImage = new ImageModel({
      userId: req.body.userId || "defaultUser",
      originalImage: filePath,
      extractedText,
      simplifiedText,
    });
    await newImage.save();

    res.json({ success: true, extractedText, simplifiedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error processing image" });
  }
});

// Retrieve processed images for a user
app.get("/images/:userId", async (req, res) => {
  try {
    const images = await ImageModel.find({ userId: req.params.userId });
    res.json(images);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching images" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
