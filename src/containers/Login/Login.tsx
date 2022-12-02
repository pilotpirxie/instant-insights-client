import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { SessionsActionType } from "../../reducers/sessions/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state) => state.sessions);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Please enter email and password");
        return;
      }

      dispatch({
        type: SessionsActionType.Login,
        payload: {
          email,
          password,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (sessions.token) {
      navigate("/dashboard");
    } else {
      dispatch({ type: SessionsActionType.LoginFromLocalStorage });
    }
  }, []);

  return (
    <div className="container-fluid bg-light h-100 d-flex flex-column justify-content-center align-content-center">
      <div className="row">
        <div className="col-12 col-md-4 offset-md-4 col-xl-2 offset-xl-5">
          <form className="card shadow-sm card-body" onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="input-group mt-2 d-flex">
              <button className="btn btn-primary w-100" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
