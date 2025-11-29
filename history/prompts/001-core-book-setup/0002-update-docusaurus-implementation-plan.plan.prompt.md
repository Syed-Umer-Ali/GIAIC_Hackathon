---
id: 0002
title: Update Docusaurus Implementation Plan
stage: plan
date: 2025-11-29
surface: agent
model: gemini-pro
feature: 001-core-book-setup
branch: 001-core-book-setup
user: user
command: /sp.plan
labels: [plan, docusaurus]
links:
  spec: ../../specs/001-core-book-setup/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-core-book-setup/plan.md
tests:
  - none
---

## Prompt

---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh gemini`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan Based on the `spec.md`, generate a detailed `plan.md` for **Feature 1: Core Book Setup**.

**You MUST include the following specific implementation details in the plan:**

1.  **Initialization:**
    *   Command to run: `npx create-docusaurus@latest physical-ai-book classic --typescript`.
    *   Clean up: Remove the default "Tutorial" and "Blog" dummy files.

2.  **Configuration (`docusaurus.config.ts`):**
    *   Set `title` to "Physical AI & Humanoid Robotics".
    *   Set `url` to `https://<username>.github.io`.
    *   Set `baseUrl` to `/physical-ai-book/`.
    *   Configure `themeConfig.navbar` to have links for: "Textbook", "About", "GitHub".

3.  **Content Structure (Sidebar):**
    *   Create 4 main folders in `/docs`:
        *   `01-module-1-ros2` (The Robotic Nervous System)
        *   `02-module-2-gazebo` (The Digital Twin)
        *   `03-module-3-isaac` (The AI-Robot Brain)
        *   `04-module-4-vla` (Vision-Language-Action)
    *   Configure `sidebars.ts` to auto-generate sidebars from these folders.

4.  **Theming (`src/css/custom.css`):**
    *   Implement a "Cyberpunk/Robotics" theme.
    *   Set `--ifm-color-primary` to a Neon Green (`#00ff9d`) or Cyan (`#00f3ff`).
    *   Set background to Dark Grey/Black (`#0a0a0a`).
    *   Use a modern font like 'Inter' or 'Roboto'.

5.  **Deployment:**
    *   Create `.github/workflows/deploy.yml`.
    *   Use the standard Docusaurus deployment action (`peaceiris/actions-gh-pages` or similar).

update the plan.md Dont start the work just write the plan

## Response snapshot

I have updated `specs/001-core-book-setup/plan.md` with the detailed implementation steps.

## Outcome

- ✅ Impact: The implementation plan was updated with detailed steps.
- 🧪 Tests: No tests were run.
- 📁 Files: 1 file was modified.
- 🔁 Next prompts: Proceed with implementation.
- 🧠 Reflection: The script for PHR creation failed, so I had to fall back to manual creation.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script did not produce the expected file path output.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
