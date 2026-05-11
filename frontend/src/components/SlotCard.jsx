function SlotCard({ slot, onBook, booking }) {
  const formatTime = (time) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3 animate-fade-in">
      <div 
        className={`glass-card p-3 text-center transition-all ${booking ? 'opacity-50' : 'cursor-pointer'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => !booking && onBook(slot)}
      >
        <div className="fw-bold fs-5 text-primary mb-1">
          {formatTime(slot.startTime)}
        </div>
        <div className="text-muted small fw-medium">
          to {formatTime(slot.endTime)}
        </div>
        <div className="mt-3">
          <span className="btn btn-outline-primary btn-sm rounded-pill px-3 w-100 fw-semibold">
            {booking ? '...' : 'Select'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SlotCard;
