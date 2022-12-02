import dayjs from "dayjs";
import packageJson from "../../package.json";

export default function Footer() {
  return (
    <div className="flex-column my-5 small text-secondary text-center">
      <div>Instant Insights Dashboard &copy; {dayjs().format("YYYY")}</div>
      <div>v{packageJson.version}</div>
      <a
        href="https://github.com/pilotpirxie/instant-insights-client"
        target="_blank"
        rel="noreferrer"
        className="text-secondary"
      >
        <i className="ri-github-fill fs-3" />
      </a>
    </div>
  );
}
