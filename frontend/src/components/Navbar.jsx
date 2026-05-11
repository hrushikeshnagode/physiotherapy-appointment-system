import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      zIndex: 1000
    }}>
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
            <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>P</span>
          </div>
          <span className="fw-bold fs-4 tracking-tight" style={{ color: 'var(--text-main)' }}>
            Physio<span className="text-primary">Book</span>
          </span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {token ? (
              <>
                <li className="nav-item me-3 d-none d-lg-block">
                  <span className="text-muted small">Welcome,</span>
                  <div className="fw-semibold" style={{ fontSize: '0.95rem' }}>{name}</div>
                </li>
                
                {role === 'PATIENT' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fw-medium" to="/patient/dashboard">Find Doctors</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link fw-medium" to="/patient/appointments">My Bookings</Link>
                    </li>
                  </>
                )}
                
                {role === 'PHYSIOTHERAPIST' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fw-medium" to="/physio/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link fw-medium" to="/physio/appointments">Schedule</Link>
                    </li>
                  </>
                )}
                
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-premium-outline btn-sm px-4" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3 text-dark" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-premium btn-sm px-4" to="/signup">Join Now</Link>
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
