import { useState } from "react";
import "../styles/Skill.css";

export default function Skill({ onSubmit }) {
  const [isEditing, setIsEditing] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onSubmit(skills);
  };

  return (
    <div className="section skills">
      <h2>Skills</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="skill-input">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill"
            />
            <button type="button" onClick={handleAddSkill}>
              Add Skill
            </button>
          </div>
          <ul className="skill-list">
            {skills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {skills.length > 0 && <button type="submit">Submit Skills</button>}
        </form>
      ) : (
        <div className="info-display">
          <ul className="skill-list">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>Edit Skills</button>
        </div>
      )}
    </div>
  );
}
