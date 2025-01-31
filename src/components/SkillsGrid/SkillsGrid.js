// SkillsGrid.js
import React from 'react';
import './SkillsGrid.css';

const skills = [
  { name: 'Java / Kotlin', icon: 'https://i.imgur.com/NpZevhW.png' },
  { name: 'Swift', icon: 'https://i.imgur.com/a4r5FvH.png' },
  { name: 'React', icon: 'https://i.imgur.com/0HndydQ.png' },
  { name: 'JavaScript', icon: 'https://i.imgur.com/6C3pG6T.png' },
  { name: 'MySQL', icon: 'https://i.imgur.com/7dW5pOt.png' },
  { name: 'HTML', icon: 'https://i.imgur.com/3h5isOQ.png' },
  { name: 'CSS', icon: 'https://i.imgur.com/zSYOxMt.png' },
  { name: 'Git', icon: 'https://i.imgur.com/BPMpg2y.png' },
  { name: 'Node.js', icon: 'https://i.imgur.com/bmiIJE5.png' },
];

const SkillsGrid = () => {
  return (
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div className="skill-container" key={index}>
          <img className="skill-icon" src={skill.icon} alt={`${skill.name} logo`} />
          <div className="skill-name">{skill.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
