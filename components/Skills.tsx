'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Skills.module.css';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    description: string;
  }>;
}

const skillsData: Record<string, SkillCategory> = {
  core: {
    name: 'Core Languages',
    skills: [
      { name: 'Python', description: 'FastAPI, Django, Flask, data engineering' },
      { name: 'Go', description: 'High-performance backend services' },
      { name: 'PHP', description: 'High-performance backend services' },
      { name: 'TypeScript', description: 'Type-safe frontend and backend' },
      { name: 'JavaScript', description: 'Flexible application logic and tooling' },
      { name: 'Node', description: 'Scripting ' },
    ],
  },
  backend: {
    name: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', description: 'Scalable Python APIs' },
      { name: 'Django', description: 'Batteries-included web frameworks' },
      { name: 'Flask', description: 'Lightweight Python services' },
      { name: 'Node.js', description: 'JavaScript backend services' },
      { name: 'Java', description: 'Backend services' },
      { name: 'Golang', description: 'Backend services' },
      { name: 'GraphQL', description: 'Flexible API schemas' },
      { name: 'Microservices', description: 'Distributed service architectures' },
    ],
  },
  data: {
    name: 'Databases & Data',
    skills: [
      { name: 'PostgreSQL', description: 'Relational schema design and optimization' },
      { name: 'MySQL', description: 'OLTP databases and indexing' },
      { name: 'MongoDB', description: 'Flexible document stores' },
      { name: 'Redis', description: 'Caching and real-time state' },
      { name: 'Firebase', description: 'Realtime apps and auth' },
    ],
  },
  frontend: {
    name: 'Frontend',
    skills: [
      { name: 'React', description: 'Responsive UIs and state management' },
      { name: 'Next.js', description: 'Server-rendered React apps' },
      { name: 'Redux Toolkit', description: 'State management patterns' },
      { name: 'Angular', description: 'Enterprise SPAs (2+)' },
      { name: 'Vue / Nuxt', description: 'Progressive frontend frameworks' },
      { name: 'HTML/CSS/Sass', description: 'Accessible markup and styling' },
    ],
  },
  cloud: {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', description: 'S3, EKS, Lambda, Glue' },
      { name: 'GCP', description: 'Cloud-native services' },
      { name: 'Azure', description: 'Data Lake and Databricks' },
      { name: 'Docker', description: 'Containerization and images' },
      { name: 'CI/CD', description: 'Jenkins, GitLab CI, GitHub Actions' },
    ],
  },
  tools: {
    name: 'Tools & Testing',
    skills: [
      { name: 'Jest', description: 'Unit testing' },
      { name: 'Mocha', description: 'Testing utilities' },
      { name: 'Cypress', description: 'End-to-end testing' },
      { name: 'OpenTelemetry', description: 'Instrumentation and observability' },
      { name: 'Apache Arrow', description: 'High-performance ETL serialization' },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('blockchain');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={`${styles.skills} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-title">Skills & Tooling</h2>
          <p className={styles.subtitle}>Production-grade expertise across blockchain, full-stack, and DevOps.</p>
        </div>

        <div className={styles.tabs}>
          {Object.entries(skillsData).map(([key, category]) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {Object.entries(skillsData).map(([key, category]) => (
            <div
              key={key}
              className={`${styles.skillsGrid} ${activeTab === key ? styles.visible : ''}`}
            >
              {category.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={styles.skillCard}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    animation: activeTab === key ? `fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.05}s both` : 'none',
                  }}
                >
                  <div className={styles.skillPill}>{skill.name}</div>
                  <div className={`${styles.tooltip} ${hoveredSkill === skill.name ? styles.show : ''}`}>
                    {skill.description}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.highlights}>
          <h3>Key Proficiencies</h3>
          <div className={styles.highlightList}>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🔗</span>
              <span>Cross-chain protocol design and implementation</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>⚡</span>
              <span>Gas optimization and performance tuning</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🔒</span>
              <span>Security auditing and vulnerability detection</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>📊</span>
              <span>DeFi mechanics and AMM architecture</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🎨</span>
              <span>Full-stack dApp development and UX</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🚀</span>
              <span>Scaling solutions and layer 2 optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
