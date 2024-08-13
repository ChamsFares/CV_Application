import { useState } from "react";
import "../styles/Experience.css";

export default function Experience({ onSubmit }) {
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setCurrentExperience({
      ...currentExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    setExperiences([...experiences, currentExperience]);
    setCurrentExperience({
      company: "",
      position: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(experiences);
  };

  const handleEdit = (index) => {
    setCurrentExperience(experiences[index]);
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="experience-section">
      <h2>Experience</h2>
      <form onSubmit={handleAddExperience}>
        <input
          type="text"
          name="company"
          value={currentExperience.company}
          onChange={handleChange}
          placeholder="Company name"
          required
        />
        <input
          type="text"
          name="position"
          value={currentExperience.position}
          onChange={handleChange}
          placeholder="Position Title"
          required
        />
        <textarea
          name="responsibilities"
          value={currentExperience.responsibilities}
          onChange={handleChange}
          placeholder="Main responsibilities"
          required
        ></textarea>
        <input
          type="date"
          name="startDate"
          value={currentExperience.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={currentExperience.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Experience</button>
      </form>

      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.company}</h3>
            <p>
              <strong>Position:</strong> {exp.position}
            </p>
            <p>
              <strong>Responsibilities:</strong> {exp.responsibilities}
            </p>
            <p>
              <strong>Period:</strong> {exp.startDate} to {exp.endDate}
            </p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>

      {experiences.length > 0 && (
        <button onClick={handleSubmit} className="submit-all">
          Submit All Experiences
        </button>
      )}
    </div>
  );
}
