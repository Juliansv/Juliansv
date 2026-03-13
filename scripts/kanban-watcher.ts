/**
 * kanban-watcher.ts
 *
 * A daemon that watches an Obsidian Kanban markdown file for changes
 * and spawns Claude Code agents in tmux windows when cards move to
 * "In Progress".
 *
 * Run with: pnpm kanban:watch
 */

import fs from "fs";
import { readFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import os from "os";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const KANBAN_PATH =
	"/home/julio/Documents/obsidian/Projects/Portfolio website/Portfolio Kanban.md";
const PROJECT_ROOT = "/home/julio/workspace/Juliansv";
const STATE_FILE = path.join(PROJECT_ROOT, ".kanban-state.json");
const TMUX_SESSION = "kanban-portfolio";
const DEBOUNCE_MS = 500;
const OBSIDIAN_DIR =
	"/home/julio/Documents/obsidian/Projects/Portfolio website/";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Card {
	id: number;
	description: string;
	tags: string[];
	checked: boolean;
}

interface PersistedState {
	activeTasks: number[];
	lastSnapshot: Record<number, string>;
}

type ColumnMap = Map<string, Card[]>;
type SnapshotMap = Map<number, string>;

// ---------------------------------------------------------------------------
// ANSI Colored Logger
// ---------------------------------------------------------------------------

const COLORS = {
	cyan: "\x1b[36m",
	green: "\x1b[32m",
	magenta: "\x1b[35m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
	reset: "\x1b[0m",
} as const;

function log(
	prefix: string,
	color: keyof typeof COLORS,
	message: string
): void {
	const ts = new Date().toISOString();
	const c = COLORS[color];
	const r = COLORS.reset;
	console.log(`${ts} ${c}[${prefix}]${r} ${message}`);
}

const logWatch = (msg: string): void => log("WATCH", "cyan", msg);
const logSpawn = (msg: string): void => log("SPAWN", "green", msg);
const logDone = (msg: string): void => log("DONE", "magenta", msg);
const logWarn = (msg: string): void => log("WARN", "yellow", msg);
const logError = (msg: string): void => log("ERROR", "red", msg);

// ---------------------------------------------------------------------------
// 1. Kanban Parser
// ---------------------------------------------------------------------------

function normalizeColumnName(raw: string): string {
	const lower = raw.trim().toLowerCase();
	const mapping: Record<string, string> = {
		"to do": "todo",
		"in progress": "in-progress",
		"ready for review": "ready-for-review",
		done: "done",
		archived: "archived",
	};
	return mapping[lower] ?? lower.replace(/\s+/g, "-");
}

const CARD_RE = /^- \[[ xX]\] #(\d+)\s+(.*)/;
const TAG_RE = /#([a-zA-Z][a-zA-Z0-9-]+)/g;

function parseCard(line: string): Card | null {
	const match = line.match(CARD_RE);
	if (!match) return null;

	const id = Number(match[1]);
	const rest = match[2];
	const checked = /- \[[xX]\]/.test(line);

	const tags: string[] = [];
	let tagMatch: RegExpExecArray | null;
	const tagRegex = new RegExp(TAG_RE.source, TAG_RE.flags);
	while ((tagMatch = tagRegex.exec(rest)) !== null) {
		tags.push(tagMatch[1]);
	}

	// Strip tags from description for a clean description
	const description = rest.replace(TAG_RE, "").trim();

	return { id, description, tags, checked };
}

function parseKanban(content: string): ColumnMap {
	// Strip YAML frontmatter
	let body = content;
	if (body.startsWith("---")) {
		const endIdx = body.indexOf("---", 3);
		if (endIdx !== -1) {
			body = body.slice(endIdx + 3);
		}
	}

	// Strip settings block: %% kanban:settings ... %%
	const settingsStart = body.indexOf("%% kanban:settings");
	if (settingsStart !== -1) {
		const settingsEnd = body.indexOf("%%", settingsStart + 18);
		if (settingsEnd !== -1) {
			body = body.slice(0, settingsStart) + body.slice(settingsEnd + 2);
		}
	}

	const columns: ColumnMap = new Map();
	let currentColumn: string | null = null;

	for (const line of body.split("\n")) {
		const headerMatch = line.match(/^## (.+)/);
		if (headerMatch) {
			currentColumn = normalizeColumnName(headerMatch[1]);
			if (!columns.has(currentColumn)) {
				columns.set(currentColumn, []);
			}
			continue;
		}

		if (currentColumn !== null) {
			const card = parseCard(line.trim());
			if (card) {
				columns.get(currentColumn)?.push(card);
			}
		}
	}

	return columns;
}

// ---------------------------------------------------------------------------
// 2. State Differ
// ---------------------------------------------------------------------------

function buildSnapshot(columns: ColumnMap): SnapshotMap {
	const snapshot: SnapshotMap = new Map();
	for (const [colName, cards] of columns) {
		for (const card of cards) {
			snapshot.set(card.id, colName);
		}
	}
	return snapshot;
}

interface DiffResult {
	movedToInProgress: Card[];
	movedToDone: number[];
	leftInProgress: number[];
}

function diffSnapshots(
	prev: SnapshotMap,
	curr: SnapshotMap,
	columns: ColumnMap
): DiffResult {
	const movedToInProgress: Card[] = [];
	const movedToDone: number[] = [];
	const leftInProgress: number[] = [];

	const inProgressCards = columns.get("in-progress") ?? [];

	// Detect cards that moved INTO "in-progress"
	for (const card of inProgressCards) {
		const prevCol = prev.get(card.id);
		if (prevCol !== "in-progress") {
			movedToInProgress.push(card);
		}
	}

	// Detect cards that moved to "done"
	for (const [id, col] of curr) {
		if (col === "done" && prev.get(id) !== "done") {
			movedToDone.push(id);
		}
	}

	// Detect cards that LEFT "in-progress" (were in-progress before, not anymore)
	for (const [id, col] of prev) {
		if (col === "in-progress") {
			const currCol = curr.get(id);
			if (currCol !== "in-progress") {
				leftInProgress.push(id);
			}
		}
	}

	return { movedToInProgress, movedToDone, leftInProgress };
}

// ---------------------------------------------------------------------------
// 3. Agent Spawner (tmux)
// ---------------------------------------------------------------------------

function ensureTmuxSession(): void {
	try {
		execSync(`tmux has-session -t ${TMUX_SESSION} 2>/dev/null`);
	} catch {
		execSync(`tmux new-session -d -s ${TMUX_SESSION}`);
		logSpawn(`Created tmux session: ${TMUX_SESSION}`);
	}
}

function buildPrompt(card: Card): string {
	const tagInstructions: string[] = [];

	if (card.tags.includes("brainstorming")) {
		tagInstructions.push(
			"This task is tagged #brainstorming. Before implementing, brainstorm 3 different approaches, evaluate trade-offs, then pick the best one and implement it."
		);
	}
	if (card.tags.includes("frontend")) {
		tagInstructions.push(
			"This task is tagged #frontend. Pay close attention to responsive design, accessibility (ARIA, keyboard navigation), animations/transitions, and visual consistency with the existing design system."
		);
	}
	if (card.tags.includes("feature")) {
		tagInstructions.push(
			"This task is tagged #feature. Plan the data model first, implement incrementally with proper TypeScript types, and ensure all new interfaces/types are well-defined."
		);
	}

	const tagSection =
		tagInstructions.length > 0
			? `\n\nTag-specific instructions:\n${tagInstructions.join("\n")}`
			: "";

	const tagsDisplay =
		card.tags.length > 0
			? ` [tags: ${card.tags.map((t) => `#${t}`).join(", ")}]`
			: "";

	return `You are working on Task #${card.id}: ${card.description}${tagsDisplay}

The Kanban board is at: ${KANBAN_PATH}

Instructions:
1. Read the project CLAUDE.md for project-specific conventions and context
2. Investigate the codebase to understand the current state and architecture
3. Implement the task: ${card.description}
4. Run \`pnpm lint && pnpm typecheck\` and fix any issues
5. When done, move card #${card.id} from "In Progress" to "Ready for Review" in the Kanban file
6. Write a brief summary of what you did and any decisions you made

IMPORTANT:
- NEVER commit changes to git — the human will review and commit
- NEVER move the card to "Done" — only move it to "Ready for Review"
- If you encounter blockers, move the card back to "To Do" and add a note${tagSection}`;
}

function spawnAgent(card: Card): void {
	ensureTmuxSession();

	const windowName = `task-${card.id}`;
	const prompt = buildPrompt(card);

	// Write prompt and spawn script to temp files to avoid all shell escaping issues
	const promptFile = path.join(os.tmpdir(), `kanban-prompt-${card.id}.txt`);
	const scriptFile = path.join(os.tmpdir(), `kanban-spawn-${card.id}.sh`);

	fs.writeFileSync(promptFile, prompt);
	fs.writeFileSync(
		scriptFile,
		[
			"#!/bin/bash",
			`cd "${PROJECT_ROOT}"`,
			`claude -p "$(cat '${promptFile}')" --dangerously-skip-permissions --model opus --add-dir "${OBSIDIAN_DIR}"`,
			`rm -f '${promptFile}' '${scriptFile}'`,
		].join("\n") + "\n",
		{ mode: 0o755 }
	);

	try {
		// Launch the script directly in a new tmux window — no escaping needed
		execSync(
			`tmux new-window -t ${TMUX_SESSION} -n ${windowName} '${scriptFile}'`
		);

		logSpawn(
			`Spawned agent for #${card.id}: ${card.description} (window: ${windowName})`
		);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		logError(`Failed to spawn agent for #${card.id}: ${msg}`);
		// Clean up temp files on failure
		try {
			fs.unlinkSync(promptFile);
		} catch {
			/* ignore */
		}
		try {
			fs.unlinkSync(scriptFile);
		} catch {
			/* ignore */
		}
	}
}

// ---------------------------------------------------------------------------
// 4. State Persistence
// ---------------------------------------------------------------------------

function loadState(): PersistedState {
	try {
		const raw = fs.readFileSync(STATE_FILE, "utf-8");
		const parsed: unknown = JSON.parse(raw);
		if (
			typeof parsed === "object" &&
			parsed !== null &&
			"activeTasks" in parsed &&
			"lastSnapshot" in parsed
		) {
			const state = parsed as PersistedState;
			return {
				activeTasks: Array.isArray(state.activeTasks)
					? state.activeTasks.filter((v): v is number => typeof v === "number")
					: [],
				lastSnapshot:
					typeof state.lastSnapshot === "object" && state.lastSnapshot !== null
						? state.lastSnapshot
						: {},
			};
		}
	} catch {
		// File doesn't exist or is corrupt — start fresh
	}
	return { activeTasks: [], lastSnapshot: {} };
}

function saveState(active: Set<number>, snapshot: SnapshotMap): void {
	const state: PersistedState = {
		activeTasks: [...active],
		lastSnapshot: Object.fromEntries(snapshot),
	};
	try {
		fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		logError(`Failed to save state: ${msg}`);
	}
}

// ---------------------------------------------------------------------------
// 5. Re-trigger Prevention & Core Loop
// ---------------------------------------------------------------------------

let activeTasks = new Set<number>();
let lastSnapshot: SnapshotMap = new Map();
let processing = false;

function handleChange(content: string): void {
	const columns = parseKanban(content);
	const currentSnapshot = buildSnapshot(columns);
	const diff = diffSnapshots(lastSnapshot, currentSnapshot, columns);

	// Handle cards that moved to "in-progress"
	for (const card of diff.movedToInProgress) {
		if (activeTasks.has(card.id)) {
			logWarn(`Task #${card.id} already active — skipping spawn`);
			continue;
		}
		activeTasks.add(card.id);
		spawnAgent(card);
	}

	// Handle cards that left "in-progress"
	for (const id of diff.leftInProgress) {
		if (activeTasks.has(id)) {
			activeTasks.delete(id);
			logDone(`Task #${id} left "In Progress" — removed from active set`);
		}
	}

	// Handle cards that moved to "done"
	for (const id of diff.movedToDone) {
		if (activeTasks.has(id)) {
			activeTasks.delete(id);
			logDone(`Task #${id} moved to "Done" — removed from active set`);
		}
	}

	lastSnapshot = currentSnapshot;
	saveState(activeTasks, currentSnapshot);
}

// ---------------------------------------------------------------------------
// 6. File Watcher
// ---------------------------------------------------------------------------

function startWatcher(): void {
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const processChange = async (): Promise<void> => {
		if (processing) return;
		processing = true;
		try {
			const content = await readFile(KANBAN_PATH, "utf-8");
			handleChange(content);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			logError(`Failed to read kanban file: ${msg}`);
		} finally {
			processing = false;
		}
	};

	const onFileChange = (): void => {
		if (debounceTimer !== null) {
			clearTimeout(debounceTimer);
		}
		debounceTimer = setTimeout(() => {
			void processChange();
		}, DEBOUNCE_MS);
	};

	// Always watch the directory (not the file) to survive atomic renames.
	// Obsidian saves by writing a temp file then renaming, which replaces the
	// inode and kills a direct fs.watch on the file.
	const dir = path.dirname(KANBAN_PATH);
	const filename = path.basename(KANBAN_PATH);

	fs.watch(dir, (_eventType, changedFile) => {
		if (changedFile === filename) {
			onFileChange();
		}
	});

	logWatch(`Watching directory for kanban changes: ${dir}`);
}

// ---------------------------------------------------------------------------
// 7. Startup Flow
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
	// 1. Check tmux is installed
	try {
		execSync("which tmux", { stdio: "pipe" });
	} catch {
		logError("tmux is not installed. Install with: sudo apt install tmux");
		process.exit(1);
	}

	// 2. Load persisted state
	const persisted = loadState();
	activeTasks = new Set(persisted.activeTasks);
	lastSnapshot = new Map(
		Object.entries(persisted.lastSnapshot).map(([k, v]) => [Number(k), v])
	);

	if (activeTasks.size > 0) {
		logWatch(`Restored ${activeTasks.size} active task(s) from state file`);
	}

	// 3. Read and parse current kanban file (if exists)
	if (fs.existsSync(KANBAN_PATH)) {
		try {
			const content = await readFile(KANBAN_PATH, "utf-8");
			const columns = parseKanban(content);
			const currentSnapshot = buildSnapshot(columns);

			// 4. Take initial snapshot — track existing in-progress cards without spawning
			const inProgress = columns.get("in-progress") ?? [];
			for (const card of inProgress) {
				if (!activeTasks.has(card.id)) {
					activeTasks.add(card.id);
					logWatch(
						`Tracking existing in-progress task #${card.id}: ${card.description}`
					);
				}
			}

			lastSnapshot = currentSnapshot;
			saveState(activeTasks, lastSnapshot);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			logError(`Failed to read kanban file on startup: ${msg}`);
		}
	} else {
		logWarn(`Kanban file does not exist yet: ${KANBAN_PATH}`);
	}

	// 5. Start file watcher
	startWatcher();

	// 6. Log startup complete
	logWatch("Kanban watcher started — waiting for card moves...");
}

// Graceful shutdown
process.on("SIGINT", () => {
	logWatch("Shutting down...");
	saveState(activeTasks, lastSnapshot);
	process.exit(0);
});
process.on("SIGTERM", () => {
	logWatch("Shutting down...");
	saveState(activeTasks, lastSnapshot);
	process.exit(0);
});

// Run
void main();
