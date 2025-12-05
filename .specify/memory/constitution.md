<!--
Sync Impact Report:
- Version change: 0.3.0 -> 0.4.0
- Modified principles:
  - VI. Robust Technology Stack -> Updated to include Better Auth.
- Added principles:
  - VII. Personalized & Adaptive Learning -> Added to mandate the "twist" feature.
- Added sections: None
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ checked
  - .specify/templates/spec-template.md: ✅ checked
  - .specify/templates/tasks-template.md: ✅ checked
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

### III. Context-Aware RAG Chatbot
An Retrieval-Augmented Generation (RAG) chatbot MUST be integrated within the published book. This chatbot MUST be capable of answering user questions about the book's content, including text selection-based queries, and critically, MUST leverage the user's current viewing context (i.e., the specific chapter or lesson being read) to prioritize and tailor its responses.
Rationale: To provide a highly interactive and personalized learning experience, enabling students to receive precise, contextually relevant answers directly related to their current reading material, thereby deepening their understanding and engagement.

### IV. Content Modularity & Comprehensiveness
The textbook content MUST be logically structured into modules, chapters, and lessons, ensuring each section provides complete and accurate information for student comprehension.
Rationale: A well-organized, modular structure facilitates learning, makes complex topics digestible, and ensures that students acquire a thorough understanding of Physical AI and Humanoid Robotics.

### V. Interactive & Accessible Learning
The learning experience MUST be enhanced with interactive tools including AI-generated summaries, instant assessments (quizzes), and multi-language support. Roman Urdu MUST be prioritized as the primary localization option, followed by standard Urdu and other major languages.
Rationale: To lower language barriers and enforce active recall, ensuring the content is accessible and engaging for a diverse, global student base, particularly catering to the local context via Roman Urdu.

### VI. Robust Technology Stack
The integrated RAG chatbot and interactive features MUST utilize OpenAI Agents/ChatKit SDKs, FastAPI, Neon Serverless Postgres, Qdrant Cloud Free Tier, and Better Auth.
Rationale: To ensure the chatbot and auth system are built on a modern, scalable, and efficient technology stack, leveraging best-in-class tools for AI integration, secure user management, and data handling.

### VII. Personalized & Adaptive Learning
The platform MUST collect user context (proficiency, background, preferred language) during onboarding and utilize AI to adapt content delivery.
Rationale: To tailor the educational experience to individual learner needs, ensuring that content is presented at the appropriate complexity level and with relevant analogies, thereby maximizing learning efficacy.

## Project Purpose
The primary purpose of this project is to create a comprehensive, AI-native textbook for teaching a course in Physical AI & Humanoid Robotics. This textbook, built with Docusaurus and hosted on GitHub Pages, will be augmented by an interactive RAG chatbot and an AI-driven personalization engine to enhance the learning experience. The project also serves as a hackathon deliverable, demonstrating proficiency in AI/Spec-Driven Development and cutting-edge AI integration.

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

**Version**: 0.4.0 | **Ratified**: 2025-11-29 | **Last Amended**: 2025-12-02