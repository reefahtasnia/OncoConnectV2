const mongoose = require("mongoose");

// Explicitly connect to OncoConnect DB
//const db = mongoose.connection.useDb("OncoConnect");

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
const patientSymptomSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key reference to User
  date: { type: Date, required: true },

  // Vital Signs
  bp_sys: { type: Number },
  bp_dia: { type: Number },
  temp: { type: Number },
  glucose: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  heart_rate: { type: Number },

  // Symptom Severity Levels (Scale 0-10)
  symptom_lvl: { type: Number, min: 0, max: 10 },
  pain_lvl: { type: Number, min: 0, max: 10 },
  pain_loc: { type: String },

  fatigue_lvl: { type: Number, min: 0, max: 10 },
  vomiting_lvl: { type: Number, min: 0, max: 10 },
  vom_time: { type: String, enum: ["morning", "after meals", "evening", "random"] },

  breath_diff: { type: Number, min: 0, max: 10 },
  appetite_loss: { type: Number, min: 0, max: 10 },
  fever_temp: { type: Number },
  fever_freq: { type: String, enum: ["on and off", "persistent"] },

  // Mental Health & Energy
  skin_issue: { type: String },
  mood: { type: Number, min: 0, max: 10 },
  anxiety: { type: Number, min: 0, max: 10 },
  depression: { type: Number, min: 0, max: 10 },
  thoughts: { type: String },

  // Sleep & Energy Levels
  energy_lvl: { type: Number, min: 0, max: 10 },
  sleep_dur: { type: String },
  sleep_quality: { type: String },
  sleep_disturb: { type: Boolean, default: false },

  // Functional Ability
  task_ability: { type: String },
  need_help: { type: Boolean, default: false },

  // Additional Notes
  notes: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Register Models
//const User = db.model("Users", userSchema);
const User = mongoose.model('User', userSchema);
const Doctor = mongoose.model("Doctors", doctorSchema);
const PatientSymptom = mongoose.model("PatientSymptom", patientSymptomSchema);

// Export Both Models
module.exports = { User, Doctor, PatientSymptom };

