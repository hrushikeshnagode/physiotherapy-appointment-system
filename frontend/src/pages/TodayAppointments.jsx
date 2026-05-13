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
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
      <p className="mt-4 text-muted fw-bold animate-pulse">Synchronizing your daily schedule...</p>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11 animate-reveal">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
              <Link to="/physio/dashboard" className="btn btn-premium-outline rounded-circle me-4 d-flex align-items-center justify-content-center p-0 shadow-sm" style={{ width: '48px', height: '48px' }}>
                ←
              </Link>
              <div>
                <h1 className="fw-extrabold tracking-tight mb-1">Today's <span className="heading-gradient">Schedule</span></h1>
                <p className="text-muted mb-0 fw-medium">Managing sessions for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-4 shadow-sm border small px-4">
              <span className="text-primary fw-extrabold fs-5">{appointments.length}</span> <span className="text-muted fw-bold text-uppercase tracking-widest ms-1" style={{ fontSize: '0.7rem' }}>Sessions Booked</span>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="glass-card p-5 text-center border-0 shadow-lg">
              <div className="fs-1 mb-3">☕</div>
              <h4 className="fw-bold">Peaceful Day Ahead</h4>
              <p className="text-muted mb-0">No sessions booked yet. Enjoy your clear schedule!</p>
            </div>
          ) : (
            <div className="glass-card overflow-hidden border-0 shadow-2xl">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-slate-900 text-white border-0">
                    <tr>
                      <th className="px-4 py-4 text-uppercase tracking-widest small fw-bold">Time Slot</th>
                      <th className="py-4 text-uppercase tracking-widest small fw-bold">Patient Details</th>
                      <th className="py-4 text-center text-uppercase tracking-widest small fw-bold">Status</th>
                      <th className="py-4 text-center text-uppercase tracking-widest small fw-bold">Payment</th>
                      <th className="px-4 py-4 text-end text-uppercase tracking-widest small fw-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, index) => (
                      <tr key={a.id} className="border-bottom border-slate-100">
                        <td className="px-4 py-4">
                          <div className="fw-extrabold text-slate-900 fs-5 mb-0">
                            {fmt(a.startTime)}
                          </div>
                          <div className="text-muted small fw-bold opacity-75">to {fmt(a.endTime)}</div>
                        </td>
                        <td className="py-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-4 d-flex align-items-center justify-content-center me-3 fw-extrabold shadow-sm" style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}>
                              {a.patientName[0]}
                            </div>
                            <div>
                              <div className="fw-bold text-slate-900">{a.patientName}</div>
                              <div className="text-muted small fw-medium">Scheduled Patient</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="badge rounded-pill px-3 py-2 fw-bold bg-success bg-opacity-10 text-success border border-success border-opacity-20">
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="badge rounded-pill px-3 py-2 fw-bold bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20">
                            {a.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <button className="btn btn-premium btn-sm px-4 shadow-md">
                            Start <span className="d-none d-md-inline">Session</span>
                          </button>
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
