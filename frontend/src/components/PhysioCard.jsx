import { useNavigate } from 'react-router-dom';

function PhysioCard({ physio }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 mb-4 animate-fade-in">
      <div className="glass-card h-100 overflow-hidden d-flex flex-column">
        {/* Top Accent Strip */}
        <div className="bg-primary" style={{ height: '4px', opacity: 0.8 }}></div>
        
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex align-items-start mb-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center fw-bold fs-4 shadow-sm"
                 style={{ width: '64px', height: '64px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              {physio.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="ms-3 pt-1">
              <h5 className="fw-bold mb-1 tracking-tight text-main">{physio.name}</h5>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10 px-2 py-1 rounded-3 small">
                  {physio.specialization}
                </span>
                {physio.availableToday && (
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 px-2 py-1 rounded-3 small animate-pulse">
                    ⚡ Available Today
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">🎓</span>
              <span className="text-muted small fw-medium">{physio.qualification}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">📍</span>
              <span className="text-muted small text-truncate fw-medium">{physio.clinicAddress}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2">📞</span>
              <span className="text-muted small fw-medium">{physio.contactNumber}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-top border-light d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>CONSULTATION FEE</small>
              <span className="fw-bold text-primary fs-5">₹{physio.fees}</span>
            </div>
            <button
              className="btn btn-premium btn-sm px-4 py-2"
              onClick={() => navigate(`/patient/book/${physio.userId}`)}
            >
              View Slots →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysioCard;
