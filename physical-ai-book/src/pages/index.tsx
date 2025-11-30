import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero-split">
      <div className="hero-split__bg">
        <div className="hero-split__left"></div>
        <div className="hero-split__right"></div>
      </div>
      <div className="hero-split__content">
        <Heading as="h1" className="hero-title">
          Bridging the Gap
        </Heading>
        <p className="hero-subtitle">
          From Digital Simulation to Physical Reality. Master the art of Physical AI and Humanoid Robotics.
        </p>
        <div className={styles.buttons}>
          <Link
            className="cta-button"
            to="/docs/intro">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

function Feature({ title, description, icon }: FeatureItem) {
  return (
    <div className="glass-card padding--lg">
      <div className="feature-icon">{icon}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook">
      <HomepageHeader />
      <main className="features-section">
        <div className="container">
          <div className="feature-grid">
            <Feature
              title="ROS 2 Control"
              description="Master the Robot Operating System 2. The nervous system of modern robotics."
              icon="🤖"
            />
            <Feature
              title="Gazebo Simulation"
              description="Test in the digital twin before deploying to the real world. Physics-accurate simulation."
              icon="🌐"
            />
            <Feature
              title="NVIDIA Isaac Sim"
              description="Leverage photorealistic simulation and synthetic data generation for AI training."
              icon="🧠"
            />
            <Feature
              title="Vision-Language-Action"
              description="Integrate LLMs with robotics. From voice commands to complex physical actions."
              icon="👁️"
            />
            <Feature
              title="Unity Rendering"
              description="High-fidelity visualization and human-robot interaction using the Unity engine."
              icon="🎮"
            />
            <Feature
              title="Sim-to-Real"
              description="Transfer learned policies from simulation to physical hardware with confidence."
              icon="🔄"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
