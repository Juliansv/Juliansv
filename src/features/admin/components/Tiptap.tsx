"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Toolbar } from "./ToolBar";
import { useCallback } from "react";

export default function Tiptap({
	value,
	onChange,
}: {
	value: string;
	onChange: (richText: string) => void;
}) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					HTMLAttributes: {
						class: "list-disc ml-3 pl-3",
					},
				},
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal ml-3 pl-3",
					},
				},
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
				protocols: ["http", "https"],
				isAllowedUri: (url, ctx) => {
					try {
						// construct URL
						const parsedUrl = url.includes(":")
							? new URL(url)
							: new URL(`${ctx.defaultProtocol}://${url}`);

						// use default validation
						if (!ctx.defaultValidate(parsedUrl.href)) {
							return false;
						}

						// disallowed protocols
						const disallowedProtocols = ["ftp", "file", "mailto"];
						const protocol = parsedUrl.protocol.replace(":", "");

						if (disallowedProtocols.includes(protocol)) {
							return false;
						}

						// only allow protocols specified in ctx.protocols
						const allowedProtocols = ctx.protocols.map((p) =>
							typeof p === "string" ? p : p.scheme
						);

						if (!allowedProtocols.includes(protocol)) {
							return false;
						}

						// disallowed domains
						const disallowedDomains = [
							"example-phishing.com",
							"malicious-site.net",
						];
						const domain = parsedUrl.hostname;

						if (disallowedDomains.includes(domain)) {
							return false;
						}

						// all checks have passed
						return true;
					} catch {
						return false;
					}
				},
				shouldAutoLink: (url) => {
					try {
						// construct URL
						const parsedUrl = url.includes(":")
							? new URL(url)
							: new URL(`https://${url}`);

						// only auto-link if the domain is not in the disallowed list
						const disallowedDomains = [
							"example-no-autolink.com",
							"another-no-autolink.com",
						];
						const domain = parsedUrl.hostname;

						return !disallowedDomains.includes(domain);
					} catch {
						return false;
					}
				},
			}),
		],
		content: value,
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

	const setLink = useCallback(() => {
		const previousUrl = editor?.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor?.chain().focus().extendMarkRange("link").unsetLink().run();

			return;
		}

		// update link
		try {
			editor
				?.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert("An unknown error occurred.");
			}
		}
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-col justify-stretch min-h-[180px]">
			<Toolbar editor={editor} setLink={setLink} />
			<EditorContent editor={editor} />
		</div>
	);
}
