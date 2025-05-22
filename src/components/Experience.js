import React, { useState, useEffect } from "react";
import ExperienceForm from "./ExperienceForm";
import { addExperience, getExperiences } from "../services/resumeService";

const Experience = () => {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch experiences on component mount
  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
        // Don't show error on initial load to avoid confusing the user
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleAddExperience = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const handleSubmitExperience = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await addExperience(formData);
      
      // Add the new experience with its ID to the list
      const newExperience = {
        id: data.id,
        ...formData
      };
      
      setExperiences([...experiences, newExperience]);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add experience:", err);
      setError("Failed to add experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showForm ? (
        <ExperienceForm 
          onSubmit={handleSubmitExperience} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p className="errorText">{error}</p>}
          
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="experienceItem">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p className="date">{exp.start_date} - {exp.end_date}</p>
                <p>{exp.description}</p>
                {exp.logo && <img src={exp.logo} alt={`${exp.company} logo`} className="companyLogo" />}
              </div>
            ))
          ) : (
            <p>Experience Placeholder</p>
          )}
          
          <button onClick={handleAddExperience}>Add Experience</button>
        </div>
      )}
    </div>
  );
};

export default Experience;
