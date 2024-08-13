import { useState } from "react";
import "../styles/Education.css";

export default function Education({ onSubmit }) {
  const [educations, setEducations] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    study: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    setCurrentEducation({
      ...currentEducation,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    setEducations([...educations, currentEducation]);
    setCurrentEducation({
      school: "",
      study: "",
      start: "",
      end: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(educations);
  };

  const handleEdit = (index) => {
    setCurrentEducation(educations[index]);
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="education-section">
      <h2>Education</h2>
      <form onSubmit={handleAddEducation}>
        <input
          type="text"
          name="school"
          value={currentEducation.school}
          onChange={handleChange}
          placeholder="School Name"
          required
        />
        <input
          type="text"
          name="study"
          value={currentEducation.study}
          onChange={handleChange}
          placeholder="Field of Study"
          required
        />
        <input
          type="date"
          name="start"
          value={currentEducation.start}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="end"
          value={currentEducation.end}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Education</button>
      </form>

      <div className="educations-list">
        {educations.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.school}</h3>
            <p>
              <strong>Field of Study:</strong> {edu.study}
            </p>
            <p>
              <strong>Period:</strong> {edu.start} to {edu.end}
            </p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>

      {educations.length > 0 && (
        <button onClick={handleSubmit} className="submit-all">
          Submit All Education
        </button>
      )}
    </div>
  );
}
