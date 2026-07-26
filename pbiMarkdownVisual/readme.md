# 📊 Power BI Custom Markdown Visual (`.pbviz`)

Welcome to the **Power BI Markdown Visual**! This custom visual converts raw Markdown strings—from dataset columns or dynamic DAX measures—into formatted, sanitized HTML inside Power BI reports.

---

## 📸 Visual Screenshots & Overview

### 1. General Introduction & Overview
Overview of the custom visual rendering dynamic Markdown narratives directly inside Power BI report pages:

![General Introduction Overview](ref_images/general_intro.png)

---

### 2. Data Model View (Dataset Columns & Measures)
Raw Markdown text stored in dataset columns or generated dynamically via DAX formulas:

![Raw Data Model](ref_images/raw_data.png)

---

### 3. Report Canvas View (Rendered Markdown Visual)
The visual renders headers, blockquotes, metric tables with color indicators, DAX code blocks, and task checklists:

![Rendered Custom Markdown Visual](ref_images/custom_visual_out.png)

---

### 4. Visual Metadata & Publisher Info
Visual details, versioning, GUID, and author metadata in Power BI Desktop:

![Visual Metadata and About Details](ref_images/visual_about.png)

---

## 🌟 Key Features

- **Full Markdown Syntax**: Support for Headings (`#`), bold/italic text, strikethrough, blockquotes (`>`), lists, task checklists (`[x]`), and tables.
- **DAX Measure Integration**: Generate dynamic executive narratives per region, user, or slicer selection.
- **Enterprise Security**: HTML output is automatically sanitized using **`DOMPurify`** to adhere to Power BI sandboxed iframe security policies.
- **Formatting Pane Controls**: Configure Font Size, Text Color, Background Color, Padding, and toggle HTML sanitization.
- **Standalone Test Harness**: Includes an interactive `preview.html` file to test live typing in any web browser.

---

## 🚀 Quick Start Guide

### How to Import into Power BI Desktop
1. Download **`pbiMarkdownVisual.pbiviz`** from the repository.
2. Open **Power BI Desktop**.
3. In the **Visualizations** pane (right side), click **`...` (Get more visuals)** -> **Import a visual from a file**.
4. Select **`pbiMarkdownVisual.pbiviz`**.
5. Drag your dataset text column or DAX measure into the single **`Markdown Content`** fieldwell.

---

## 🤖 Vibe Coding & AI Collaboration Report

This project was engineered through **Vibe Coding** with an AI Pair Programmer.

### 📊 Model & Token Metrics

| Metric | Specification / Value |
| :--- | :--- |
| **AI LLM Model** | **Gemini 3.6 Flash (High)** *(Google DeepMind Antigravity Engine)* |
| **Development Approach** | Conversational Vibe Coding & Automated Test Harnessing |
| **Iteration Rounds** | **12 Iterative Prompts** |
| **Estimated Input Tokens** | **~85,000 Tokens** *(Capabilities schemas, stack traces, TypeScript definitions)* |
| **Estimated Output Tokens** | **~18,500 Tokens** *(TypeScript code, LESS styles, JSON schemas, Python CSV generator)* |
| **Total Estimated Tokens** | **~103,500 Tokens** |

---

## 🏗️ Project Architecture & Local Development

### Directory Overview
```
├── capabilities.json      # Data roles (Grouping/Measure) & format pane properties
├── pbiviz.json            # Visual metadata, versioning, and author info
├── src/
│   ├── visual.ts          # Core rendering engine (marked + DOMPurify)
│   └── settings.ts        # Power BI formatting pane card definitions
├── style/
│   └── visual.less        # GitHub-flavored Markdown stylesheet
├── ref_images/            # Reference screenshots & overview images
├── preview.html           # Standalone browser test harness
└── sample_data.csv        # Sample dataset for testing
```

### Build Commands (Conda `pviz` Environment)
```bash
# Activate environment
conda activate pviz

# Start local Power BI developer server (localhost:8080)
pbiviz start

# Package production visual (.pbviz)
pbiviz package
```

---

## 🏷️ Search Keywords & Tags

`powerbi-custom-visual` `powerbi-markdown-visual` `pbviz` `markdown-rendering-powerbi` `powerbi-markdown` `dax-markdown` `powerbi-visual` `markdown-to-html` `powerbi-text-visual`

---

*Built with ❤️ using TypeScript, marked, DOMPurify, Power BI Visuals CLI, and Gemini 3.6 Flash.*
