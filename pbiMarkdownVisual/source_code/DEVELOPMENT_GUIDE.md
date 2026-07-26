# 🛠️ Power BI Markdown Visual Development & Rebuilding Guide

This guide explains how to modify source code, test changes live, bump versions, and rebuild/repackage a new `.pbviz` file.

---

## 📂 Source Code Structure (`source_code/`)

All development files are located in the **`source_code/`** subfolder:

```
source_code/
├── assets/
│   └── icon.png               # Visual icon displayed in Power BI
├── src/
│   ├── visual.ts              # Main rendering logic (marked + DOMPurify)
│   └── settings.ts            # Formatting pane options model
├── style/
│   └── visual.less            # GitHub-flavored Markdown stylesheet
├── capabilities.json          # Power BI data roles & capabilities schema
├── pbiviz.json                # Metadata, GUID, version, and author info
├── package.json               # NPM dependencies and scripts
└── tsconfig.json              # TypeScript compilation settings
```

---

## ✏️ Step 1: Modifying the Visual

Depending on what feature you want to add or update:

| Modification Goal | File to Edit | Instructions |
| :--- | :--- | :--- |
| **Change Markdown Parsing / Logic** | **[`src/visual.ts`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/src/visual.ts)** | Edit `renderMarkdown()`, `getMarkdownTextFromDataView()`, or marked options. |
| **Add New Formatting Control** | **[`src/settings.ts`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/src/settings.ts)** & **[`capabilities.json`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/capabilities.json)** | Register the property in `capabilities.json` under `objects` and add a setting slice in `settings.ts`. |
| **Update Visual Styles / Theme** | **[`style/visual.less`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/style/visual.less)** | Modify CSS/LESS rules for headings, tables, code blocks, or scrollbars. |
| **Change Fieldwells / Data Roles** | **[`capabilities.json`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/capabilities.json)** | Add or update roles under `dataRoles` and `dataViewMappings`. |
| **Change Visual Icon** | **[`assets/icon.png`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/assets/icon.png)** | Replace `icon.png` (20x20 PNG recommended). |

---

## 🏷️ Step 2: Version Bumping (Recommended before Repackaging)

When releasing a new version, bump the version string in **[`pbiviz.json`](file:///Users/penueljames/sandbox/pbiMarkdownVisual/source_code/pbiviz.json)**:

```json
{
  "visual": {
    "version": "1.0.2.0"
  },
  "version": "1.0.2.0"
}
```
*Note: Bumping the version ensures Power BI replaces the old visual without caching previous build assets.*

---

## ⚡ Step 3: Testing Live (`pbiviz start`)

To test code changes live inside Power BI Desktop or Service without packaging every time:

```bash
# 1. Activate conda environment
conda activate pviz

# 2. Navigate to source_code
cd /Users/penueljames/sandbox/pbiMarkdownVisual/source_code

# 3. Start local developer server
pbiviz start
```
- This launches an HTTPS server at `https://localhost:8080`.
- In Power BI Desktop, enable **Developer Visual** under Options -> Report Settings.
- Add the **Developer Visual** to your report canvas. Any code edits saved in `source_code/` will hot-reload live!

---

## 📦 Step 4: Rebuilding & Repackaging (`pbiviz package`)

When your code modifications are complete and verified:

```bash
# 1. Navigate to source_code directory
cd /Users/penueljames/sandbox/pbiMarkdownVisual/source_code

# 2. Install dependencies (if new NPM packages were added)
npm install

# 3. Run the compiler & packager
pbiviz package
```

---

## 🚚 Step 5: Updating the Production Visual Folder

Upon running `pbiviz package`, a fresh `.pbviz` bundle is created inside `source_code/dist/`. 

To update the release file in the `visual/` folder:

```bash
# Copy compiled output to visual directory
cp source_code/dist/*.pbiviz visual/pbiMarkdownVisual.pbiviz
```

Now your **`visual/pbiMarkdownVisual.pbiviz`** contains the latest updated visual ready to share or import into Power BI reports!
