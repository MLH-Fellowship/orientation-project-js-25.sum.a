import React, { useState } from "react";

const ExperienceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="formContainer">
      <h3>Add New Experience</h3>
      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="formField">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="formField">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="text"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            placeholder="e.g., January 2022"
            required
          />
        </div>
        
        <div className="formField">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="text"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            placeholder="e.g., Present or December 2023"
          />
        </div>
        
        <div className="formField">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="formField">
          <label htmlFor="logo">Logo URL:</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="URL to company logo image"
          />
        </div>
        
        <div className="formButtons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
