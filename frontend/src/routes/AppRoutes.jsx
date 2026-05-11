import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PatientDashboard from '../pages/PatientDashboard';
import BookingPage from '../pages/BookingPage';
import UpcomingAppointments from '../pages/UpcomingAppointments';
import PhysioDashboard from '../pages/PhysioDashboard';
import TodayAppointments from '../pages/TodayAppointments';

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/patient/dashboard" element={<ProtectedRoute allowedRole="PATIENT"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/book/:physioId" element={<ProtectedRoute allowedRole="PATIENT"><BookingPage /></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute allowedRole="PATIENT"><UpcomingAppointments /></ProtectedRoute>} />
      <Route path="/physio/dashboard" element={<ProtectedRoute allowedRole="PHYSIOTHERAPIST"><PhysioDashboard /></ProtectedRoute>} />
      <Route path="/physio/appointments" element={<ProtectedRoute allowedRole="PHYSIOTHERAPIST"><TodayAppointments /></ProtectedRoute>} />
    </Routes>
  );
}

function Landing() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token && role === 'PATIENT') return <Navigate to="/patient/dashboard" />;
  if (token && role === 'PHYSIOTHERAPIST') return <Navigate to="/physio/dashboard" />;

  return (
    <div className="container-fluid p-0 overflow-hidden">
      {/* Hero Section */}
      <section className="py-5 mt-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 animate-fade-in text-center text-lg-start">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-semibold">
                ✨ Trusted by 5000+ Patients
              </span>
              <h1 className="display-3 fw-bold mb-4 tracking-tight">
                Expert Physiotherapy, <br />
                <span className="heading-gradient">Just a Click Away.</span>
              </h1>
              <p className="lead text-muted mb-5 pe-lg-5">
                Connecting you with certified specialists for personalized care. Book, manage, and track your recovery journey in one seamless platform.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/signup" className="btn btn-premium px-5 py-3 fs-5">
                  Start Your Recovery
                </Link>
                <Link to="/login" className="btn btn-premium-outline px-5 py-3 fs-5">
                  Patient Login
                </Link>
              </div>
              
              <div className="row mt-5 g-4 text-center text-lg-start">
                <div className="col-4">
                  <h4 className="fw-bold mb-0">200+</h4>
                  <small className="text-muted">Doctors</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold mb-0">15k+</h4>
                  <small className="text-muted">Sessions</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold mb-0">4.9/5</h4>
                  <small className="text-muted">Rating</small>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 d-none d-lg-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="position-relative">
                {/* Visual Placeholder for high-end feel */}
                <div className="glass-card p-4 mx-auto" style={{ maxWidth: '450px', transform: 'rotate(2deg)' }}>
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-4 me-3">🩺</div>
                    <div>
                      <h6 className="mb-0 fw-bold">Dr. Sarah Johnson</h6>
                      <small className="text-muted">Sports Physiotherapist</small>
                    </div>
                  </div>
                  <div className="bg-light p-3 rounded-4 mb-3 border border-white">
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>Available Slots</span>
                      <span>Today</span>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="badge bg-white text-primary border p-2">10:00 AM</span>
                      <span className="badge bg-white text-primary border p-2">11:30 AM</span>
                      <span className="badge bg-primary text-white p-2">02:00 PM</span>
                    </div>
                  </div>
                  <div className="btn btn-primary w-100 rounded-4">Book Session</div>
                </div>
                
                {/* Decorative blobs */}
                <div className="position-absolute top-50 start-50 translate-middle bg-primary rounded-circle opacity-10" 
                     style={{ width: '400px', height: '400px', filter: 'blur(80px)', zIndex: -1 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-5 bg-white bg-opacity-50">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { icon: '📅', title: 'Easy Scheduling', desc: 'Book appointments in seconds with real-time slot tracking.' },
              { icon: '💳', title: 'Secure Payments', desc: 'Hassle-free mock payment flow for a smooth booking experience.' },
              { icon: '👨‍⚕️', title: 'Top Specialists', desc: 'Access verified physiotherapists with detailed profiles and reviews.' }
            ].map((feature, i) => (
              <div key={i} className="col-md-4">
                <div className="p-4 rounded-4 bg-white shadow-sm border border-white h-100">
                  <div className="fs-1 mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted small mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppRoutes;
