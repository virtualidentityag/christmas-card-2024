export const getEuroForScore = (score: number) => {
  if (score >= 200) {
    return 2;
  }
  if (score >= 100) {
    return 1;
  }
  return 0;
}