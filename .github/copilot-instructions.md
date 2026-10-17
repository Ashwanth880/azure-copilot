# Copilot instructions for this repository

## Repository purpose

This repository is a small static web app for a GitHub Copilot workshop. It is intentionally dependency-free and designed to be easy to reason about with plain JavaScript and Node's built-in test runner.

The app is served from `src/`, while the repository root `index.html` is a GitHub Pages redirect to the app. The quiz itself is a browser UI backed by a small set of pure logic functions and a question dataset.

## Build, test, and lint commands

This project currently has no lint or build step. The relevant commands are:

- Run the full test suite:
  - `npm test`
- Run one test file:
  - `node --test tests/quiz.test.js`
  - `node --test tests/questions.test.js`
- Run one named test with a pattern:
  - `node --test tests/quiz.test.js --test-name-pattern "calculatePercentage rounds to a whole number"`
- Start the local web app:
  - `npm start`
  - This serves the files in `src/` on port `8080` with `npx --yes http-server src -p 8080 -c-1`

No framework-specific build system is present; keep changes compatible with plain browser JavaScript and Node 20+.

## High-level architecture

The codebase splits into three layers:

- `src/questions.js`
  - Defines the `QUESTIONS` array used by the quiz.
  - Each item is a plain object with `question`, `options`, and a zero-based `answer` index.
- `src/quiz.js`
  - Contains the reusable game logic (`shuffle`, `isCorrect`, `calculatePercentage`, `getGrade`).
  - This file intentionally has no DOM code so it can be tested directly with Node.
- `src/app.js`
  - Handles the browser UI: rendering the screens, wiring button clicks, updating score feedback, and moving between questions.
  - It expects the global `QUESTIONS` data and the functions from `quiz.js` to already be loaded by the page.

`src/index.html` loads scripts in this order:

1. `questions.js`
2. `quiz.js`
3. `app.js`

That ordering matters because the UI code depends on the globals created by the earlier scripts.

`tests/` also mirrors that split:

- `tests/questions.test.js` validates the integrity of the question dataset.
- `tests/quiz.test.js` validates the pure logic in `src/quiz.js`.

## Key conventions

- Keep browser-only DOM code in `src/app.js`; do not introduce DOM access into `src/quiz.js`.
- Keep `src/questions.js` as data-only, with no UI or scoring logic.
- `answer` values are always array indexes and must stay within the `options` length.
- Every question should have exactly 4 options and unique text; the tests enforce both.
- The repository intentionally avoids dependencies and frameworks. Prefer small, testable functions and plain JavaScript, especially when editing the quiz logic.
- If you change question content, scoring, or grading rules, verify both the logic tests and the question-data tests.

## Repository-level tooling notes

- The repo includes a GitHub MCP configuration in `.vscode/mcp.json`.
- Future Copilot sessions should treat this as a small workshop app, not a production application framework.
