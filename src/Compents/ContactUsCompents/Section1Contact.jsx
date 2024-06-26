import React, { useState } from "react";
import "./Section1Contact.scss";
import useContact from "../../hooks/contact/useContact";

export default function Section1Contact() {
  const { success, error, submitContactForm } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed", error);
    }
  };
  return (
    <section className="col-12 section1Contact">
      <div className="container">
        <div className="row">
          <h1 className="H1">Contact us</h1>
        </div>
        <div className="row">
          <h4 className="H4" style={{ textAlign: "center" }}>
            We'd love to hear from you!
          </h4>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-6 left">
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="email" // Changed to "email" for email input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email</label>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="styled-input" style={{ float: "right" }}>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number</label>
              </div>
            </div>
          </div>
          <div className="col-6 left">
            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label>Message</label>
              </div>
            </div>
          </div>
          <div className="col-xs-12 btn-C">
            <button type="submit" className="btn-lrg submit-btn col-2">
              Send Message
            </button>
          </div>
          {success && (
            <div className="col-xs-12 success-message">
              Your message has been sent successfully!
            </div>
          )}
          {error && <div className="col-xs-12 error-message">{error}</div>}
        </form>
      </div>
    </section>
  );
}
