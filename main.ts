import { App, Editor, MarkdownView, Plugin } from "obsidian";

export default class CheckboxPlugin extends Plugin {
	async onload() {
	
		const ribbonIconEl = this.addRibbonIcon(
			"reset",
			"Clear checkboxes",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				let v = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (v.editor) {
					const initial_text = v.editor.getValue();
					let new_text = initial_text;
					new_text = new_text.replace(/-\s\[[xX]\]/gm, "- [ ]");
					v.editor.setValue(new_text);
				}
			}
		);
		// Perform additional things with the ribbon
		// ribbonIconEl.addClass("my-plugin-ribbon-class");

		this.addCommand({
			id: "clear-all-checkboxes",
			name: "Clear all checkboxes in current file",
			editorCallback: (editor: Editor) => {
				const initial_text = editor.getValue();
				let new_text = initial_text;
				new_text = new_text.replace(/-\s\[[xX]\]/gm, "- [ ]");
				editor.setValue(new_text);
			},
		});

		this.addCommand({
			id: "check-all-checkboxes",
			name: "Check all checkboxes in current file",
			editorCallback: (editor: Editor) => {
				const initial_text = editor.getValue();
				let new_text = initial_text;
				new_text = new_text.replace(/-\s\[[\s]\]/gm, "- [x]");
				editor.setValue(new_text);
			},
		});
	}

	onunload() {}
}
