import React, { useState } from "react";
import { authenticate, isAuthenticated, signin, signup } from "../auth/helper";
import { Link, Navigate } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
    isSignup: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
    isSignup,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

  
    if ((isSignup && !name) || !email || !password) {
      setValues({ ...values, error: "All fields are required", loading: false });
      return;
    }

    if (isSignup) {
      signup({ name, email, password })
        .then((data) => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        })
        .catch((error) => {
          setValues({
            ...values,
            error: error.message,
            loading: false,
            success: false,
          });
        });
    } else {
      signin({ email, password })
        .then((data) => {
          if (data.token) {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
                success: true,
              });
            });
          } else {
            setValues({
              ...values,
              error: data.error,
              loading: false,
              success: false,
            });
          }
        })
        .catch((error) => {
          setValues({
            ...values,
            error: error.message,
            loading: false,
            success: false,
          });
        });
    }
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  const successMessage = () => (
    success && (
      <div className="alert alert-success">
        <h2>{isSignup ? "Signup successful!" : "Signin successful!"}</h2>
      </div>
    )
  );

  const errorMessage = () => (
    error && (
      <div className="alert alert-danger">
        <h2>{error}</h2>
      </div>
    )
  );

  const form = () => (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form>
            {isSignup && (
              <div className="form-group">
                <label className="text-light">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={handleChange("name")}
                  type="text"
                />
              </div>
            )}
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <br />
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {form()}
      {performRedirect()}
      <br />
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <p className="text-light">
            {isSignup
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to="#"
              onClick={() =>
                setValues({ ...values, isSignup: !isSignup, error: "", success: false })
              }
            >
              {isSignup ? "Please Signin" : "Please Signup"}
            </Link>.
          </p>
        </div>
      </div>
      {/* <p className="text-center">{JSON.stringify(values)}</p> */}
    </>
  );
};

export default Signin;
