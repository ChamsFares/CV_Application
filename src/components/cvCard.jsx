import Education from "./Education";
import GeneralInfo from "./GeneralInfo";
import Experience from "./Experience";
import Skill from "./Skill";
import { useState, useRef } from "react";
import "../styles/cv.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CV() {
  const [generalInfo, setGeneralInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [skills, setSkill] = useState(null);
  const cvRef = useRef(null);

  const downloadCV = () => {
    const input = cvRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("cv.pdf");
    });
  };

  return (
    <div className="cv-container">
      <h1>CV Builder</h1>
      <div className="cv-form">
        <GeneralInfo onSubmit={setGeneralInfo} />
        <Education onSubmit={setEducation} />
        <Experience onSubmit={setExperience} />
        <Skill onSubmit={setSkill} />
      </div>
      {generalInfo && education && experience && skills && (
        <>
          <div className="cv-preview" ref={cvRef}>
            <div className="cv-card">
              <h2>Personal Information</h2>
              <p>
                <strong>Name:</strong> {generalInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {generalInfo.email}
              </p>
              <p>
                <strong>Phone:</strong> {generalInfo.phone}
              </p>
            </div>
            <div className="cv-card">
              <h2>Education</h2>
              {education.map((edu, index) => (
                <div key={index}>
                  <p>
                    <strong>{edu.school}</strong>
                  </p>
                  <p>{edu.study}</p>
                  <p>
                    {edu.start} - {edu.end}
                  </p>
                </div>
              ))}
            </div>
            <div className="cv-card">
              <h2>Experience</h2>
              {experience.map((exp, index) => (
                <div key={index}>
                  <p>
                    <strong>{exp.company}</strong>
                  </p>
                  <p>{exp.position}</p>
                  <p>{exp.responsibilities}</p>
                  <p>
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
              ))}
            </div>
            <div className="cv-card">
              <h2>Skills</h2>
              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={downloadCV} className="download-btn">
            Download CV
          </button>
        </>
      )}
    </div>
  );
}
