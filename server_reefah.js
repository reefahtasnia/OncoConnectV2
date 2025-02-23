require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const sendOTPEmail  = require("./sendmail.js");

const app = express();
const PORT = 5001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Add 'Cookie' here
    exposedHeaders: ["set-cookie"], // Add this line
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB OncoConnect"))
  .catch((err) => console.error("MongoDB connection error:", err));

const {
  User,
  Doctor,
  PatientSymptom,
  Medicine,
  ForumPost,
  Comment,
  OTP,
} = require("./tableSchema.js");

app.post("/api/signup", async (req, res) => {
  try {
    let { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    email = email.toLowerCase();
    if (userType === "patient") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const newUser = new User({
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newUser.save();
      console.log("Patient inserted:", newUser);
      res.status(201).json({ message: "User registered successfully" });
    } else if (userType === "doctor") {
      // Redirect to doctor signup endpoint
      return res.status(201).json({ redirect: "/doctor-signup" });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
app.post("/api/doctor-signup", async (req, res) => {
  try {
    let {
      email,
      password,
      fullName,
      gender,
      bmdcNumber,
      phoneNumber,
      hospitalName,
      hospitalAddress,
      hospitalArea,
      hospitalCity,
      startTime,
      endTime,
      daysAvailable,
      maxPatients,
      dateOfBirth,
      degrees,
      yearsOfExperience,
      specialization,
      consultationType,
      consultationFee,
    } = req.body;
    if (
      !email ||
      !password ||
      !fullName ||
      !bmdcNumber ||
      !phoneNumber ||
      !dateOfBirth ||
      !specialization
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    email = email.toLowerCase();

    // Check if the doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor email already exists" });
    }

    // Insert Doctor Data
    const newDoctor = new Doctor({
      fullName,
      gender,
      email,
      password,
      BMDC: bmdcNumber,
      phoneNumber,
      specialization,
      preferredPracticeArea: hospitalArea,
      practiceSchedule: [
        {
          hospitalName,
          address: hospitalAddress,
          area: hospitalArea,
          city: hospitalCity,
          startTime,
          endTime,
          daysAvailable: daysAvailable.split(","),
        },
      ],
      preferredPatientNo: maxPatients,
      dateOfBirth,
      experience: yearsOfExperience,
      certifications: degrees.map((degree) => ({
        name: degree.name,
        year: degree.year,
      })),
      counsellingTypes: consultationType,
      consultationFees: consultationFee,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newDoctor.save();
    console.log("Doctor inserted:", newDoctor);
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (err) {
    console.error("Error inserting doctor:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// API Route: User Login
app.post("/api/login", async (req, res) => {
  try {
    let { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    if (userType === "patient") {
      const user = await User.findOne({ email });
      console.log(" user data:", user);
      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      console.log("Fetched user data:", user);
      // Check if the user profile is complete or not
      const requiredFields = [
        "firstName",
        "lastName",
        "phone",
        "gender",
        "dateOfBirth",
        "address",
        "treatmentStatus",
      ];
      const isProfileIncomplete = requiredFields.some((field) => !user[field]);

      if (isProfileIncomplete) {
        console.log("User profile is incomplete");
        return res.status(200).json({ redirect: "/editProfile" });
      }
      console.log("in");
      let token;
      try {
        token = jwt.sign(
          { userId: user._id, userType: "patient" },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
      } catch (tokenError) {
        console.error("JWT Token Generation Error:", tokenError);
        return res.status(500).json({ message: "Token generation failed" });
      }

      //console.log("Token:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        path: "/", // Add this to ensure cookie is sent for all paths
      });
      //console.log("Token:", token);
      // console.log("Cookie being set:", {
      //   token: token,
      //   headers: res.getHeaders()
      // });
      console.log("User logged in:", user, email);
      return res.status(200).json({ redirect: "/user" });
    } else if (userType === "doctor") {
      const doctor = await Doctor.findOne({ email });

      if (!doctor || doctor.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign(
        { userId: doctor._id, userType: "doctor" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      //console.log("Token:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        path: "/", // Add this to ensure cookie is sent for all paths
      });
      console.log("Doctor logged in:", doctor.email);
      return res.status(200).json({ redirect: "/doctor" });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  console.log("In send otp POST API");
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete existing OTPs for this email
    await OTP.deleteMany({ email });

    // Create new OTP entry
    const newOTP = new OTP({ email, otp });
    await newOTP.save();
    console.log("Stored OTP in in db" + otp);
    // Send email
    await sendOTPEmail(email, otp); // From your sendEmail.js
    console.log("OTP sent successfully");
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/api/verify-otp", async (req, res) => {
  console.log("POST verify otp");
  try {
    const { email, otp } = req.body;
    console.log("Email:", email, "OTP:", otp);
    const storedOTP = await OTP.findOne({ email });
    if (!storedOTP) return res.status(400).json({ error: "OTP not found" });

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    console.log("OTP verified successfully");
    // OTP verified successfully
    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  console.log("API Reset password");
  try {
    const { email, password } = req.body;

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log("User found:" + user);
    user.password = password; // Add bcrypt hashing here
    await user.save();
    console.log("Password updated successfully");
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});
//API to edit profile
app.post("/api/edit-profile", async (req, res) => {
  try {
    const {
      username,
      email,
      firstName,
      lastName,
      phone,
      profilePicture,
      genderType,
      birthMonth,
      birthDay,
      birthYear,
      country,
      state,
      city,
      roadNumber,
      houseNumber,
      currentStatus,
      emergencyName,
      emergencyEmail,
      emergencyPhone,
      aboutMe,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    console.log("gender", genderType);
    // Construct the address object
    const address = {
      houseno: houseNumber || "",
      roadno: roadNumber || "",
      city: city || "",
      region: state || "",
      country: country || "",
    };

    // Construct the emergency contact object
    const emergencyContact = {
      name: emergencyName || "",
      phone: emergencyPhone || "",
      email: emergencyEmail || "",
    };

    // Construct date of birth (Ensure valid Date object)
    const dateOfBirth =
      birthMonth && birthDay && birthYear
        ? new Date(`${birthYear}-${birthMonth}-${birthDay}`)
        : null;

    // Update user profile in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        username,
        firstName,
        lastName,
        phone,
        profilePicture,
        gender: genderType,
        dateOfBirth,
        address,
        treatmentStatus: currentStatus,
        emergencyContact,
        aboutMe,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Protected route to get user data
app.get("/api/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    //console.log("Token:", token);
    if (!token) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res
        .status(401)
        .json({ message: "Unauthorized, please log in again" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("Decoded token:", decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found");
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.email);
    res.status(200).json({
      username: user.firstName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      profilePicture: user.profilePicture,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      treatmentStatus: user.treatmentStatus,
      emergencyContact: user.emergencyContact,
      aboutMe: user.aboutMe,
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(500).json({ message: "Server error, please log in again" });
  }
});

// ✅ **GET API - Fetch User Profile Data**
app.get("/api/user/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.firstName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.address?.country || "",
      state: user.address?.region || "",
      city: user.address?.city || "",
      roadNumber: user.address?.roadno || "",
      houseNumber: user.address?.houseno || "",
      birthMonth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleString("en-US", { month: "long" })
        : "",
      birthDay: user.dateOfBirth ? new Date(user.dateOfBirth).getDate() : "",
      birthYear: user.dateOfBirth
        ? new Date(user.dateOfBirth).getFullYear()
        : "",
      phone: user.phone,
      phoneCode: "+880", // Default Bangladesh Code, modify if necessary
      genderRange: user.gender,
      currentStatus: user.treatmentStatus,
      emergencyName: user.emergencyContact?.name || "",
      emergencyEmail: user.emergencyContact?.email || "",
      emergencyPhone: user.emergencyContact?.phone || "",
      emergencyPhoneCode: "+880",
      aboutMe: user.aboutMe,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

// ✅ **POST API - Update User Profile**
app.post("/api/user/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const {
      username,
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      roadNumber,
      houseNumber,
      birthMonth,
      birthDay,
      birthYear,
      phone,
      phoneCode,
      genderRange,
      currentStatus,
      emergencyName,
      emergencyEmail,
      emergencyPhone,
      emergencyPhoneCode,
      aboutMe,
    } = req.body;

    const formattedDate =
      birthYear && birthMonth && birthDay
        ? new Date(`${birthMonth} ${birthDay}, ${birthYear}`)
        : null;

    const updateFields = {
      firstName,
      lastName,
      email,
      phone: phoneCode + phone,
      gender: genderRange,
      dateOfBirth: formattedDate,
      address: {
        country,
        region: state,
        city,
        roadno: roadNumber,
        houseno: houseNumber,
      },
      treatmentStatus: currentStatus,
      emergencyContact: {
        name: emergencyName,
        email: emergencyEmail,
        phone: emergencyPhoneCode + emergencyPhone,
      },
      aboutMe,
    };

    await User.findByIdAndUpdate(userId, updateFields, { new: true });

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

app.post("/api/symptoms/save-symptoms", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the token (added by verifyToken)
    const {
      date,
      vitals,
      symptoms,
      emotional,
      sleep,
      activities,
      additionalNotes,
    } = req.body;

    // Validate incoming data
    if (
      !date ||
      !vitals ||
      !req.body.symptoms ||
      !req.body.emotional ||
      !req.body.sleep ||
      !req.body.activities
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prepare symptom data and handle empty fields
    const symptomData = {
      user_id: userId, // Use userId from the token to associate with the current user
      date,
      bp_sys: vitals.systolic || null,
      bp_dia: vitals.diastolic || null,
      temp: vitals.temperature || null,
      glucose: vitals.glucoseLevel || null,
      weight: vitals.weight || null,
      height: vitals.height || null,
      heart_rate: vitals.heartRate || null,
      symptom_lvl: symptoms.overallSeverity || null,
      pain_lvl: symptoms.pain.severity || null,
      pain_loc: symptoms.pain.location || null,
      fatigue_lvl: symptoms.fatigue || null,
      vomiting_lvl: symptoms.nausea.severity || null,
      vom_time: symptoms.nausea.timing || null, // Set to null if empty or invalid
      breath_diff: symptoms.breathingDifficulty || null,
      appetite_loss: symptoms.appetiteLoss || null,
      fever_temp: symptoms.fever.temperature || null,
      fever_freq: req.body.symptoms.fever.frequency || null, // Set to null if empty or invalid
      skin_issue: req.body.symptoms.skinIssues.type || null,
      mood: req.body.emotional.moodRating || null,
      anxiety: req.body.emotional.anxiety || null,
      depression: req.body.emotional.depression || null,
      thoughts: req.body.emotional.additionalThoughts || null,
      energy_lvl: req.body.sleep.energyLevel || null,
      sleep_dur: req.body.sleep.duration || null,
      sleep_quality: req.body.sleep.quality || null,
      sleep_disturb: req.body.sleep.disturbances.has || false,
      task_ability: req.body.activities.performTasks || null,
      need_help: req.body.activities.needAssistance || false,
      notes: additionalNotes || null,
    };

    // Create the symptom data based on the schema
    const newSymptom = new PatientSymptom(symptomData);

    // Save symptom data to MongoDB
    await newSymptom.save();
    res
      .status(201)
      .json({ message: "Symptoms saved successfully", data: newSymptom });
  } catch (error) {
    console.error("Error saving symptoms:", error);
    res.status(500).json({ message: "Error saving symptoms", error });
  }
});
app.get("/api/symptoms/get-symptoms", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the token (added by verifyToken)
    const { date } = req.query; // Get the date from the query parameters
    console.log("Date in get symptom:", date);
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Find symptom entry for user and date
    const existingSymptom = await PatientSymptom.findOne({
      user_id: userId,
      date: new Date(date),
    });
    console.log("Existing Symptom in get symptom :", existingSymptom);

    if (existingSymptom) {
      // Save the updated symptom data to MongoDB
      return res
        .status(200)
        .json({ message: "Symptoms found", data: existingSymptom });
    } else {
      return res
        .status(404)
        .json({ message: "No symptoms found for the specified date" });
    }
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ message: "Error fetching symptoms", error });
  }
});
app.put("/api/symptoms/update-symptoms", async (req, res) => {
  console.log("Update Symptoms API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }
    console.log("Update Symptoms API 2");
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    console.log("Update Symptoms API", userId);
    const {
      date,
      vitals,
      symptoms,
      emotional,
      sleep,
      activities,
      additionalNotes,
    } = req.body;
    console.log("Update Symptoms API 3", req.body);
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    console.log("Looking for symptom of user:", userId, "on date:", date);
    // Find symptom entry for user and date
    const existingSymptom = await PatientSymptom.findOne({
      user_id: userId,
      date: new Date(date),
    });

    if (existingSymptom) {
      // Update only the fields that have changed
      existingSymptom.bp_sys =
        req.body.vitals?.systolic ?? existingSymptom.bp_sys;
      existingSymptom.bp_dia =
        req.body.vitals?.diastolic ?? existingSymptom.bp_dia;
      existingSymptom.temp =
        req.body.vitals?.temperature ?? existingSymptom.temp;
      existingSymptom.glucose =
        req.body.vitals?.glucoseLevel ?? existingSymptom.glucose;
      existingSymptom.weight =
        req.body.vitals?.weight ?? existingSymptom.weight;
      existingSymptom.height =
        req.body.vitals?.height ?? existingSymptom.height;
      existingSymptom.heart_rate =
        req.body.vitals?.heartRate ?? existingSymptom.heart_rate;

      existingSymptom.symptom_lvl =
        req.body.symptoms?.overallSeverity ?? existingSymptom.symptom_lvl;
      existingSymptom.pain_lvl =
        req.body.symptoms?.pain?.severity ?? existingSymptom.pain_lvl;
      existingSymptom.pain_loc =
        req.body.symptoms?.pain?.location ?? existingSymptom.pain_loc;
      existingSymptom.fatigue_lvl =
        req.body.symptoms?.fatigue ?? existingSymptom.fatigue_lvl;
      existingSymptom.vomiting_lvl =
        req.body.symptoms?.nausea?.severity ?? existingSymptom.vomiting_lvl;
      existingSymptom.vom_time =
        req.body.symptoms?.nausea?.timing ?? existingSymptom.vom_time;
      existingSymptom.breath_diff =
        req.body.symptoms?.breathingDifficulty ?? existingSymptom.breath_diff;
      existingSymptom.appetite_loss =
        req.body.symptoms?.appetiteLoss ?? existingSymptom.appetite_loss;
      existingSymptom.fever_temp =
        req.body.symptoms?.fever?.temperature ?? existingSymptom.fever_temp;
      existingSymptom.fever_freq =
        req.body.symptoms?.fever?.frequency ?? existingSymptom.fever_freq;
      existingSymptom.skin_issue =
        req.body.symptoms?.skinIssues?.type ?? existingSymptom.skin_issue;

      existingSymptom.mood =
        req.body.emotional?.moodRating ?? existingSymptom.mood;
      existingSymptom.anxiety =
        req.body.emotional?.anxiety ?? existingSymptom.anxiety;
      existingSymptom.depression =
        req.body.emotional?.depression ?? existingSymptom.depression;
      existingSymptom.thoughts =
        req.body.emotional?.additionalThoughts ?? existingSymptom.thoughts;

      existingSymptom.energy_lvl =
        req.body.sleep?.energyLevel ?? existingSymptom.energy_lvl;
      existingSymptom.sleep_dur =
        req.body.sleep?.duration ?? existingSymptom.sleep_dur;
      existingSymptom.sleep_quality =
        req.body.sleep?.quality ?? existingSymptom.sleep_quality;
      existingSymptom.sleep_disturb =
        req.body.sleep?.disturbances?.has ?? existingSymptom.sleep_disturb;

      existingSymptom.task_ability =
        req.body.activities?.performTasks ?? existingSymptom.task_ability;
      existingSymptom.need_help =
        req.body.activities?.needAssistance ?? existingSymptom.need_help;
      existingSymptom.notes = req.body.additionalNotes ?? existingSymptom.notes;

      // Save the updated symptom data to MongoDB
      console.log("Existing Symptom in update symptom:", existingSymptom);
      await existingSymptom.save();
      return res.status(200).json({
        message: "Symptoms updated successfully",
        data: existingSymptom,
      });
    } else {
      return res.status(404).json({
        message: "No symptoms found for the specified date to update",
      });
    }
  } catch (error) {
    console.error("Error updating symptoms:", error);
    res.status(500).json({ message: "Error updating symptoms", error });
  }
});

// Add medicine
app.post("/api/medicines/add", async (req, res) => {
  try {
    console.log("Add Medicine API");
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    const {
      name,
      amount,
      daysPerWeek,
      selectedDays,
      foodTiming,
      timesPerDay,
      notificationTimes,
    } = req.body;

    console.log("Request Data:", req.body);

    // Validate required fields
    if (
      !name ||
      !amount ||
      !daysPerWeek ||
      !selectedDays ||
      !foodTiming ||
      !timesPerDay ||
      !notificationTimes
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate nextDoseDate based on selectedDays
    const nextDoseDate = getNextDoseDate(selectedDays);

    const medicine = new Medicine({
      user_id: req.userId,
      name,
      amount,
      daysPerWeek,
      selectedDays,
      foodTiming,
      timesPerDay,
      notificationTimes,
      nextDoseDate, // Save the next dose date
      dateMedicineWasAdded: new Date(), // Save the date the medicine was added
    });

    await medicine.save();
    const savedMedicine = await Medicine.findOne({ _id: medicine._id });
    res
      .status(201)
      .json({ message: "Medicine added successfully", data: savedMedicine });
  } catch (error) {
    console.error("Error adding medicine:", error);
    res
      .status(500)
      .json({ message: "Error adding medicine", error: error.message });
  }
});

// Helper function to calculate next dose date
function getNextDoseDate(selectedDays) {
  const today = new Date();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const todayDay = today.getDay(); // Get today's weekday index (0 = Sunday, 1 = Monday, etc.)

  // Find the next available day based on selectedDays
  for (let i = 1; i <= 7; i++) {
    const nextDay = daysOfWeek[(todayDay + i) % 7];
    if (selectedDays.includes(nextDay)) {
      const nextDoseDate = new Date(today);
      nextDoseDate.setDate(today.getDate() + i); // Set the next dose date
      return nextDoseDate;
    }
  }
  return today; // Default to today if no valid day found (this is a fallback)
}
app.get("/api/medicines/today", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    // Get client's timezone offset (minutes)
    const tzOffset = parseInt(req.headers["timezone-offset"]) || 0;

    // Calculate current date in CLIENT'S timezone
    const clientNow = new Date(Date.now() - tzOffset * 60 * 1000);
    clientNow.setHours(0, 0, 0, 0); // Midnight in client's timezone

    const dayOfWeek = clientNow
      .toLocaleString("en-US", {
        weekday: "long",
        timeZone: "UTC", // Keep calculations in UTC after adjustment
      })
      .toLowerCase();

    // Find medicines for today
    const medicines = await Medicine.find({
      user_id: req.userId,
      selectedDays: { $in: [dayOfWeek] },
      nextDoseDate: { $lte: new Date() }, // Should be <= current time
    });

    if (medicines.length > 0) {
      res.status(200).json({
        message: "Medicines for today",
        medicines: medicines.map((med) => ({
          name: med.name,
          amount: med.amount,
          timesPerDay: med.timesPerDay,
          notificationTimes: med.notificationTimes,
          foodTiming: med.foodTiming,
          taken: med.taken,
          dateMedicineWasAdded: med.dateMedicineWasAdded, // Include the date medicine was added
          nextDoseDate: med.nextDoseDate, // Include the next dose date
        })),
      });
    } else {
      res.status(404).json({ message: "No medicines found for today" });
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res
      .status(500)
      .json({ message: "Error fetching medicines", error: error.message });
  }
});

// Get all medicines for user
// app.get("/api/medicines/list", async (req, res) => {
//   console.log("Get Medicines API");
//   try {
//     const token=req.cookies.token;
//     console.log("Token:", token);
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     const medicines = await Medicine.find({ user_id: req.userId });
//     res.status(200).json({ medicines });
//   } catch (error) {
//     console.error("Error fetching medicines:", error);
//     res.status(500).json({ message: "Error fetching medicines", error: error.message });
//   }
// });

// // Get medicine by ID
// app.get("/api/medicines/:id", async (req, res) => {
//   console.log("Get Medicine by ID API");
//   try {
//     const token=req.cookies.token;
//     console.log("Token:", token);
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     const medicine = await Medicine.findOne({
//       _id: req.params.id,
//       user_id: req.userId
//     });

//     if (!medicine) {
//       return res.status(404).json({ message: "Medicine not found" });
//     }

//     res.status(200).json({ medicine });
//   } catch (error) {
//     console.error("Error fetching medicine:", error);
//     res.status(500).json({ message: "Error fetching medicine", error: error.message });
//   }
// });

// // Update medicine status
// app.put("/api/medicines/status/:id", async (req, res) => {
//   console.log("Update Medicine Status API");
//   try {
//     const { status } = req.body;
//     const token=req.cookies.token;
//     console.log("Token:", token);
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     if (!['Completed', 'Skipped', 'Pending'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const medicine = await Medicine.findOneAndUpdate(
//       { _id: req.params.id, user_id: req.userId },
//       { status, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!medicine) {
//       return res.status(404).json({ message: "Medicine not found" });
//     }

//     res.status(200).json({ message: "Status updated successfully", medicine });
//   } catch (error) {
//     console.error("Error updating medicine status:", error);
//     res.status(500).json({ message: "Error updating status", error: error.message });
//   }
// });

// // Delete medicine
// app.delete("/api/medicines/:id", async (req, res) => {
//   console.log("Delete Medicine API");
//   try {
//     const token=req.cookies.token;
//     console.log("Token:", token);
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     const medicine = await Medicine.findOneAndDelete({
//       _id: req.params.id,
//       user_id: req.userId
//     });

//     if (!medicine) {
//       return res.status(404).json({ message: "Medicine not found" });
//     }

//     res.status(200).json({ message: "Medicine deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting medicine:", error);
//     res.status(500).json({ message: "Error deleting medicine", error: error.message });
//   }
// });

// // Get today's medicines
// Fetch medicines for today or a specific date

app.post("/api/newPost", async (req, res) => {
  console.log("Create Post API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    console.log("userid: ", userId);
    const { category, title, content, attachment } = req.body;
    if (!title || !content || !category || !attachment) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newPost = new ForumPost({
      user_id: userId,
      category,
      title,
      content,
      attachment,
      createdAt: new Date(),
    });
    await newPost.save();
    console.log("New Post:", newPost);
    res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
});
app.get("/api/posts", async (req, res) => {
  console.log("Get Posts API");
  try {
    const posts = await ForumPost.find()
      .sort({ createdAt: "desc" })
      .populate("user_id", "username");
    console.log("Posts:", posts.data);
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

app.post("/api/posts/:postId/report", async (req, res) => {
  console.log("Report Post API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    // Verify the token to extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const { reason } = req.body;
    const { postId } = req.params;

    // Validate the input
    if (!reason) {
      return res
        .status(400)
        .json({ message: "Reason for reporting is required" });
    }

    // Find the post being reported
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the report to the post's reports array
    post.reports.push({
      reported_by: userId,
      reason,
    });

    // Optionally, you can also set the post to "reported" if necessary
    post.reported = true;

    // Save the updated post with the report
    await post.save();

    // Send a response back
    res.status(201).json({ message: "Post reported successfully", data: post });
  } catch (error) {
    console.error("Error reporting post:", error);
    res
      .status(500)
      .json({ message: "Error reporting post", error: error.message });
  }
});
app.get("/api/posts/:postId", async (req, res) => {
  console.log("View post er postID api");
  try {
    const post = await ForumPost.findByIdAndUpdate(
      req.params.postId,
      { $inc: { views: 1 } }, // Increment view count by 1
      { new: true } // Return the updated document
    ).populate("user_id", "username profilePicture");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.votes === undefined || post.votes === null) {
      post.votes = 0;
    }
    console.log("Post User:", post.user_id.username);
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
});
//API to get comments
app.get("/api/posts/:postId/comments", async (req, res) => {
  console.log("Get Comments API");
  try {
    const comments = await Comment.find({ post_id: req.params.postId })
      .sort({ createdAt: "desc" })
      .populate("user_id", "username")
      .populate("replies.user_id", "username");
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
});
//API to create comments
app.post("/api/posts/:postId/comments", async (req, res) => {
  console.log("Create Comment API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const { content } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    // Create a new comment
    const newComment = new Comment({
      post_id: postId,
      user_id: userId,
      content,
    });

    // Save the comment to the database
    await newComment.save();

    // Increment the comment count for the post
    await ForumPost.findByIdAndUpdate(postId, {
      $inc: { comments: 1 },
    });

    console.log("New Comment:", newComment);
    res
      .status(201)
      .json({ message: "Comment added successfully", data: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
});
//API to create reply
app.post("/api/comments/:commentId/reply", async (req, res) => {
  console.log("Create Reply API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const { content } = req.body;
    const { commentId } = req.params;

    // Validate input
    if (!content) {
      return res.status(400).json({ message: "Reply content is required" });
    }

    // Find the comment that is being replied to
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Create a new reply
    const newReply = {
      user_id: userId,
      content,
      created_at: new Date(),
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: newReply } },
      { new: true }
    )
      .populate("user_id", "username")
      .populate("replies.user_id", "username");

    res.status(201).json({
      message: "Reply added successfully",
      data: updatedComment.replies,
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    res
      .status(500)
      .json({ message: "Error creating reply", error: error.message });
  }
});
//API to increase vote count
app.post("/api/posts/:postId/vote", async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the post first to check if it exists
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment votes
    post.votes = (post.votes || 0) + 1;
    await post.save();

    console.log("Updated Votes:", post.votes); // Debugging log

    res.status(200).json({ message: "Vote added", votes: post.votes });
  } catch (error) {
    console.error("Error voting on post:", error);
    res
      .status(500)
      .json({ message: "Error voting on post", error: error.message });
  }
});
//API to get user forum activities
app.get("/api/forumActivities", async (req, res) => {
  console.log("Get Forum Activities API");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please log in" });
    }

    // Verify the token to extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch comments where the user is the main commenter
    const mainComments = await Comment.find({ user_id: userId })
      .populate("user_id", "username profilePicture")
      .populate("post_id", "title")
      .select("content created_at post_id user_id");

    // Fetch comments where the user has replied
    const commentsWithUserReplies = await Comment.find({
      "replies.user_id": userId,
    })
      .populate("user_id", "username profilePicture")
      .populate("post_id", "title")
      .select("content created_at post_id user_id replies");

    // Extract the user's replies from comments
    const userReplies = commentsWithUserReplies.flatMap((comment) =>
      comment.replies
        .filter((reply) => reply.user_id.toString() === userId.toString())
        .map((reply) => ({
          type: "comment_reply",
          user: {
            name: comment.user_id?.username || "Unknown User",
            avatar: comment.user_id?.profilePicture || "",
          },
          content: reply.content,
          timestamp: new Date(reply.created_at).toLocaleString(),
          title: comment.post_id ? comment.post_id.title : "Deleted Post",
          postId: comment.post_id ? comment.post_id._id : null,
        }))
    );

    // Map main comments
    const mainCommentActivities = mainComments.map((comment) => ({
      type: "post_reply",
      user: {
        name: comment.user_id?.username || "Unknown User",
        avatar: comment.user_id?.profilePicture || "",
      },
      content: comment.content,
      timestamp: new Date(comment.created_at).toLocaleString(),
      title: comment.post_id ? comment.post_id.title : "Deleted Post",
      postId: comment.post_id ? comment.post_id._id : null,
    }));

    // Combine all activities
    const activities = [...mainCommentActivities, ...userReplies];

    // Sort activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Send the activities back in the response
    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching forum activities:", error);
    res
      .status(500)
      .json({
        message: "Error fetching forum activities",
        error: error.message,
      });
  }
});

// API Route: Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = router;
