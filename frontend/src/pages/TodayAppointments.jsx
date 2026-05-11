import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/physio/appointments/today').then(res => {
      setAppointments(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const fmt = (t) => {
    if (!t) return '';
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary"></div>
      <p className="mt-3 text-muted">Fetching your schedule...</p>
    </div>
  );

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
              <Link to="/physio/dashboard" className="btn btn-light rounded-circle me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                ←
              </Link>
              <div>
                <h2 className="fw-bold tracking-tight mb-1">Today's Schedule</h2>
                <p className="text-muted mb-0">Overview of your booked sessions for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-4 shadow-sm border small px-3">
              <span className="text-primary fw-bold">{appointments.length}</span> Sessions Booked
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="glass-card p-5 text-center bg-white bg-opacity-50">
              <div className="fs-1 mb-3">☕</div>
              <h5 className="fw-bold">No appointments yet</h5>
              <p className="text-muted mb-0">Your schedule is currently clear for today. New bookings will appear here.</p>
            </div>
          ) : (
            <div className="glass-card overflow-hidden shadow-lg border-0 animate-fade-in">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 text-muted fw-bold small text-uppercase">Time Slot</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase">Patient Name</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase text-center">Status</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase text-center">Payment Status</th>
                      <th className="px-4 py-3 text-muted fw-bold small text-uppercase text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a.id} className="border-bottom border-light">
                        <td className="px-4 py-4">
                          <div className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                            {fmt(a.startTime)}
                          </div>
                          <div className="text-muted small">to {fmt(a.endTime)}</div>
                        </td>
                        <td className="py-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>
                              {a.patientName[0]}
                            </div>
                            <div className="fw-semibold text-main">{a.patientName}</div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="badge rounded-pill px-3 py-2 fw-medium bg-success bg-opacity-10 text-success">
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="badge rounded-pill px-3 py-2 fw-medium bg-indigo bg-opacity-10 text-primary" style={{ color: '#6366f1' }}>
                            {a.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <button className="btn btn-premium-outline btn-sm px-4">Start Session</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodayAppointments;
