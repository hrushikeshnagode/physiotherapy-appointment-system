import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/patient/appointments').then(res => {
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
      <p className="mt-3 text-muted">Loading your schedule...</p>
    </div>
  );

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold tracking-tight mb-1">My Appointments</h2>
              <p className="text-muted mb-0">Track and manage your scheduled sessions</p>
            </div>
            <div className="bg-white p-2 rounded-4 shadow-sm border small px-3">
              <span className="text-primary fw-bold">{appointments.length}</span> Total Bookings
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="glass-card p-5 text-center bg-white bg-opacity-50">
              <div className="fs-1 mb-3">📅</div>
              <h5 className="fw-bold">No sessions yet</h5>
              <p className="text-muted mb-4">You haven't booked any appointments with our specialists yet.</p>
              <a href="/patient/dashboard" className="btn btn-premium px-4">Find a Doctor</a>
            </div>
          ) : (
            <div className="glass-card overflow-hidden shadow-lg border-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 text-muted fw-bold small text-uppercase">Doctor</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase text-center">Date & Time</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase text-center">Status</th>
                      <th className="py-3 text-muted fw-bold small text-uppercase text-center">Payment</th>
                      <th className="px-4 py-3 text-muted fw-bold small text-uppercase text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a.id} className="border-bottom border-light">
                        <td className="px-4 py-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontWeight: '700' }}>
                              {a.physiotherapistName[0]}
                            </div>
                            <div className="fw-bold text-main">{a.physiotherapistName}</div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="fw-semibold text-main small">{a.appointmentDate}</div>
                          <div className="text-muted small">{fmt(a.startTime)} - {fmt(a.endTime)}</div>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`badge rounded-pill px-3 py-2 fw-medium ${a.status === 'CONFIRMED' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`badge rounded-pill px-3 py-2 fw-medium ${a.paymentStatus === 'SUCCESS' ? 'bg-indigo bg-opacity-10 text-primary' : 'bg-warning bg-opacity-10 text-warning'}`} style={{ color: '#6366f1' }}>
                            {a.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <button className="btn btn-light btn-sm rounded-3 px-3 fw-semibold border shadow-sm">Details</button>
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

export default UpcomingAppointments;
