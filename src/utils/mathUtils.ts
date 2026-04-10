/**
 * 计算最大公约数（GCD）
 * @param a 第一个数
 * @param b 第二个数
 * @returns 最大公约数
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * 约分分数
 * @param numerator 分子
 * @param denominator 分母
 * @returns 约分后的分数数组 [分子, 分母]
 */
export function reduceFraction(numerator: number, denominator: number): [number, number] {
  if (denominator === 0) {
    return [numerator, denominator];
  }
  
  const commonDivisor = gcd(numerator, denominator);
  return [numerator / commonDivisor, denominator / commonDivisor];
}

/**
 * 格式化分数答案
 * @param answer 分数答案，格式为 "分子/分母" 或 "\frac{分子}{分母}"
 * @returns 约分后的分数答案
 */
export function formatFractionAnswer(answer: string): string {
  // 处理 \frac{分子}{分母} 格式
  const fracMatch = answer.match(/\\frac\{([0-9]+)\}\{([0-9]+)\}/);
  if (fracMatch) {
    const [, numerator, denominator] = fracMatch;
    const [reducedNum, reducedDen] = reduceFraction(parseInt(numerator), parseInt(denominator));
    return `\\frac{${reducedNum}}{${reducedDen}}`;
  }
  
  // 处理 分子/分母 格式
  const simpleMatch = answer.match(/([0-9]+)\/([0-9]+)/);
  if (simpleMatch) {
    const [, numerator, denominator] = simpleMatch;
    const [reducedNum, reducedDen] = reduceFraction(parseInt(numerator), parseInt(denominator));
    return `${reducedNum}/${reducedDen}`;
  }
  
  // 不是分数格式，直接返回
  return answer;
}
