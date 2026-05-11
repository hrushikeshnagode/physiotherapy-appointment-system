import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('PATIENT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', contactNumber: '',
    age: '', gender: '',
    qualification: '', specialization: '', clinicAddress: '', fees: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = { ...form, role };
      if (role === 'PATIENT') {
        payload.age = parseInt(payload.age) || null;
      } else {
        payload.fees = parseFloat(payload.fees) || 0;
      }
      const res = await API.post('/auth/signup', payload);
      setSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="glass-card p-4 p-lg-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold tracking-tight mb-2">Create Account</h2>
              <p className="text-muted">Choose your role and join our health community</p>
            </div>

            {/* Premium Role Switcher */}
            <div className="p-1 mb-5 bg-light rounded-4 d-flex" style={{ border: '1px solid #e2e8f0' }}>
              <button 
                className={`flex-fill btn rounded-4 py-2 fw-semibold transition-all ${role === 'PATIENT' ? 'btn-primary shadow' : 'btn-link text-muted text-decoration-none'}`}
                onClick={() => setRole('PATIENT')}>
                🧑 Patient
              </button>
              <button 
                className={`flex-fill btn rounded-4 py-2 fw-semibold transition-all ${role === 'PHYSIOTHERAPIST' ? 'btn-primary shadow' : 'btn-link text-muted text-decoration-none'}`}
                onClick={() => setRole('PHYSIOTHERAPIST')}>
                👨‍⚕️ Physiotherapist
              </button>
            </div>

            {error && <div className="alert alert-danger border-0 rounded-4 py-3 mb-4 animate-fade-in">{error}</div>}
            {success && <div className="alert alert-success border-0 rounded-4 py-3 mb-4 animate-fade-in">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Full Name</label>
                  <input type="text" className="form-control form-control-premium" name="name"
                    placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Email Address</label>
                  <input type="email" className="form-control form-control-premium" name="email"
                    placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Password</label>
                  <input type="password" className="form-control form-control-premium" name="password"
                    placeholder="••••••••" value={form.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Phone Number</label>
                  <input type="text" className="form-control form-control-premium" name="contactNumber"
                    placeholder="+91 98765 43210" value={form.contactNumber} onChange={handleChange} required />
                </div>
              </div>

              {role === 'PATIENT' && (
                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Age</label>
                    <input type="number" className="form-control form-control-premium" name="age"
                      placeholder="25" value={form.age} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Gender</label>
                    <select className="form-select form-control-premium" name="gender"
                      value={form.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {role === 'PHYSIOTHERAPIST' && (
                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Qualification</label>
                    <input type="text" className="form-control form-control-premium" name="qualification"
                      placeholder="BPT, MPT" value={form.qualification} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Specialization</label>
                    <input type="text" className="form-control form-control-premium" name="specialization"
                      placeholder="Sports, Ortho" value={form.specialization} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">Clinic Address</label>
                    <input type="text" className="form-control form-control-premium" name="clinicAddress"
                      placeholder="Street, City, Zip" value={form.clinicAddress} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">Consultation Fees (₹)</label>
                    <input type="number" className="form-control form-control-premium" name="fees"
                      placeholder="500" value={form.fees} onChange={handleChange} required />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-premium w-100 py-3 mb-4 fs-5" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : `Join as ${role.charAt(0) + role.slice(1).toLowerCase()}`}
              </button>
            </form>
            
            <div className="text-center">
              <p className="text-muted small">
                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
