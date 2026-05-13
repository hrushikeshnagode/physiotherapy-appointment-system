import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg sticky-top mt-3 mx-lg-4" style={{ 
      background: 'rgba(255, 255, 255, 0.4)', 
      backdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '24px',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="container py-1">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-4 p-2 me-3 d-flex align-items-center justify-content-center shadow-lg" 
               style={{ width: '42px', height: '42px', transition: 'transform 0.3s ease' }}>
            <span style={{ fontWeight: '900', fontSize: '1.4rem' }}>P</span>
          </div>
          <span className="fw-bold fs-4 tracking-tight" style={{ color: 'var(--slate-900)' }}>
            Physio<span className="text-primary">Book</span>
          </span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {token ? (
              <>
                <li className="nav-item me-2 d-none d-lg-block">
                  <div className="px-3 py-1 bg-white bg-opacity-50 rounded-pill border border-white">
                    <span className="text-muted small">Hello, </span>
                    <span className="fw-bold small">{name}</span>
                  </div>
                </li>
                
                {role === 'PATIENT' && (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link fw-semibold px-3 rounded-pill transition-smooth ${isActive('/patient/dashboard') ? 'bg-primary text-white shadow-md' : 'text-slate-800'}`} to="/patient/dashboard">
                        Find Doctors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link fw-semibold px-3 rounded-pill transition-smooth ${isActive('/patient/appointments') ? 'bg-primary text-white shadow-md' : 'text-slate-800'}`} to="/patient/appointments">
                        My Bookings
                      </Link>
                    </li>
                  </>
                )}
                
                {role === 'PHYSIOTHERAPIST' && (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link fw-semibold px-3 rounded-pill transition-smooth ${isActive('/physio/dashboard') ? 'bg-primary text-white shadow-md' : 'text-slate-800'}`} to="/physio/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link fw-semibold px-3 rounded-pill transition-smooth ${isActive('/physio/appointments') ? 'bg-primary text-white shadow-md' : 'text-slate-800'}`} to="/physio/appointments">
                        Schedule
                      </Link>
                    </li>
                  </>
                )}
                
                <li className="nav-item ms-lg-2">
                  <button className="btn btn-premium-outline btn-sm px-4 rounded-pill border-0 shadow-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-premium btn-sm px-4 rounded-pill" to="/signup">Get Started</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
