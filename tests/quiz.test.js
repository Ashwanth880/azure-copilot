// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  createQuiz,
  answerQuestion,
  isQuizFinished,
  isCorrect,
  calculatePercentage,
  getGrade,
  formatTimeLeft,
} = require("../src/quiz.js");

test("createQuiz returns a new initialized state with shuffled questions", () => {
  const questions = [{ answer: 0 }, { answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual([...state.questions].sort((a, b) => a.answer - b.answer), questions);
  assert.notEqual(state.questions, questions);
  assert.deepEqual(questions, [{ answer: 0 }, { answer: 1 }]);
  assert.deepEqual(
    { current: state.current, score: state.score, answered: state.answered },
    { current: 0, score: 0, answered: false },
  );
});

test("answerQuestion returns a scored state without mutating its input", () => {
  const state = {
    questions: [{ answer: 1 }],
    current: 0,
    score: 0,
    answered: false,
  };

  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { ...state, score: 1, answered: true });
  assert.notEqual(result.state, state);
  assert.deepEqual(state, {
    questions: [{ answer: 1 }],
    current: 0,
    score: 0,
    answered: false,
  });
});

test("answerQuestion does not increase the score for a wrong or unanswered response", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2, answered: false };

  const wrongAnswer = answerQuestion(state, 0);
  const noAnswer = answerQuestion(state, null);

  assert.equal(wrongAnswer.correct, false);
  assert.equal(wrongAnswer.state.score, 2);
  assert.equal(noAnswer.correct, false);
  assert.equal(noAnswer.state.score, 2);
});

test("isQuizFinished detects whether the current index is past the last question", () => {
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 1 }), false);
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 2 }), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});

test("formatTimeLeft includes the timer icon and seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft formats zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});
