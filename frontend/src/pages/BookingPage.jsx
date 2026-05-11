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
      await new Promise((resolve) => setTimeout(resolve, 1200));

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
    <div className="container py-5 animate-fade-in">
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <Link to="/patient/dashboard" className="btn btn-light rounded-circle me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              ←
            </Link>
            <div>
              <h2 className="fw-bold tracking-tight mb-0">Select a Time Slot</h2>
              <p className="text-muted mb-0">Choose an available time that works for you</p>
            </div>
          </div>

          {message && (
            <div className={`alert alert-${msgType} border-0 rounded-4 shadow-sm py-3 mb-4 animate-fade-in`}>
              <div className="d-flex align-items-center">
                <span className="me-3 fs-4">{msgType === 'success' ? '✅' : '⚠️'}</span>
                <div>
                  <div className="fw-bold">{msgType === 'success' ? 'Success!' : 'Oops!'}</div>
                  <div className="small">{message}</div>
                </div>
              </div>
            </div>
          )}

          <div className="glass-card p-4 mb-4">
            <div className="row align-items-center g-3">
              <div className="col-md-5">
                <label className="form-label fw-bold small text-muted text-uppercase mb-2">Consultation Date</label>
                <input
                  type="date"
                  className="form-control form-control-premium"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="col-md-7 text-md-end pt-md-4">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                  {slots.length} Slots Available Today
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3 text-muted">Checking availability...</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="glass-card p-5 text-center bg-white bg-opacity-50">
              <div className="fs-1 mb-3">📅</div>
              <h5 className="fw-bold">No slots found</h5>
              <p className="text-muted">Try selecting a different date for your consultation.</p>
            </div>
          ) : (
            <div className="row">
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} onBook={handleBook} booking={booking} />
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4">Booking Policy</h5>
            <ul className="list-unstyled mb-4">
              <li className="d-flex mb-3">
                <span className="me-2 text-primary">✓</span>
                <span className="small text-muted">Free cancellation up to 24 hours before the appointment.</span>
              </li>
              <li className="d-flex mb-3">
                <span className="me-2 text-primary">✓</span>
                <span className="small text-muted">Payments are processed securely via mock gateway.</span>
              </li>
              <li className="d-flex">
                <span className="me-2 text-primary">✓</span>
                <span className="small text-muted">Digital confirmation will be sent to your dashboard.</span>
              </li>
            </ul>
            <div className="bg-light p-3 rounded-4 border">
              <div className="small text-muted mb-1">Need help?</div>
              <div className="fw-bold text-primary">support@physiobook.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
