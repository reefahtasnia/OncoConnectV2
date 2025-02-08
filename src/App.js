import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/Login';
import Footer from './components/Footer';
import Navbar from './components/Nav';
import Home from './components/Home.js';
import EditProfile from './components/editProfile.js';
import Forum from './components/communityforum.js';
import NewQuestion from './components/newPost.js';
import ViewPost from './components/viewPost.js';
import Signup from './components/Signup.js';
import Appf from './components/AppointmentForm.jsx';
import PassordReset from './components/resetPassword.js';
import DoctorDashboard from './doctor-dashboard/Doctordashboard.js';
import DoctorMessages from './doctor-dashboard/DoctorMessages.js';
import DoctorPatient from './doctor-dashboard/patient.js';
import Patientdetail from './doctor-dashboard/patient-detail.js';
import UserDashboard from './user-dashboard/dashboard.js';
import UserMedicines from './user-dashboard/medicine.js';
import UserMessages from './user-dashboard/messages.js';
import UserDiary from './user-dashboard/diary.js';
import UserForum from './user-dashboard/forum.js';
import Mental from './components/MentalHealthPage.js';
import Donation from './components/Donation.js';
import Ai from './components/Ai.js';
import Survival from './components/Survival.js';
import Survivalkid from './components/Landingkid.js';
import Bunny from './components/Bunny.js';
import Elephant from './components/Elephant.js';
import Formpage from './components/Formpage.js';
import Doctor_finder from './components/Doctor_finder.jsx';
import CancerScreen from './components/CancerScreening.jsx';
import Quiz from './components/Quiz.jsx';
import Quiz2 from './components/QuizAssessment.jsx';
import Credit from './components/CreditPage';
import Calorie from './components/Calorie.js';
import Caregiverpage from './components/Caregiverpage.jsx';
import Paypal from './components/Paypal.js';
import SymptomTracker from './components/SymptomTracker.js';
import AI2 from './components/Ai2.js';
import AI3 from './components/AI3.js';
import DoctorSignup from './components/doctorSignup.js';

const PageWrapper = ({ children }) => {
    const location = useLocation();
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  };

function App() {
    const location = useLocation();

    // Define routes where the Navbar should not appear
    const noNavbarRoutes = ['/', '/login', '/signup', '/forgot-password'];

    return (
        <>
            {/* Render Navbar only if the current route is not in the noNavbarRoutes array */}
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/appf" element={<Appf />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/doctor-signup" element={<DoctorSignup />} />
                <Route path="/forgot-password" element={<PassordReset />} />
                <Route path="/newquestion" element={<NewQuestion />} />
                <Route path="/viewpost" element={<ViewPost />} />
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/messages" element={<DoctorMessages />} />
                <Route path="/doctor/patients" element={<DoctorPatient />} />
                <Route path="doctor/patients/patient-2" element={<Patientdetail />} />
                <Route path="/mental" element={<Mental />} />
                <Route path="/ai" element={<Ai />} />
                <Route path="/formpage" element={<Formpage />} />
                <Route path="/bunny" element={<Bunny />} />
                <Route path="/elephant" element={<Elephant />} />
                <Route path="/survival" element={<Survival />} />
                <Route path="/kid" element={<Survivalkid />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/user" element={<UserDashboard  />}/>
                <Route path="/user/medicine" element={<UserMedicines  />} />
                <Route path="/user/messages" element={<UserMessages />} />
                <Route path="/user/diary" element={<UserDiary />} />
                <Route path="/user/forum" element={<UserForum />} />
                <Route path="/symptom" element={<SymptomTracker />} />
                <Route path="/docfind" element={<Doctor_finder />} />
                <Route path="/cancerscreen" element={<CancerScreen />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz2" element={<Quiz2 />} />
                <Route path="/credit" element={<Credit />} />
                <Route path="/calorie" element={<Calorie />} />
                <Route path="/care" element={<Caregiverpage />} />
                <Route path="/paypal" element={<Paypal />} />
                <Route path="/ai3" element={<AI3 />} />

                <Route path="/ai2" element={<AI2 />} />
            </Routes>
        </>
    );
}

export default function RootApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}
