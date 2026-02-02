const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function handleCommand(comment, repoInfo) {
  const { owner, repo, issue_number } = repoInfo;

  switch (comment.trim()) {
    case "/hello":
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: "Hello! 👋 Thanks for your comment."
      });
      break;

    case "/status":
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: "All systems operational ✅"
      });
      break;

    default:
      console.log("No command matched:", comment);
      break;
  }
}

module.exports = { handleCommand };
