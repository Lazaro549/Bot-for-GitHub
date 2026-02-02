const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function closeInactiveIssues(owner, repo, daysInactive = 30) {
  const issues = await octokit.paginate(octokit.issues.listForRepo, {
    owner,
    repo,
    state: "open"
  });

  const now = new Date();

  for (const issue of issues) {
    const updatedAt = new Date(issue.updated_at);
    const diffDays = (now - updatedAt) / (1000 * 60 * 60 * 24);

    if (diffDays > daysInactive) {
      await octokit.issues.update({
        owner,
        repo,
        issue_number: issue.number,
        state: "closed"
      });

      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issue.number,
        body: "Closing this issue due to inactivity. Feel free to reopen if needed."
      });
    }
  }
}

module.exports = { closeInactiveIssues };
