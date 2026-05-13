import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axiosConfig';
import SlotCard from '../components/SlotCard';

function BookingPage() {
  const { physioId } = useParams();
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');

  const fetchSlots = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await API.get(`/physiotherapists/${physioId}/slots?date=${date}`);
      setSlots(res.data);
    } catch (err) {
      console.error('Error fetching slots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [date]);

  const handleBook = async (slot) => {
    setBooking(true);
    setMessage('');
    try {
      // Premium mock payment simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await API.post('/appointments/book', {
        slotId: slot.id,
        physiotherapistId: parseInt(physioId),
      });

      setMsgType('success');
      setMessage(
        `✨ Appointment Confirmed for ${res.data.appointmentDate} at ${formatTime(res.data.startTime)}!`
      );
      fetchSlots();
    } catch (err) {
      setMsgType('danger');
      setMessage(err.response?.data?.error || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-8 animate-reveal">
          <div className="d-flex align-items-center mb-5">
            <Link to="/patient/dashboard" className="btn btn-premium-outline rounded-circle me-4 d-flex align-items-center justify-content-center p-0" style={{ width: '48px', height: '48px' }}>
              ←
            </Link>
            <div>
              <h1 className="fw-extrabold tracking-tight mb-1">Select a <span className="heading-gradient">Time Slot</span></h1>
              <p className="text-muted mb-0 fw-medium">Pick a convenient time for your recovery session</p>
            </div>
          </div>

          {message && (
            <div className={`alert alert-${msgType === 'success' ? 'primary' : 'danger'} border-0 rounded-4 shadow-xl py-4 mb-5 animate-reveal`} 
                 style={{ background: msgType === 'success' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(244, 63, 94, 0.1)', backdropFilter: 'blur(10px)' }}>
              <div className="d-flex align-items-center">
                <span className="me-4 fs-2">{msgType === 'success' ? '✨' : '⚠️'}</span>
                <div>
                  <h5 className="fw-bold mb-1">{msgType === 'success' ? 'Confirmed!' : 'Action Required'}</h5>
                  <p className="small mb-0 opacity-75 fw-medium">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="glass-card p-4 mb-5 border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <div className="row align-items-center g-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-muted text-uppercase tracking-widest mb-3 d-block">Consultation Date</label>
                <div className="position-relative">
                  <input
                    type="date"
                    className="form-control form-control-premium shadow-sm border-0"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{ background: 'white' }}
                  />
                </div>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-inline-flex align-items-center px-4 py-2 bg-primary bg-opacity-10 text-primary rounded-pill border border-primary border-opacity-20 fw-bold small">
                  <span className="me-2">📅</span> {slots.length} Slots Available
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
              <p className="mt-4 text-muted fw-bold animate-pulse">Syncing available slots...</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="glass-card p-5 text-center border-0 shadow-lg animate-reveal" style={{ borderRadius: '24px' }}>
              <div className="fs-1 mb-3">🌙</div>
              <h4 className="fw-bold">No Slots Available</h4>
              <p className="text-muted mb-0">Try exploring another date to find your perfect session.</p>
            </div>
          ) : (
            <div className="row g-3">
              {slots.map((slot, index) => (
                <SlotCard key={slot.id} slot={slot} onBook={handleBook} booking={booking} />
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4 animate-reveal stagger-1">
          <div className="sticky-top" style={{ top: '120px' }}>
            <div className="glass-card p-4 border-0 shadow-2xl" style={{ borderRadius: '28px' }}>
              <h5 className="fw-bold mb-4 tracking-tight">Booking Summary</h5>
              <div className="space-y-4 mb-5">
                <div className="p-3 bg-white bg-opacity-50 rounded-4 border border-white">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted fw-bold">Duration</small>
                    <small className="fw-bold text-primary">30 Minutes</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted fw-bold">Type</small>
                    <small className="fw-bold text-primary">Video/Clinic</small>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold mb-3 small text-uppercase tracking-widest text-muted">Platform Policies</h6>
              <ul className="list-unstyled mb-5">
                <li className="d-flex mb-3 align-items-start">
                  <span className="me-3 text-success fs-5">✦</span>
                  <span className="small text-muted fw-medium">Flexible rescheduling up to 12 hours prior to your session.</span>
                </li>
                <li className="d-flex mb-3 align-items-start">
                  <span className="me-3 text-success fs-5">✦</span>
                  <span className="small text-muted fw-medium">Secure, encrypted mock payment gateway for demo reliability.</span>
                </li>
                <li className="d-flex align-items-start">
                  <span className="me-3 text-success fs-5">✦</span>
                  <span className="small text-muted fw-medium">Instant digital confirmation and invoice generation.</span>
                </li>
              </ul>
              
              <div className="bg-slate-900 text-white p-4 rounded-4 shadow-xl">
                <div className="small opacity-75 mb-1 fw-bold tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>ASSISTANCE</div>
                <div className="fw-bold">support@physiobook.pro</div>
                <div className="small opacity-50 mt-1">24/7 Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
