import { useNavigate } from 'react-router-dom';

function PhysioCard({ physio, index }) {
  const navigate = useNavigate();
  const staggerClass = `stagger-${(index % 3) + 1}`;

  return (
    <div className={`col-lg-4 col-md-6 mb-4 animate-reveal ${staggerClass}`}>
      <div className="glass-card h-100 d-flex flex-column border-0 shadow-lg" 
           style={{ borderRadius: '28px' }}>
        
        {/* Visual Accent */}
        <div className="position-absolute top-0 end-0 p-4 opacity-10" style={{ fontSize: '4rem', zIndex: 0 }}>
          🩺
        </div>

        <div className="card-body p-4 d-flex flex-column position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary text-white rounded-4 d-flex align-items-center justify-content-center fw-bold fs-4 shadow-xl"
                 style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' }}>
              {physio.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="ms-3">
              <h5 className="fw-bold mb-1 tracking-tight text-slate-900">{physio.name}</h5>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-white text-primary border border-primary border-opacity-20 px-2 py-1 rounded-pill small fw-bold">
                  {physio.specialization}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4 flex-grow-1">
            <div className="d-flex align-items-center p-2 rounded-3 hover-bg-light transition-smooth">
              <span className="me-3 fs-5">🎓</span>
              <div>
                <small className="text-muted d-block lh-1">Qualification</small>
                <span className="fw-semibold small">{physio.qualification}</span>
              </div>
            </div>
            <div className="d-flex align-items-center p-2 rounded-3 hover-bg-light transition-smooth">
              <span className="me-3 fs-5">📍</span>
              <div className="text-truncate">
                <small className="text-muted d-block lh-1">Location</small>
                <span className="fw-semibold small text-truncate d-block">{physio.clinicAddress}</span>
              </div>
            </div>
            <div className="d-flex align-items-center p-2 rounded-3 hover-bg-light transition-smooth">
              <span className="me-3 fs-5">💬</span>
              <div>
                <small className="text-muted d-block lh-1">Support</small>
                <span className="fw-semibold small">Available for Chat</span>
              </div>
            </div>
          </div>

          {physio.availableToday && (
            <div className="mb-4 p-2 bg-success bg-opacity-10 rounded-4 border border-success border-opacity-20 d-flex align-items-center justify-content-center gap-2 animate-pulse">
              <span className="d-block bg-success rounded-circle" style={{ width: '8px', height: '8px', boxShadow: '0 0 10px #10b981' }}></span>
              <span className="text-success small fw-bold uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>Elite Availability Today</span>
            </div>
          )}

          <div className="mt-auto pt-4 border-top border-slate-100 d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted d-block fw-bold tracking-widest" style={{ fontSize: '0.65rem' }}>FEE</small>
              <span className="fw-extrabold text-slate-900 fs-4">₹{physio.fees}</span>
            </div>
            <button
              className="btn btn-premium px-4 py-2 shadow-lg"
              onClick={() => navigate(`/patient/book/${physio.userId}`)}
            >
              Book Now <span className="ms-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysioCard;
