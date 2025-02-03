require("dotenv").config({ path: ".envr" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],  // Add 'Cookie' here
  exposedHeaders: ['set-cookie']  // Add this line
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const { User, Doctor } = require("./tableSchema.js");

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

      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Check if the user profile is complete or not
      const requiredFields = ["firstName", "lastName", "phone", "gender", "dateOfBirth", "address", "treatmentStatus"];
      const isProfileIncomplete = requiredFields.some(field => !user[field]);

      if (isProfileIncomplete) {
        return res.status(200).json({ redirect: "/editProfile" });
      }

      const token = jwt.sign(
        { userId: user._id, userType: "patient" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      // console.log("Token:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        path: '/'  // Add this to ensure cookie is sent for all paths
      });
      // console.log("Cookie being set:", {
      //   token: token,
      //   headers: res.getHeaders()
      // });
      console.log("User logged in:", user,email);
      return res.status(200).json({ redirect: "/user" });
    } 
    
    else if (userType === "doctor") {
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
        sameSite: 'lax',
        path: '/'  // Add this to ensure cookie is sent for all paths
      });
      console.log("Doctor logged in:", doctor.email);
      return res.status(200).json({ redirect: "/doctor" });
    } 
    
    else {
      return res.status(400).json({ message: "Invalid user type" });
    }

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/api/edit-profile", async (req, res) => {
  try {
    const { 
      username,
      email, 
      firstName, 
      lastName, 
      phone, 
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
      aboutMe 
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
    const dateOfBirth = birthMonth && birthDay && birthYear
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

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

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
      res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
      return res.status(401).json({ message: "Unauthorized, please log in again" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("Decoded token:", decoded.userId);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      console.log("User not found");
      res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.email);
    res.status(200).json({
      username: user.firstName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      treatmentStatus: user.treatmentStatus,
      emergencyContact: user.emergencyContact,
      aboutMe: user.aboutMe,
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
    res.status(500).json({ message: "Server error, please log in again" });
  }
});



// API Route: Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
