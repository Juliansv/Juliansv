"use client";

import { type Editor } from "@tiptap/react";
import {
	Bold,
	Strikethrough,
	Italic,
	List,
	ListOrdered,
	Heading2,
	ExternalLink,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useCallback } from "react";

type Props = {
	editor: Editor | null;
	setLink: () => void;
};

export function Toolbar({ editor, setLink }: Props) {
	if (!editor) {
		return null;
	}

	return (
		<div className="border border-input bg-transparent rounded-br-md">
			<Toggle
				size="sm"
				pressed={editor.isActive("heading")}
				onPressedChange={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
			>
				<Heading2 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("OrderedList")}
				onPressedChange={() =>
					editor.chain().focus().toggleOrderedList().run()
				}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("List")}
				onPressedChange={() =>
					editor.chain().focus().toggleBulletList().run()
				}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("Italic")}
				onPressedChange={() =>
					editor.chain().focus().toggleItalic().run()
				}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("strike")}
				onPressedChange={() =>
					editor.chain().focus().toggleStrike().run()
				}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("bold")}
				onPressedChange={() =>
					editor.chain().focus().toggleBold().run()
				}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("ExternalLink")}
				onPressedChange={() => editor.chain().focus().setLink}
			>
				<ExternalLink className="h-4 w-4" />
			</Toggle>
		</div>
	);
}
