type NavigationProps = {
  onLogout: () => void;
};

export default function Navigation({ onLogout }: NavigationProps) {
  return (
    <div className="d-flex justify-content-end small">
      <div
        onClick={onLogout}
        className="text-secondary d-flex align-items-center cursor-pointer"
      >
        <i className="ri-logout-box-line me-1" /> Logout
      </div>
    </div>
  );
}
