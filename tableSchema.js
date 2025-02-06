/*const mongoose = require("mongoose");

// Explicitly connect to OncoConnect DB
const db = mongoose.connection.useDb("OncoConnect");

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String, unique: true, sparse: true },
  gender: { type: String, enum: ["Male", "Female"] },
  dateOfBirth: { type: Date },
  profilePicture: { type: String },
  address: {
    houseno: String,
    roadno: String,
    city: String,
    region: String,
    country: String,
  },
  treatmentStatus: {
    type: String,
    enum: ["ongoing", "completed", "diagnosed not treated"],
  },
  emergencyContact: {
    name: String,
    phone: String,
    email: String,
  },
  aboutMe: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

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
  counsellingTypes: {
    type: String,
    enum: ["Physical", "Call", "Online"],
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

// Register Models
const User = db.model("Users", userSchema);
const Doctor = db.model("Doctors", doctorSchema);

// Export Both Models
module.exports = { User, Doctor };
*/