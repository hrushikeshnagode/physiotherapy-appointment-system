import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('userId', res.data.userId);

      if (res.data.role === 'PATIENT') {
        navigate('/patient/dashboard');
      } else {
        navigate('/physio/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center py-lg-5">
        <div className="col-md-5 col-lg-4">
          <div className="glass-card p-4 p-lg-5">
            <div className="text-center mb-5">
              <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-4 mb-3">
                <span style={{ fontSize: '1.5rem' }}>🔐</span>
              </div>
              <h2 className="fw-bold tracking-tight">Welcome Back</h2>
              <p className="text-muted small">Please enter your details to sign in</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0 rounded-4 py-3 mb-4 small animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold small text-muted">Email Address</label>
                <input 
                  type="email" 
                  className="form-control form-control-premium" 
                  name="email"
                  placeholder="name@example.com"
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold small text-muted">Password</label>
                  <a href="#" className="small text-primary text-decoration-none">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  className="form-control form-control-premium" 
                  name="password"
                  placeholder="••••••••"
                  value={form.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-premium w-100 py-3 mb-4" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-2">
              <p className="text-muted small">
                Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up Free</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
