'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './Experience.module.css';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'ml' | 'data' | 'web';
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Bitoro Labs',
    role: 'Senior  Software Engineer',
    location: 'Remote',
    startDate: '2024',
    endDate: 'Present',
    type: 'ml',
    highlights: [
      'Led development of scalable backend systems in Python and Go for payroll and HR management',
      'Designed RESTful and GraphQL APIs and served ML inference requests with OAuth2/JWT security',
      'Migrated datasets to AWS S3 and Azure Data Lake; implemented ETL with Databricks and Glue',
      'Containerized services and orchestrated on EKS/AKS with Helm for zero-downtime deployments',
    ],
  },
  {
    company: 'Freelance (Self-employed)',
    role: 'Data Scientist / ML Engineer',
    location: 'Remote',
    startDate: '01/2020',
    endDate: '04/2024',
    type: 'data',
    highlights: [
      'Integrated TensorFlow and PyTorch models into payment workflows to reduce fraud false positives',
      'Built real-time dashboards (Angular/React) to visualize transaction anomaly scores',
      'Automated ML deployments with Docker, Kubernetes, and Seldon Core on AWS EKS',
      'Instrumented services with OpenTelemetry; centralized logs and configured Grafana alerts',
    ],
  },
  {
    company: 'Upwork',
    role: 'Freelance Web Developer',
    location: 'Remote',
    startDate: '07/2014',
    endDate: '12/2019',
    type: 'web',
    highlights: [
      'Developed responsive frontend applications with React, Angular and TypeScript',
      'Translated UX/UI designs into production interfaces and reusable component libraries',
      'Supported backend integrations with Node.js and Python and CI/CD workflows',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(experiences.length).fill(false));

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

  useEffect(() => {
    if (!isVisible) return;

    experiences.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => {
          const newItems = [...prev];
          newItems[idx] = true;
          return newItems;
        });
      }, idx * 150);

      return () => clearTimeout(timer);
    });
  }, [isVisible]);

  const typeColors: Record<string, string> = {
    ml: 'var(--accent-gold)',
    data: 'var(--accent-blue)',
    web: 'var(--success)'
  };

  return (
    <section id="experience" ref={sectionRef} className={`${styles.experience} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <h2 className="section-title">Experience Timeline</h2>

        <div className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`${styles.timelineItem} ${visibleItems[idx] ? styles.visible : ''}`}
            >
              <div className={styles.timelineMarker}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: typeColors[exp.type] }}
                ></div>
              </div>

              <div className={styles.content}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <span className={styles.date}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>

                <p className={styles.location}>📍 {exp.location}</p>

                <ul className={styles.highlights}>
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>

                <span
                  className={styles.badge}
                  style={{ borderColor: typeColors[exp.type], color: typeColors[exp.type] }}
                >
                  {exp.type === 'ml' ? 'AI/ML' : exp.type === 'data' ? 'Data/ML' : 'Web'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
