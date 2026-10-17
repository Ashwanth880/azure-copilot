// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Creates a fresh quiz state with the questions in random order.
 */
function createQuiz(questions) {
  return {
    questions: shuffle(questions),
    current: 0,
    score: 0,
    answered: false,
  };
}

/**
 * Returns an updated quiz state after an answer without changing the input.
 */
function answerQuestion(state, selectedIndex) {
  const question = state.questions[state.current];
  const correct = selectedIndex !== null && isCorrect(question, selectedIndex);
  return {
    state: {
      ...state,
      score: state.score + (correct ? 1 : 0),
      answered: true,
    },
    correct,
  };
}

/**
 * Returns true when every question has been completed.
 */
function isQuizFinished(state) {
  return state.current >= state.questions.length;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { shuffle, createQuiz, answerQuestion, isQuizFinished, isCorrect, calculatePercentage, getGrade };
}
