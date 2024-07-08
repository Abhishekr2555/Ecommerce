import React, { useState } from "react";
import { contact } from "../auth/helper";

const Contact = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = value;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    contact(value);
    console.log(value);
  };

  return (
    <>
      <div className="container contact-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <h2 className="h1-responsive font-weight-bold text-center my-4 contact-text">
              Contact Us
            </h2>
            <p className="text-center w-responsive mx-auto mb-5 contact-text">
              Do you have any questions? Please feel free to get in touch with
              us. Our team will be happy to assist you.
            </p>
            <form id="contact">
              <div className="form-group">
                <label className="text-light">Your Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label className="text-light">Your Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label className="text-light">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  value={message}
                  onChange={handleChange}
                  name="message"
                />
              </div>
              <br />
              <button className="btn btn-success btn-block" onClick={onSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Contact;
