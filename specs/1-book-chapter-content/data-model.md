# Data Model: Book Chapter Content Organization

**Date**: 2025-11-29

## Overview

This feature primarily deals with the hierarchical organization of content within a Docusaurus documentation site. The "data model" here represents the structure of the textbook's content, rather than a traditional application data model with entities and relationships stored in a database.

## Content Hierarchy

The content model is defined by the file system structure within the `physical-ai-book/docs/` directory, adhering to Docusaurus's conventions for generating navigation and pages.

-   **Root Documentation Directory (`physical-ai-book/docs/`)**: Contains introductory content and top-level sections.
    -   `intro.md`: Main introduction to the textbook/course.
    -   `requirements.md`: Hackathon requirements.
    -   `timeline.md`: Hackathon timeline.
    -   `assessments.md`: Course assessments.
    -   `hardware-requirements.md`: Detailed hardware specifications.
    -   `why-physical-ai-matters.md`: Rationale for Physical AI.
    -   `learning-outcomes.md`: Course learning outcomes.
-   **Modules (Chapters)**: Directories representing the main modules (chapters) of the course. Each module directory is prefixed with a number for ordering.
    -   `01-module-1-ros2/`
    -   `02-module-2-gazebo/`
    -   `03-module-3-isaac/`
    -   `04-module-4-vla/`
-   **Lessons (Sub-sections)**: Markdown files within each module directory, also prefixed with a number for ordering.
    -   `index.md`: An optional overview for the module.
    -   `1-lesson-title.md`
    -   `2-lesson-title.md`
    -   ...

## Attributes & Metadata

Each markdown file implicitly carries metadata for Docusaurus processing, typically defined via front matter:

-   `title`: Page title (used in navigation and page heading).
-   `sidebar_position`: Numeric value for ordering within the sidebar.
-   `sidebar_label`: Custom label for the sidebar entry.

## Relationships

-   **Parent-Child**: Modules contain lessons; the root directory contains top-level documents and module directories.
-   **Ordering**: `sidebar_position` and file/directory name prefixes (`01-`, `1-`) define the explicit ordering within the navigation structure.

## Validation Rules

-   All content files MUST be valid Markdown.
-   Front matter (especially `sidebar_position` and `title`) MUST be correctly defined for proper Docusaurus rendering.
-   File and directory naming conventions (numeric prefixes) MUST be followed to ensure correct ordering.
