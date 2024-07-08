import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
const Signup = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    error: "",
    success: false,
  });

  const { name, email, password, phone, error, success } = values;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false });
    signup({ name, email, password, phone })
      .then((data) => {
        console.log("DATA", data);
        if (data.email === email) {
          setvalues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {
          setvalues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Successfully created
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form>
              <div className="form-group">
                <label className="text-light">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={handleChange("name")}
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={handleChange("email")}
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <label className="text-light">password</label>
                <input
                  className="form-control"
                  value={password}
                  onChange={handleChange("password")}
                  type="password"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Phone Number</label>
                <input
                  className="form-control"
                  value={phone}
                  onChange={handleChange("phone")}
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <br />
              <button
                onClick={onSubmit}
                className="btn btn-success btn-block"
                style={{ width: "100%" }}
              >
                Submit
              </button>
              <br />
              <br />
              <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                  <p className="text-light">
                    Already have an account? <Link to="/signin">Login here</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <br />
      <br />
      <br />
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
      <br />
      <br />
      <br />
    </>
  );
};

export default Signup;
