# Implementation Plan: Core Book Setup

**Branch**: `001-core-book-setup` | **Date**: 2025-11-29 | **Spec**: [./spec.md](./spec.md)

## Summary

This plan outlines the steps to build the foundation for a "Physical AI & Humanoid Robotics" textbook. The objective is to create a high-performance, static documentation website using Docusaurus, featuring a landing page, modular sidebar navigation, and a blog, all deployable to GitHub Pages.

## Technical Context

*   **Framework**: Docusaurus (Latest)
*   **Language**: TypeScript
*   **Styling**: CSS Modules / Infima (Docusaurus default)
*   **Deployment**: GitHub Pages
*   **Package Manager**: npm

## Project Structure

The project will be initialized within a `physical-ai-book/` directory. The structure will follow the standard Docusaurus layout:

```text
physical-ai-book/
├── .docusaurus/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── blog/
├── docs/
│   ├── 01-module-1-ros2/
│   ├── 02-module-2-gazebo/
│   ├── 03-module-3-isaac/
│   └── 04-module-4-vla/
├── src/
│   ├── css/
│   │   └── custom.css
│   └── pages/
├── static/
├── docusaurus.config.ts
├── sidebars.ts
└── package.json
```

## Implementation Tasks

### 1. Initialization

*   **Command:** Run `npx create-docusaurus@latest physical-ai-book classic --typescript` to scaffold the project.
*   **Cleanup:** Remove the default "Tutorial" and "Blog" dummy files generated during initialization.

### 2. Configuration (`docusaurus.config.ts`)

*   Set `title` to "Physical AI & Humanoid Robotics".
*   Set `url` to `https://<username>.github.io`.
*   Set `baseUrl` to `/physical-ai-book/`.
*   Configure the `themeConfig.navbar` to include links for "Textbook", "About", and "GitHub".

### 3. Content Structure (Sidebar)

*   **Create Folders:** Inside the `/docs` directory, create four module folders:
    *   `01-module-1-ros2`
    *   `02-module-2-gazebo`
    *   `03-module-3-isaac`
    *   `04-module-4-vla`
*   **Configure Sidebar:** Update `sidebars.ts` to automatically generate the sidebar navigation from the created `docs/` folder structure.

### 4. Theming (`src/css/custom.css`)

*   **Theme:** Implement a "Cyberpunk/Robotics" aesthetic.
*   **Primary Color:** Set `--ifm-color-primary` to a Neon Cyan (`#00f3ff`).
*   **Background:** Set the main background to a dark color (`#0a0a0a`).
*   **Font:** Use a modern, clean font such as 'Inter' or 'Roboto'.

### 5. Deployment

*   **Workflow File:** Create a `.github/workflows/deploy.yml` file.
*   **Action:** Use the standard Docusaurus GitHub Pages deployment action (e.g., `peaceiris/actions-gh-pages`) to automate deployment.