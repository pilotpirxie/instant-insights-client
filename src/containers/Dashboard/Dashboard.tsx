export default function Dashboard() {
  return (
    <div className="container-fluid bg-light h-100 d-flex flex-column">
      <div className="container">
        <div className="row">
          <div className="col-12 pt-3">
            <h1>Instant Insights Dashboard</h1>
          </div>
          <div className="col-12">
            <div className="card card-body bg-dark text-light">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div>
                    <i className="ri-checkbox-blank-circle-fill text-success" />{" "}
                    Online Users
                  </div>
                  <h2>1,200</h2>
                  <div className="small">in the last 5 minutes</div>
                </div>
                <div className="col-12 col-md-4">
                  <div>View events</div>
                  <h2>49,190</h2>
                  <div className="small">in the last 24 hours</div>
                </div>
                <div className="col-12 col-md-4">
                  <div>All events</div>
                  <h2>49,190</h2>
                  <div className="small">in the last 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
