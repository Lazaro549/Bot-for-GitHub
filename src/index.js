require("dotenv").config();
const { handleCommand } = require("./commands");
const { closeInactiveIssues } = require("./closeIssues");

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const ISSUE_NUMBER = process.env.ISSUE_NUMBER; // used only for testing commands
const COMMAND = process.env.COMMAND;           // used only for testing commands

async function main() {
  const mode = process.env.MODE || "all"; // "close", "command" or "all"

  if (mode === "close" || mode === "all") {
    console.log("Closing inactive issues...");
    await closeInactiveIssues(OWNER, REPO, 30);
    console.log("Inactive issues closed.");
  }

  if (mode === "command" || mode === "all") {
    if (COMMAND && ISSUE_NUMBER) {
      console.log(`Processing command: ${COMMAND}`);
      await handleCommand(COMMAND, { owner: OWNER, repo: REPO, issue_number: ISSUE_NUMBER });
      console.log("Command processed.");
    } else {
      console.log("No command provided. Skipping command step.");
    }
  }
}

main().catch(err => {
  console.error("Bot execution error:", err);
});

