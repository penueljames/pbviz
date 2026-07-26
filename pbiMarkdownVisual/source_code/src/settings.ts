"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

export class MarkdownCardSettings extends FormattingSettingsCard {
    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Font Size (pt)",
        value: 11
    });

    fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayName: "Font Color",
        value: { value: "#24292f" }
    });

    backgroundColor = new formattingSettings.ColorPicker({
        name: "backgroundColor",
        displayName: "Background Color",
        value: { value: "transparent" }
    });

    padding = new formattingSettings.NumUpDown({
        name: "padding",
        displayName: "Padding (px)",
        value: 16
    });

    enableSanitize = new formattingSettings.ToggleSwitch({
        name: "enableSanitize",
        displayName: "Sanitize HTML",
        value: true
    });

    name: string = "markdownSettings";
    displayName: string = "Markdown Options";
    slices: Array<FormattingSettingsSlice> = [
        this.fontSize,
        this.fontColor,
        this.backgroundColor,
        this.padding,
        this.enableSanitize
    ];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    markdownSettings = new MarkdownCardSettings();
    cards = [this.markdownSettings];
}
