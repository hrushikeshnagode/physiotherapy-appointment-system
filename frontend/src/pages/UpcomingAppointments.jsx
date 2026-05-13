import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

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
                          <button 
                            className="btn btn-light btn-sm rounded-3 px-3 fw-semibold border shadow-sm"
                            onClick={() => setSelectedApp(a)}
                          >
                            Details
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

      {/* Details Modal */}
      {selectedApp && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-0 shadow-2xl animate-fade-in-up">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold tracking-tight">Appointment Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedApp(null)}></button>
              </div>
              <div className="modal-body py-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: '800' }}>
                    {selectedApp.physiotherapistName[0]}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{selectedApp.physiotherapistName}</h5>
                    <p className="text-muted small mb-0">{selectedApp.specialization || 'Physiotherapist'} • {selectedApp.qualification || 'BPT'}</p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Date</small>
                      <span className="fw-bold small">{selectedApp.appointmentDate}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Time Slot</small>
                      <span className="fw-bold small">{fmt(selectedApp.startTime)} - {fmt(selectedApp.endTime)}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Status</small>
                      <span className={`badge rounded-pill px-2 py-1 small ${selectedApp.status === 'CONFIRMED' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                        {selectedApp.status}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Consultation Fee</small>
                      <span className="fw-bold small">₹{selectedApp.fees || '500'}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Clinic Address</small>
                      <p className="small mb-0 fw-medium">{selectedApp.clinicAddress || 'Address not available'}</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-light rounded-4 border border-white">
                      <small className="text-muted d-block mb-1">Contact Details</small>
                      <p className="small mb-0 fw-medium">📞 {selectedApp.contactNumber || 'Contact not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-premium w-100 py-3 rounded-4" onClick={() => setSelectedApp(null)}>Close Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingAppointments;
