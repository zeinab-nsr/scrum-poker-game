const getClosestNumberInScores = require('./helper.util');

describe('getClosestNumberInScores function', () => {
  it('should return the closest valid score to gitven number', () => {
    const num1 = 12;
    const num2 = 35;

    const result1 = getClosestNumberInScores(num1);
    const result2 = getClosestNumberInScores(num2);
    
    expect(result1).toBe(13);
    expect(result2).toBe(40);
  });
});
