function SlotCard({ slot, onBook, booking }) {
  const formatTime = (time) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3 animate-reveal">
      <div 
        className={`glass-card p-3 text-center border-0 shadow-md ${booking ? 'opacity-50' : 'cursor-pointer'}`}
        style={{ 
          cursor: booking ? 'default' : 'pointer',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '18px'
        }}
        onClick={() => !booking && onBook(slot)}
      >
        <div className="fw-extrabold fs-5 text-slate-900 mb-1">
          {formatTime(slot.startTime)}
        </div>
        <div className="text-muted small fw-bold tracking-tight opacity-75">
          {formatTime(slot.endTime)}
        </div>
        <div className="mt-3">
          <span className={`btn btn-sm rounded-pill px-3 w-100 fw-bold transition-smooth ${booking ? 'btn-light' : 'btn-primary shadow-sm'}`}>
            {booking ? 'Processing...' : 'Select'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SlotCard;
