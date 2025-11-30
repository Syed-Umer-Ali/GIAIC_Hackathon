<!--
Sync Impact Report:
- Version change: N/A (initial creation) -> 0.1.0
- Modified principles: None (initial creation)
- Added sections:
  - Project Purpose
  - Technology Stack
  - Hackathon Requirements & Deliverables
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending
  - .specify/templates/spec-template.md: ⚠ pending
  - .specify/templates/tasks-template.md: ⚠ pending
  - .specify/templates/commands/*.md: ⚠ pending
  - README.md: ⚠ pending
- Follow-up TODOs: None
-->
# Physical AI & Humanoid Robotics Textbook Constitution

## Core Principles

### I. AI/Spec-Driven Development
Every aspect of the textbook creation, from content generation to chatbot integration, MUST leverage AI and Spec-Driven Development (SDD) methodologies.
Rationale: To ensure high-quality, testable, and systematically developed components, utilizing tools like Spec-Kit Plus and Claude Code for efficiency and consistency.

### II. Docusaurus-First Content Platform
The textbook content MUST be built and maintained using Docusaurus, deployed to GitHub Pages.
Rationale: Docusaurus provides a robust, modern, and easily deployable framework for technical documentation, ensuring accessibility and maintainability of the textbook.

### III. Integrated RAG Chatbot
An Retrieval-Augmented Generation (RAG) chatbot MUST be integrated within the published book to answer user questions about its content, including text selection-based queries.
Rationale: To provide an interactive and enhanced learning experience, enabling students to quickly find answers and deepen their understanding of the material directly within the textbook.

### IV. Content Modularity & Comprehensiveness
The textbook content MUST be logically structured into modules, chapters, and lessons, ensuring each section provides complete and accurate information for student comprehension.
Rationale: A well-organized, modular structure facilitates learning, makes complex topics digestible, and ensures that students acquire a thorough understanding of Physical AI and Humanoid Robotics.

### V. User-Centric Enhancements (Bonus)
Provisions for user personalization (hardware/software background, content adjustment) and localization (Urdu translation) SHOULD be considered for enhanced user experience.
Rationale: To cater to diverse learning needs and preferences, making the textbook more accessible and engaging for a broader audience, and aligning with hackathon bonus point opportunities.

### VI. Robust Technology Stack
The integrated RAG chatbot MUST utilize OpenAI Agents/ChatKit SDKs, FastAPI, Neon Serverless Postgres, and Qdrant Cloud Free Tier.
Rationale: To ensure the chatbot is built on a modern, scalable, and efficient technology stack, leveraging best-in-class tools for AI integration and data management.

## Project Purpose
The primary purpose of this project is to create a comprehensive, AI-native textbook for teaching a course in Physical AI & Humanoid Robotics. This textbook, built with Docusaurus and hosted on GitHub Pages, will be augmented by an interactive RAG chatbot to enhance the learning experience. The project also serves as a hackathon deliverable, demonstrating proficiency in AI/Spec-Driven Development and cutting-edge AI integration.

## Hackathon Requirements & Deliverables
The project MUST adhere to the core deliverables and aim for bonus points as outlined in the hackathon brief. This includes but is not limited to:
- AI/Spec-Driven Book Creation using Docusaurus and GitHub Pages.
- Integrated RAG Chatbot development.
- Potential for bonus points via Claude Code Subagents, Agent Skills, Signup/Signin with personalization, and content translation.

## Governance
This Constitution outlines the foundational principles and guidelines for the "Physical AI & Humanoid Robotics Textbook" project. It is intended to guide all development, content creation, and integration efforts.

**Amendment Procedure:** Amendments to this Constitution require a documented rationale and approval from the core project team.
**Versioning Policy:** Semantic versioning will be applied to Constitution updates. MAJOR for backward incompatible changes, MINOR for significant additions, PATCH for minor clarifications.
**Compliance Review:** All major project milestones and deliverables MUST undergo a review to ensure compliance with the principles outlined herein.

**Version**: 0.1.0 | **Ratified**: 2025-11-29 | **Last Amended**: 2025-11-29