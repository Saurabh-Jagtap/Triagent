export default function Stats() {
  return (
    <div className="stats-strip">
      <div className="stats-inner">
        <div className="stat">
          <div className="stat-n" id="statA">
            0h
          </div>
          <div className="stat-l">
            saved per week on average
          </div>
        </div>

        <div className="stat">
          <div className="stat-n" id="statB">
            0%
          </div>
          <div className="stat-l">
            inbox triage accuracy
          </div>
        </div>

        <div className="stat">
          <div className="stat-n" id="statC">
            0s
          </div>
          <div className="stat-l">
            to connect Gmail + Calendar
          </div>
        </div>
      </div>
    </div>
  );
}