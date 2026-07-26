"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import DataView = powerbi.DataView;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private events: IVisualEventService;
    private target: HTMLElement;
    private container: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        this.events = options.host.eventService;
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;

        // Configure marked options
        marked.setOptions({
            gfm: true,
            breaks: true
        });

        // Setup visual container element
        this.container = document.createElement("div");
        this.container.className = "markdown-visual-container";
        this.target.appendChild(this.container);
    }

    public update(options: VisualUpdateOptions) {
        this.events.renderingStarted(options);

        try {
            // Populate formatting settings
            if (options.dataViews && options.dataViews[0]) {
                this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
                    VisualFormattingSettingsModel,
                    options.dataViews[0]
                );
            } else {
                this.formattingSettings = new VisualFormattingSettingsModel();
            }

            // Apply formatting options
            this.applyFormattingStyles();

            // Extract raw Markdown content from DataView
            const markdownText = this.getMarkdownTextFromDataView(options.dataViews);

            if (markdownText && markdownText.trim().length > 0) {
                this.renderMarkdown(markdownText);
            } else {
                this.renderDefaultPreview();
            }

            this.events.renderingFinished(options);
        } catch (error) {
            console.error("Error in Markdown Visual update:", error);
            this.renderError(String(error));
            this.events.renderingFailed(options, String(error));
        }
    }

    private getMarkdownTextFromDataView(dataViews: DataView[]): string | null {
        if (!dataViews || !dataViews[0]) {
            return null;
        }

        const dataView = dataViews[0];

        // 1. Categorical - Measure Values
        if (dataView.categorical && dataView.categorical.values && dataView.categorical.values[0]) {
            const values = dataView.categorical.values[0].values;
            if (values && values.length > 0) {
                return values.map(v => (v !== null && v !== undefined ? String(v) : "")).filter(s => s.length > 0).join("\n\n");
            }
        }

        // 2. Categorical - Category Column
        if (dataView.categorical && dataView.categorical.categories && dataView.categorical.categories[0]) {
            const values = dataView.categorical.categories[0].values;
            if (values && values.length > 0) {
                return values.map(v => (v !== null && v !== undefined ? String(v) : "")).filter(s => s.length > 0).join("\n\n");
            }
        }

        // 3. Single value
        if (dataView.single && dataView.single.value !== undefined && dataView.single.value !== null) {
            return String(dataView.single.value);
        }

        return null;
    }

    private renderMarkdown(markdownText: string): void {
        const rawHtml = marked.parse(markdownText) as string;

        const enableSanitize = this.formattingSettings?.markdownSettings?.enableSanitize?.value ?? true;
        const finalHtml = enableSanitize ? DOMPurify.sanitize(rawHtml) : rawHtml;

        // eslint-disable-next-line powerbi-visuals/no-inner-outer-html
        this.container.innerHTML = finalHtml;
    }

    private applyFormattingStyles(): void {
        const settings = this.formattingSettings?.markdownSettings;
        if (!settings) return;

        const fontSize = settings.fontSize?.value ? `${settings.fontSize.value}pt` : "11pt";
        const fontColor = settings.fontColor?.value?.value || "#24292f";
        const backgroundColor = settings.backgroundColor?.value?.value || "transparent";
        const padding = settings.padding?.value !== undefined ? `${settings.padding.value}px` : "16px";

        this.container.style.fontSize = fontSize;
        this.container.style.color = fontColor;
        this.container.style.backgroundColor = backgroundColor;
        this.container.style.padding = padding;
    }

    private renderDefaultPreview(): void {
        const defaultSample = `
<div class="markdown-welcome-card">
  <span class="welcome-badge">Power BI Markdown Visual</span>
  <h3 style="margin-top:4px;">Markdown Preview & Instructions</h3>
  <p>To render your own content, drag a text column or DAX measure to <strong>Markdown Content</strong>.</p>
</div>

# Markdown Features Supported

### Text Formatting & Lists
* **Bold Text**, *Italic Text*, and ~~Strikethrough~~
* Bulleted lists and numbered lists
* [x] Task list items with checkmarks

### Rich Code Blocks
\`\`\`typescript
// Example Code Syntax Block
function renderReport(title: string): void {
    console.log(\`Rendering report: \${title}\`);
}
\`\`\`

### Data Tables
| Metric | Q1 Target | Q1 Actual | Status |
| :--- | :---: | :---: | :---: |
| Revenue | $1.2M | **$1.4M** | ✅ Exceeded |
| Active Users | 50,000 | 54,200 | ✅ Exceeded |
| NPS Score | 65 | 68 | ✅ Exceeded |

> **Pro Tip:** Use the formatting pane to adjust font size, colors, padding, and toggle HTML sanitization!
`;
        this.renderMarkdown(defaultSample);
    }

    private renderError(errorMessage: string): void {
        // eslint-disable-next-line powerbi-visuals/no-inner-outer-html
        this.container.innerHTML = `
<div style="color: #cf222e; background-color: #ffebe9; border: 1px solid rgba(255,129,130,0.4); padding: 12px; border-radius: 6px;">
    <strong>Error Rendering Markdown:</strong>
    <p style="margin-top: 4px; margin-bottom: 0;">${DOMPurify.sanitize(errorMessage)}</p>
</div>`;
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}