"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./ToolBar";

export default function Tiptap({
	description,
	onChange,
}: {
	description: string;
	onChange: (richText: string) => void;
}) {
	const editor = useEditor({
		extensions: [StarterKit.configure()],
		content: description,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "rounded-md border min-h-[150px] border-input bg-background px-3 py-4 disabled:cursor-not-allowed disabled:opacity-50",
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className="flex flex-col justify-stretch min-h-[180px]">
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
