import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar } from "primereact/calendar";
import utc from "dayjs/plugin/utc";
import { Dropdown } from "primereact/dropdown";
import { CSVLink } from "react-csv";
import useMobileSize from "../../utils/useWindowSize";
import "./EventsExplorer.css";
import { getAverage, getMax, getMin, getSum } from "../../utils/math";
import axiosInstance from "../../utils/httpClient";

dayjs.extend(utc);

export type EventsExplorerProps = {
  name: string;
  endpoint: string;
  chartType: "line" | "bar" | "table";
  filters: {
    dateFrom: boolean;
    dateTo: boolean;
    interval: boolean;
    type: boolean;
    pathname: boolean;
    fingerprint: boolean;
    os: boolean;
  };
};

export type Events = {
  data: number[];
  labels: string[];
};

const intervals: string[] = ["minute", "hour", "day", "week", "month", "year"];
const possibleOs: string[] = ["all", "android", "ios"];

export default function EventsExplorer({
  name,
  filters,
  endpoint,
  chartType,
}: EventsExplorerProps) {
  const [events, setEvents] = useState<Events>({ data: [], labels: [] });
  const [dateFrom, setDateFrom] = useState<Date>(
    dayjs().utc().subtract(14, "day").toDate()
  );
  const [dateTo, setDateTo] = useState<Date>(dayjs().utc().toDate());
  const [interval, setInterval] = useState<
    "minute" | "hour" | "day" | "week" | "month" | "year"
  >("day");
  const [os, setOs] = useState<"all" | "android" | "ios">("all");
  const isMobile = useMobileSize();

  const handleFetch = () => {
    let url = endpoint;
    if (filters.dateFrom) {
      url += `?dateFrom=${dayjs(dateFrom).utc().format("YYYY-MM-DDTHH:mm:ss")}`;
    }

    if (filters.dateTo) {
      url += `&dateTo=${dayjs(dateTo).utc().format("YYYY-MM-DDTHH:mm:ss")}`;
    }

    if (filters.interval) {
      url += `&interval=${interval}`;
    }

    if (filters.os) {
      url += `&os=${os}`;
    }

    axiosInstance
      .get(url)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const getCSV = () => {
    const csvData = [];

    for (let i = 0; i < events.labels.length; i++) {
      csvData.push({
        label: events.labels[i],
        value: events.data[i],
      });
    }

    return csvData;
  };

  return (
    <div>
      <h3>{name}</h3>
      <div className="card">
        <div className="card-header">
          <div className="d-flex w-100 justify-content-end">
            {filters.dateFrom && (
              <div className="pe-1 d-flex align-items-center">
                <label
                  className="small me-1 d-none d-sm-block"
                  htmlFor="dateFrom"
                >
                  From:
                </label>
                <Calendar
                  placeholder="Select"
                  value={dateFrom}
                  required
                  selectionMode="single"
                  showTime
                  hourFormat="24"
                  dateFormat="yy-mm-dd"
                  onChange={(e) => setDateFrom(dayjs(e.value as Date).toDate())}
                />
              </div>
            )}
            {filters.dateTo && (
              <div className="pe-1 d-flex align-items-center">
                <label
                  className="small me-1 d-none d-sm-block"
                  htmlFor="dateTo"
                >
                  To:
                </label>
                <Calendar
                  placeholder="Select"
                  value={dateTo}
                  required
                  selectionMode="single"
                  showTime
                  hourFormat="24"
                  dateFormat="yy-mm-dd"
                  onChange={(e) => setDateTo(dayjs(e.value as Date).toDate())}
                />
              </div>
            )}
            {filters.interval && (
              <div className="pe-1 d-flex align-items-center">
                <label
                  className="small me-1 d-none d-sm-block"
                  htmlFor="interval"
                >
                  Interval:
                </label>
                <Dropdown
                  value={interval}
                  options={intervals}
                  onChange={(e) => setInterval(e.target.value)}
                />
              </div>
            )}
            {filters.os && (
              <div className="pe-1 d-flex align-items-center">
                <label
                  className="small me-1 d-none d-sm-block"
                  htmlFor="interval"
                >
                  OS:
                </label>
                <Dropdown
                  value={os}
                  options={possibleOs}
                  onChange={(e) => setOs(e.target.value)}
                />
              </div>
            )}
            <button
              className="btn btn-light btn-sm d-flex align-items-center"
              type="button"
              onClick={handleFetch}
            >
              <i className="ri-refresh-line me-1" /> Fetch
            </button>
          </div>
        </div>
        <div className="card-body">
          <div>
            {events && chartType === "table" && (
              <div style={{ maxHeight: "400px", overflow: "auto" }}>
                <table className="table small table-striped table-bordered table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.labels.map((label, index) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{events.data[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {events && (chartType === "line" || chartType === "bar") && (
              <Chart
                type={chartType}
                data={{
                  datasets: [
                    {
                      fill: true,
                      data: events.data,
                    },
                  ],
                  labels: events.labels,
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                      mode: "index",
                    },
                  },
                }}
                height={isMobile ? 150 : 75}
              />
            )}
          </div>
        </div>
        <div className="card-footer">
          {events && (
            <div className="d-flex justify-content-between small align-items-center">
              <div>
                <CSVLink
                  data={getCSV()}
                  filename={`${name.replaceAll(" ", "_")}_${dayjs().format(
                    "YYYY_MM_DD_HH_mm_ss"
                  )}`}
                >
                  <button
                    className="btn btn-light btn-sm d-flex align-items-center"
                    type="button"
                  >
                    <i className="ri-download-line me-1" /> Export
                  </button>
                </CSVLink>
              </div>
              <div>
                Max: {getMax(events.data)} | Min: {getMin(events.data)} | Sum:{" "}
                {getSum(events.data)} | Average:{" "}
                {getAverage(events.data).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
