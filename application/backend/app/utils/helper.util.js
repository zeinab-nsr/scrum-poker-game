module.exports = {
  getClosestNumberInScores: (number) => {
    const scores = [1, 2, 3, 5, 8, 13, 20, 40, 100];
    const closest = scores.reduce((prev, curr) => {
      return Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev;
    });
    return closest;
  },
}