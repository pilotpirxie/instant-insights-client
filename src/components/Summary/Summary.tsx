export type SummaryProps = {
  online: number;
  unique: number;
  events: number;
  // isLive: boolean;
};

export default function Summary({ unique, online, events }: SummaryProps) {
  return (
    <div className="card card-body bg-dark text-light">
      <div className="row">
        <div className="col-12 col-md-4">
          <div>
            <div className="d-flex">
              {/* {isLive ? ( */}
              {/*  <div className="badge bg-danger me-1 d-flex align-items-center"> */}
              {/*    <i className="ri-checkbox-blank-circle-fill me-1" /> Live{" "} */}
              {/*  </div> */}
              {/* ) : ( */}
              {/*  <div className="badge bg-secondary me-1 d-flex align-items-center"> */}
              {/*    <i className="ri-checkbox-blank-circle-fill me-1" /> Offline{" "} */}
              {/*  </div> */}
              {/* )} */}
              Online Users
            </div>
            <h2>{online.toLocaleString()}</h2>
            <div className="small">in the last 5 minutes</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div>
            <div>Unique users</div>
            <h2>{unique.toLocaleString()}</h2>
            <div className="small">in the last 24 hours</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div>
            <div>Events</div>
            <h2>{events.toLocaleString()}</h2>
            <div className="small">in the last 24 hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}
