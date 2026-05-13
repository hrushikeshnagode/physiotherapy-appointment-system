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
    <div className="container py-5">
      {/* Premium Hero Section */}
      <div className="row justify-content-center mb-5 animate-reveal">
        <div className="col-lg-8 text-center">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-bold tracking-wider" style={{ fontSize: '0.75rem' }}>
            ✨ DISCOVER TOP SPECIALISTS
          </span>
          <h1 className="display-4 fw-extrabold tracking-tight mb-3">
            Your Path to <span className="heading-gradient">Recovery</span> Starts Here
          </h1>
          <p className="lead text-muted px-lg-5">
            Connect with world-class physiotherapists. Book personalized sessions and track your rehabilitation journey with elite care.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="mt-3 text-muted fw-medium animate-pulse">Curating specialists for you...</p>
        </div>
      ) : physios.length === 0 ? (
        <div className="glass-card p-5 text-center animate-reveal">
          <div className="fs-1 mb-3">🔍</div>
          <h4 className="fw-bold">No Specialists Found</h4>
          <p className="text-muted">We couldn't find any physiotherapists matching your criteria. Please check back later.</p>
        </div>
      ) : (
        <div className="row">
          {physios.map((p, index) => (
            <PhysioCard key={p.userId} physio={p} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
