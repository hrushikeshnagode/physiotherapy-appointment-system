import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function PhysioDashboard() {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00', endTime: '17:00', intervalMinutes: 30
  });
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [fees, setFees] = useState('');
  const [feesMsg, setFeesMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createSlots = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await API.post('/physio/slots', {
        ...form, intervalMinutes: parseInt(form.intervalMinutes)
      });
      setSlots(res.data);
      setMsg(`✅ Success! ${res.data.length} slots are now live.`);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.error || 'Failed to create slots'));
    } finally {
      setLoading(false);
    }
  };

  const updateFees = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/physio/profile/fees', { fees: parseFloat(fees) });
      setFeesMsg('✅ ' + res.data.message);
    } catch (err) {
      setFeesMsg('❌ Failed to update fees');
    }
  };

  const fmt = (t) => {
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h2 className="fw-bold tracking-tight mb-1">Provider Dashboard</h2>
          <p className="text-muted mb-0">Manage your availability and practice details</p>
        </div>
        <Link to="/physio/appointments" className="btn btn-premium px-4">
          📅 Today's Schedule
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="glass-card p-4 p-lg-5">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-4 me-3 fs-4">⚡</div>
              <h4 className="fw-bold mb-0">Availability Generator</h4>
            </div>
            
            <p className="text-muted small mb-4">Select a date and timeframe to automatically generate 30-min booking slots for your patients.</p>

            <form onSubmit={createSlots}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Consultation Date</label>
                  <input type="date" className="form-control form-control-premium" name="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Session Interval</label>
                  <select className="form-select form-control-premium" name="intervalMinutes" value={form.intervalMinutes} onChange={handleChange}>
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">1 Hour</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Starting From</label>
                  <input type="time" className="form-control form-control-premium" name="startTime" value={form.startTime} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Ending At</label>
                  <input type="time" className="form-control form-control-premium" name="endTime" value={form.endTime} onChange={handleChange} required />
                </div>
              </div>
              
              <button type="submit" className="btn btn-premium w-100 py-3" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Publish Available Slots'}
              </button>
            </form>

            {msg && <div className={`alert ${msg.includes('✅') ? 'alert-success' : 'alert-danger'} border-0 rounded-4 mt-4 animate-fade-in`}>{msg}</div>}
            
            {slots.length > 0 && (
              <div className="mt-5 pt-4 border-top">
                <h6 className="fw-bold mb-3 text-uppercase small text-muted tracking-wider">Preview of Generated Slots:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {slots.map(s => (
                    <span key={s.id} className="badge bg-white text-primary border border-primary border-opacity-25 p-2 px-3 rounded-pill fw-medium">
                      {fmt(s.startTime)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="glass-card p-4 p-lg-5 mb-4">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-secondary bg-opacity-10 p-3 rounded-4 me-3 fs-4 text-secondary">💰</div>
              <h4 className="fw-bold mb-0">Financial Settings</h4>
            </div>
            
            <p className="text-muted small mb-4">Set your standard consultation fee. This will be visible to all patients during discovery.</p>

            <form onSubmit={updateFees}>
              <div className="mb-4">
                <label className="form-label fw-semibold small text-muted">New Consultation Fee (₹)</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-4 ps-3">₹</span>
                  <input type="number" className="form-control form-control-premium border-start-0 rounded-start-0" 
                    placeholder="e.g. 500" value={fees} onChange={(e) => setFees(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn btn-premium-outline w-100 py-3">Update Fee Structure</button>
            </form>
            {feesMsg && <div className="alert alert-info border-0 rounded-4 mt-4 small animate-fade-in">{feesMsg}</div>}
          </div>

          <div className="glass-card p-4 text-center border-primary border-opacity-10 bg-primary bg-opacity-5">
            <div className="fs-1 mb-2">📋</div>
            <h5 className="fw-bold">View Appointments</h5>
            <p className="text-muted small mb-4">Check your schedule and patient list for today.</p>
            <Link to="/physio/appointments" className="btn btn-premium w-100 py-3">Open Schedule</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysioDashboard;
