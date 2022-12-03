import "./Dashboard.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import EventsExplorer from "../../components/EventsExplorer/EventsExplorer";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { useAppSelector } from "../../utils/reduxHooks";

export default function Dashboard() {
  const sessions = useAppSelector((state) => state.sessions);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessions.token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container-fluid bg-light d-flex flex-column pt-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Navigation />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <h1>Instant Insights Dashboard</h1>
            </div>
            <Summary isLive events={42192} online={9391} unique={7929292} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="line"
              name="Users activity"
              endpoint="/api/activity"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: true,
                type: false,
                pathname: false,
                fingerprint: false,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="bar"
              name="Events count"
              endpoint="/api/views"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: true,
                type: false,
                pathname: false,
                fingerprint: false,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="table"
              name="Pathnames"
              endpoint="/api/pathnames"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: true,
                type: false,
                pathname: false,
                fingerprint: false,
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
