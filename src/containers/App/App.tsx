import React from "react";

export default function App() {
  return (
    <div className="container-fluid bg-light h-100 d-flex flex-column justify-content-center align-content-center">
      <div className="row">
        <div className="col-12 col-md-4 offset-md-4 col-xl-2 offset-xl-5">
          <div className="card shadow-sm card-body">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>

            <label htmlFor="password" className="mt-2">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="input-group mt-2 d-flex">
              <button className="btn btn-primary w-100" type="button">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
