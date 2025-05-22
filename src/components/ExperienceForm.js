import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ExperienceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: ""
  });
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormData({
      ...formData,
      start_date: date ? format(date, "MMMM yyyy") : ""
    });
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormData({
      ...formData,
      end_date: date ? format(date, "MMMM yyyy") : ""
    });
  };
  
  const handleCurrentJobChange = (e) => {
    const isChecked = e.target.checked;
    setIsCurrentJob(isChecked);
    if (isChecked) {
      setEndDate(null);
      setFormData({
        ...formData,
        end_date: "Present"
      });
    } else {
      setFormData({
        ...formData,
        end_date: endDate ? format(endDate, "MMMM yyyy") : ""
      });
    }
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
          <DatePicker
            id="start_date"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            placeholderText="Select start date"
            className="datePicker"
            required
          />
        </div>
        
        <div className="formField">
          <label htmlFor="end_date">End Date:</label>
          <div className="endDateContainer">
            <DatePicker
              id="end_date"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              placeholderText="Select end date"
              className="datePicker"
              disabled={isCurrentJob}
            />
            <div className="currentJobCheckbox">
              <input
                type="checkbox"
                id="currentJob"
                checked={isCurrentJob}
                onChange={handleCurrentJobChange}
              />
              <label htmlFor="currentJob">I currently work here</label>
            </div>
          </div>
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
