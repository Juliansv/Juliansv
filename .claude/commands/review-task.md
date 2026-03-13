First, load the code-reviewer skill.

Read the kanban for this project located in /home/julio/Documents/obsidian/Projects/Portfolio website/. Review task number $ARGUMENTS (if "ready for review" is specified instead of a number, review all tasks currently in the "Ready for Review" column).

After reading the kanban, before doing anything else, output a rename command for the user to copy-paste in the format:
`/rename review-$ARGUMENTS-short-description`
Replace "short-description" with a brief slug based on the task card content (e.g., `/rename review-3-fix-navbar-alignment` or `/rename review-ready-for-review`).

Keep the kanban information in memory as highest priority during context compaction.

For each task reviewed:

- If the issue is NOT fixed or only partially fixed, move the card back from "Ready for Review" to "In Progress" and give a short description of what you find so the user can iterate.
- If the issue IS fixed, ask the user if they want to organize the changes into 1 commit and push to remote.
  - Only commit and push after explicit human approval.
  - If the user agrees, also move the card from "Ready for Review" to "Done" in the kanban.
  - After committing, pushing, and moving the card, report with a final short message.
