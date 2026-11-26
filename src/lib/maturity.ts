import copy from '../content/test-madurez.json';

type Area = keyof typeof copy.areas;
const areas = Object.keys(copy.areas) as Area[];

function level(score: number) {
  return score < 40 ? 0 : score < 70 ? 1 : 2;
}

export function evaluateMaturity(answers: readonly number[]) {
  if (answers.length !== copy.questions.length ||
      !copy.questions.every((question, index) =>
        Number.isInteger(answers[index]) && answers[index] >= 0 && answers[index] < question.options.length)) {
    throw new Error('Completa las diez preguntas antes de calcular el resultado.');
  }

  const results = areas.map(area => {
    let total = 0;
    let max = 0;
    copy.questions.forEach((question, index) => {
      if (question.area !== area) return;
      total += answers[index];
      max += question.options.length - 1;
    });
    return { area, label: copy.areas[area].label, score: 100 * total / max };
  });
  const overall = results.reduce((total, item) => total + item.score, 0) / results.length;
  const priorities = [...results].sort((a, b) => a.score - b.score).slice(0, 3);
  return {
    overall: Math.round(overall),
    level: copy.levels[level(overall)],
    areas: results.map(item => ({ ...item, score: Math.round(item.score) })),
    recommendations: priorities.map(({ area, label, score }) => ({
      label, text: copy.areas[area].recommendations[level(score)],
    })),
  };
}
