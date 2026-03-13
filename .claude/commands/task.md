Read the kanban for this project located in /home/julio/Documents/obsidian/Projects/Portfolio website/. Work on task number $ARGUMENTS.

When you start, before doing anything else, output a rename command for the user to copy-paste in the format:
`/rename task-$ARGUMENTS-short-description`
Replace "short-description" with a brief slug based on the task card content (e.g., `/rename task-3-fix-navbar-alignment`). Then move the task to the "In Progress" column.

Before making any changes, load the code-reviewer skill and use it to investigate the codebase and understand the issue described in the task.

If the task card has a `#brainstorming` tag, load the brainstorming skill and run a brainstorming session before implementation. Only proceed to code after the brainstorming is complete.

If the task card has a `#frontend` tag, load the frontend-design skill and use it to guide the implementation.

If the task card has a `#feature` tag, load the feature-dev skill and use it to guide the implementation.

Then proceed to fix it.

When the task is complete, move the card from "In Progress" to "Ready for Review" in the kanban. NEVER move it directly to "Done" — that happens after review.

At the end, write a report of what was done and ALWAYS include the task number (#$ARGUMENTS) in the report.
