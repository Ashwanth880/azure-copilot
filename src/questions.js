// Quiz questions.
// "answer" is the index (starting at 0) of the correct option.
const QUESTIONS = [
  {
    question: "Which command creates a new Git branch and switches to it?",
    options: ["git branch -d", "git switch -c", "git merge", "git push -u"],
    answer: 1,
  },
  {
    question: "Which file does GitHub show as a repository's front page?",
    options: ["index.txt", "README.md", "HOME.md", "about.html"],
    answer: 1,
  },
  {
    question: "What does PR stand for on GitHub?",
    options: ["Pull request", "Push release", "Project review", "Public repository"],
    answer: 0,
  },
  {
    question: "In GitHub Copilot, which key accepts an inline suggestion?",
    options: ["Enter", "Esc", "Tab", "Shift"],
    answer: 2,
  },
  {
    question: "Which file gives Copilot custom instructions for a repository?",
    options: [".github/copilot-instructions.md", "copilot.json", ".vscode/ai.txt", "package.json"],
    answer: 0,
  },
  {
    question: "What does `git clone` do?",
    options: [
      "Deletes a repository",
      "Copies a remote repository to your computer",
      "Creates a new branch",
      "Merges two branches",
    ],
    answer: 1,
  },
  {
    question: "In GitHub Actions, which file defines a workflow?",
    options: [
      ".github/workflows/main.yml",
      "workflow.config",
      ".git/actions.json",
      "actions.yaml",
    ],
    answer: 0,
  },
  {
    question: "Which GitHub Actions event triggers a workflow when code is pushed to a branch?",
    options: ["on: pull_request", "on: issues", "on: push", "on: release"],
    answer: 2,
  },
  {
    question: "What is the main purpose of a GitHub Action step?",
    options: [
      "To store a secret in the repository",
      "To run a command or script in a job",
      "To deploy static files to GitHub Pages",
      "To create a merge commit automatically",
    ],
    answer: 1,
  },
];

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS };
}
