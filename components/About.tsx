'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './About.module.css';

export default function About() {
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
    <section id="about" ref={sectionRef} className={`${styles.about} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <h2 className="section-title">About & Value</h2>

        <div className={styles.content}>
          <div className={styles.narrative}>
            <p>
              Senior Full-Stack Engineer with 10+ years of experience building production-grade applications with
              Python (FastAPI, Django, Flask), PyTorch, and modern JavaScript (React, TypeScript). I deliver
              end-to-end features across backend services, REST/GraphQL APIs, front-end interfaces, relational
              databases, CI/CD workflows, and cloud-native environments (AWS, Azure, GCP).
            </p>
            <p>
              I design scalable FastAPI services, build responsive React UIs, optimize PostgreSQL/MySQL schemas,
              and implement unit, integration, and performance tests to ensure reliability. I also integrate
              AI/LLM-driven features, embeddings, and ML inference services powered by PyTorch.
            </p>
            <p>
              Comfortable owning functionality across the full SDLC — architecture, development, testing,
              deployment, and production support in enterprise and remote team contexts.
            </p>
          </div>

          <div className={styles.facts}>
            <div className={styles.factItem}>
              <div className={styles.factLabel}>Location</div>
              <div className={styles.factValue}>(Remote)</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Experience</div>
              <div className={styles.factValue}>10+ years</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Primary Focus</div>
              <div className={styles.factValue}>Full-Stack & ML/AI</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Databases</div>
              <div className={styles.factValue}>PostgreSQL, MySQL, MongoDB</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Cloud</div>
              <div className={styles.factValue}>AWS, Azure, GCP</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Open To</div>
              <div className={styles.factValue}>Collaboration & Contract Roles</div>
            </div>
          </div>
        </div>

        <div className={styles.values}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🔒</div>
            <h3>Security First</h3>
            <p>Every contract audited, every mechanism tested. Security is never a trade-off.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>⚡</div>
            <h3>Performance Obsessed</h3>
            <p>Gas optimization, efficient state design, and scalable architecture by default.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🔗</div>
            <h3>Cross-Chain Ready</h3>
            <p>Building protocols that work seamlessly across multiple blockchains and layers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
