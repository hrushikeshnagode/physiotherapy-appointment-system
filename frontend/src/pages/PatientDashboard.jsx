import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import PhysioCard from '../components/PhysioCard';

function PatientDashboard() {
  const [physios, setPhysios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhysios = async () => {
      try {
        const res = await API.get('/physiotherapists');
        setPhysios(res.data);
      } catch (err) {
        console.error('Error fetching physiotherapists:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhysios();
  }, []);

  return (
    <div className="container py-5 animate-fade-in">
      <div className="mb-5">
        <h2 className="fw-bold tracking-tight mb-1">Available Physiotherapists</h2>
        <p className="text-muted mb-0">Discover top-rated specialists and book your session</p>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : physios.length === 0 ? (
        <div className="alert alert-info">No physiotherapists available at the moment.</div>
      ) : (
        <div className="row">
          {physios.map((p) => (
            <PhysioCard key={p.userId} physio={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
