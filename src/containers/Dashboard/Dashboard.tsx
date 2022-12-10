import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import EventsExplorer from "../../components/EventsExplorer/EventsExplorer";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import axiosInstance from "../../utils/httpClient";
import { SessionsActionType } from "../../reducers/sessions/actions";

export default function Dashboard() {
  const sessions = useAppSelector((state) => state.sessions);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [summary, setSummary] = useState({
    events: 0,
    online: 0,
    unique: 0,
  });

  useEffect(() => {
    if (!sessions.token) {
      navigate("/login");
    }
  }, [sessions]);

  const getSummary = async () => {
    axiosInstance
      .get("/events/summary")
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    getSummary();

    const interval = setInterval(() => {
      getSummary();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch({
      type: SessionsActionType.Logout,
    });
  };

  return (
    <div className="container-fluid bg-light d-flex flex-column pt-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Navigation onLogout={handleLogout} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <h1>Instant Insights Dashboard</h1>
            </div>
            <Summary
              // isLive
              events={summary.events}
              online={summary.online}
              unique={summary.unique}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="line"
              name="Users activity"
              endpoint="/events/activity"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: true,
                type: false,
                pathname: false,
                fingerprint: false,
                os: true,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="bar"
              name="Events count"
              endpoint="/events/count"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: true,
                type: false,
                pathname: false,
                fingerprint: false,
                os: true,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <EventsExplorer
              chartType="table"
              name="Pathnames"
              endpoint="/events/pathnames"
              filters={{
                dateFrom: true,
                dateTo: true,
                interval: false,
                type: false,
                pathname: false,
                fingerprint: false,
                os: true,
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
