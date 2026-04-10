import type { Question } from '@/types';
import { validateQuestions } from '@/utils/questionValidator';
import { formatFractionAnswer } from '@/utils/mathUtils';

// 从本地存储获取用户上传的题目
function getUserQuestions(subject: string): Question[] {
  try {
    const userQuestions = JSON.parse(localStorage.getItem('user_questions') || '[]');
    return userQuestions.filter((q: Question) => q.subject === subject);
  } catch {
    return [];
  }
}

// 数学题库 - 覆盖小学全面知识点
const mathQuestionTemplates = {
  // ========== 分数运算 ==========
  fractionAdd: (id: number): Question => {
    const d1 = Math.floor(Math.random() * 6) + 2;
    const d2 = Math.floor(Math.random() * 6) + 2;
    const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
    const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
    const commonDenom = d1 * d2;
    const resultNum = n1 * d2 + n2 * d1;
    const answer = `\\frac{${resultNum}}{${commonDenom}}`;
    const formattedAnswer = formatFractionAnswer(answer);
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `计算：\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = ?`,
      answer: formattedAnswer,
      explanation: `通分：\\frac{${n1}}{${d1}} = \\frac{${n1*d2}}{${commonDenom}}，\\frac{${n2}}{${d2}} = \\frac{${n2*d1}}{${commonDenom}}，相加得 ${formattedAnswer}`
    };
  },
  
  fractionSub: (id: number): Question => {
    const d1 = Math.floor(Math.random() * 6) + 2;
    const d2 = Math.floor(Math.random() * 6) + 2;
    const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
    const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
    const commonDenom = d1 * d2;
    const resultNum = Math.abs(n1 * d2 - n2 * d1);
    const answer = `${resultNum}/${commonDenom}`;
    const formattedAnswer = formatFractionAnswer(answer);
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `计算：${Math.max(n1/d1, n2/d2) > n1/d1 ? `${n2}/${d2}` : `${n1}/${d1}`} - ${Math.max(n1/d1, n2/d2) > n1/d1 ? `${n1}/${d1}` : `${n2}/${d2}`} = ?`,
      answer: formattedAnswer,
      explanation: `通分后相减，结果为 ${formattedAnswer}`
    };
  },
  
  fractionMul: (id: number): Question => {
    const n1 = Math.floor(Math.random() * 5) + 1;
    const d1 = Math.floor(Math.random() * 5) + 2;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const d2 = Math.floor(Math.random() * 5) + 2;
    const answer = `${n1*n2}/${d1*d2}`;
    const formattedAnswer = formatFractionAnswer(answer);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${n1}/${d1} × ${n2}/${d2} = ?`,
      answer: formattedAnswer,
      explanation: `分数乘法：分子相乘 ${n1}×${n2}=${n1*n2}，分母相乘 ${d1}×${d2}=${d1*d2}，结果为 ${formattedAnswer}`
    };
  },
  
  fractionDiv: (id: number): Question => {
    const n1 = Math.floor(Math.random() * 5) + 1;
    const d1 = Math.floor(Math.random() * 5) + 2;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const d2 = Math.floor(Math.random() * 5) + 2;
    const answer = `${n1*d2}/${d1*n2}`;
    const formattedAnswer = formatFractionAnswer(answer);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${n1}/${d1} ÷ ${n2}/${d2} = ?`,
      answer: formattedAnswer,
      explanation: `分数除法：除以一个分数等于乘以它的倒数，${n1}/${d1} × ${d2}/${n2} = ${formattedAnswer}`
    };
  },
  
  // ========== 一元一次方程 ==========
  linearEquation1: (id: number): Question => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 20) + 1;
    const x = Math.floor(Math.random() * 10) + 1;
    const c = a * x + b;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `解方程：${a}x + ${b} = ${c}`,
      answer: `x = ${x}`,
      explanation: `移项：${a}x = ${c} - ${b} = ${c-b}，所以 x = ${c-b} ÷ ${a} = ${x}`
    };
  },
  
  linearEquation2: (id: number): Question => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 20) + 1;
    const x = Math.floor(Math.random() * 10) + 1;
    const c = a * x - b;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `解方程：${a}x - ${b} = ${c}`,
      answer: `x = ${x}`,
      explanation: `移项：${a}x = ${c} + ${b} = ${c+b}，所以 x = ${c+b} ÷ ${a} = ${x}`
    };
  },
  
  linearEquation3: (id: number): Question => {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 5) + 2;
    const x = Math.floor(Math.random() * 8) + 2;
    const d = (a + c) * x + b;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `解方程：${a}x + ${b} + ${c}x = ${d}`,
      answer: `x = ${x}`,
      explanation: `合并同类项：${a+c}x + ${b} = ${d}，移项得 ${a+c}x = ${d-b} = ${d-b}，所以 x = ${x}`
    };
  },

  // ========== 找规律 ==========
  pattern1: (id: number): Question => {
    const start = Math.floor(Math.random() * 5) + 1;
    const diff = Math.floor(Math.random() * 3) + 2;
    const result = start + diff * 4;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `找规律填数：${start}、${start + diff}、${start + diff * 2}、${start + diff * 3}、____`,
      answer: `${result}`,
      explanation: `这是一个等差数列，每项比前一项多${diff}，所以下一个数是 ${result}`
    };
  },
  
  pattern2: (id: number): Question => {
    const start = Math.floor(Math.random() * 2) + 2;
    const ratio = 2;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `找规律填数：${start}、${start * ratio}、${start * ratio * ratio}、${start * ratio * ratio * ratio}、____`,
      answer: `${start * ratio * ratio * ratio * ratio}`,
      explanation: `这是一个等比数列，每项是前一项的${ratio}倍，所以下一个数是 ${start * ratio * ratio * ratio * ratio}`
    };
  },
  
  pattern3: (id: number): Question => {
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `找规律填数：1、1、2、3、____`,
      answer: `5`,
      explanation: `这是斐波那契数列，每一项等于前两项之和，1+1=2，1+2=3，2+3=5`
    };
  },

  // ========== 时间计算 ==========
  timeCalc1: (id: number): Question => {
    const hours = Math.floor(Math.random() * 3) + 1;
    const minutes = Math.floor(Math.random() * 4) * 15;
    const totalMinutes = hours * 60 + minutes;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `${hours}小时${minutes > 0 ? minutes + '分钟' : ''}等于多少分钟？`,
      answer: `${totalMinutes}分钟`,
      explanation: `${hours}小时 = ${hours * 60}分钟${minutes > 0 ? `，加上${minutes}分钟` : ''}，共${totalMinutes}分钟`
    };
  },
  
  timeCalc2: (id: number): Question => {
    const h1 = Math.floor(Math.random() * 5) + 8;
    const m1 = Math.floor(Math.random() * 4) * 15;
    const duration = Math.floor(Math.random() * 3) + 1;
    const h2 = h1 + duration;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `小明${h1}:${m1.toString().padStart(2, '0')}出发，经过${duration}小时后到达，到达时间是？`,
      answer: `${h2}:${m1.toString().padStart(2, '0')}`,
      explanation: `出发时间 + 经过时间 = ${h1}:${m1.toString().padStart(2, '0')} + ${duration}小时 = ${h2}:${m1.toString().padStart(2, '0')}`
    };
  },

  // ========== 质数合数 ==========
  primeNumber: (id: number): Question => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18];
    const isPrime = Math.random() > 0.5;
    const num = isPrime ? primes[Math.floor(Math.random() * primes.length)] : composites[Math.floor(Math.random() * composites.length)];
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `判断：${num}是质数还是合数？`,
      options: ['质数', '合数'],
      answer: isPrime ? '质数' : '合数',
      explanation: `${num}${isPrime ? '只能被1和它本身整除，所以是质数' : '除了1和它本身还能被其他数整除，所以是合数'}。`
    };
  },

  // ========== 最大公因数/最小公倍数 ==========
  gcd: (id: number): Question => {
    const gcdPairs = [[12, 18, 6], [15, 20, 5], [24, 36, 12], [16, 24, 8], [18, 27, 9], [20, 30, 10]];
    const [a, b, ans] = gcdPairs[Math.floor(Math.random() * gcdPairs.length)];
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `${a}和${b}的最大公因数是多少？`,
      answer: `${ans}`,
      explanation: `${a}和${b}的公因数中最大的一个是${ans}。`
    };
  },
  
  lcm: (id: number): Question => {
    const lcmPairs = [[4, 6, 12], [3, 5, 15], [6, 8, 24], [5, 7, 35], [4, 5, 20], [3, 4, 12]];
    const [a, b, ans] = lcmPairs[Math.floor(Math.random() * lcmPairs.length)];
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `${a}和${b}的最小公倍数是多少？`,
      answer: `${ans}`,
      explanation: `${a}和${b}的公倍数中最小的一个是${ans}。`
    };
  },

  // ========== 比例问题 ==========
  ratio1: (id: number): Question => {
    const total = (Math.floor(Math.random() * 5) + 3) * 10;
    const ratioA = Math.floor(Math.random() * 3) + 2;
    const ratioB = Math.floor(Math.random() * 2) + 1;
    const partA = total * ratioA / (ratioA + ratioB);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `把${total}个苹果按${ratioA}:${ratioB}分配，较多的一份有多少个？`,
      answer: `${partA}个`,
      explanation: `按${ratioA}:${ratioB}分配，总共${ratioA + ratioB}份，较多的一份占${ratioA}份，即 ${total} × ${ratioA}/${ratioA + ratioB} = ${partA}个`
    };
  },

  // ========== 应用题 ==========
  wordProblem1: (id: number): Question => {
    const speed = Math.floor(Math.random() * 20) + 30;
    const time = Math.floor(Math.random() * 3) + 2;
    const distance = speed * time;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `一辆汽车每小时行驶${speed}千米，${time}小时行驶多少千米？`,
      answer: `${distance}千米`,
      explanation: `路程 = 速度 × 时间 = ${speed} × ${time} = ${distance}（千米）`
    };
  },
  
  wordProblem2: (id: number): Question => {
    const total = Math.floor(Math.random() * 5) + 5;
    const used = Math.floor(Math.random() * 3) + 1;
    const remaining = total - used;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `一根绳子长${total}米，用去${used}米，还剩多少米？`,
      answer: `${remaining}米`,
      explanation: `剩余 = 总长 - 用去 = ${total} - ${used} = ${remaining}（米）`
    };
  },
  
  wordProblem3: (id: number): Question => {
    const price = Math.floor(Math.random() * 10) + 5;
    const quantity = Math.floor(Math.random() * 5) + 3;
    const total = price * quantity;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `每支铅笔${price}元，买${quantity}支需要多少钱？`,
      answer: `${total}元`,
      explanation: `总价 = 单价 × 数量 = ${price} × ${quantity} = ${total}（元）`
    };
  },

  wordProblem4: (id: number): Question => {
    const total = Math.floor(Math.random() * 20) + 30;
    const used = Math.floor(Math.random() * 10) + 10;
    const remaining = total - used;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `商店有${total}千克苹果，卖出了${used}千克，还剩多少千克？`,
      answer: `${remaining}千克`,
      explanation: `剩余 = 总量 - 卖出 = ${total} - ${used} = ${remaining}（千克）`
    };
  },

  wordProblem5: (id: number): Question => {
    const people = Math.floor(Math.random() * 3) + 4;
    const each = Math.floor(Math.random() * 5) + 3;
    const total = people * each;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `${people}个小朋友分糖果，每人分${each}颗，一共需要多少颗糖果？`,
      answer: `${total}颗`,
      explanation: `总数 = 人数 × 每人分的数量 = ${people} × ${each} = ${total}（颗）`
    };
  },

  // ========== 小数运算 ==========
  decimalAdd: (id: number): Question => {
    const a = (Math.random() * 10 + 1).toFixed(1);
    const b = (Math.random() * 10 + 1).toFixed(1);
    const result = (parseFloat(a) + parseFloat(b)).toFixed(1);
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `计算：${a} + ${b} = ?`,
      answer: result,
      explanation: `小数加法：${a} + ${b} = ${result}`
    };
  },
  
  decimalSub: (id: number): Question => {
    const a = (Math.random() * 10 + 5).toFixed(1);
    const b = (Math.random() * 5 + 1).toFixed(1);
    const result = (parseFloat(a) - parseFloat(b)).toFixed(1);
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `计算：${a} - ${b} = ?`,
      answer: result,
      explanation: `小数减法：${a} - ${b} = ${result}`
    };
  },
  
  decimalMul: (id: number): Question => {
    const a = (Math.random() * 5 + 1).toFixed(1);
    const b = Math.floor(Math.random() * 5) + 2;
    const result = (parseFloat(a) * b).toFixed(1);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${a} × ${b} = ?`,
      answer: result,
      explanation: `小数乘法：${a} × ${b} = ${result}`
    };
  },
  
  decimalDiv: (id: number): Question => {
    const b = Math.floor(Math.random() * 4) + 2;
    const result = (Math.random() * 5 + 1).toFixed(1);
    const a = (parseFloat(result) * b).toFixed(1);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${a} ÷ ${b} = ?`,
      answer: result,
      explanation: `小数除法：${a} ÷ ${b} = ${result}`
    };
  },

  // ========== 百分数 ==========
  percentage1: (id: number): Question => {
    const base = Math.floor(Math.random() * 50) + 50;
    const percent = Math.floor(Math.random() * 4) + 2;
    const result = Math.round(base * percent / 100);
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `求${base}的${percent}%是多少？`,
      answer: `${result}`,
      explanation: `${base} × ${percent}% = ${base} × 0.0${percent} = ${result}`
    };
  },
  
  percentage2: (id: number): Question => {
    const part = Math.floor(Math.random() * 20) + 10;
    const percent = Math.floor(Math.random() * 4) + 2;
    const total = Math.round(part / percent * 100);
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `${part}是一个数的${percent}%，这个数是多少？`,
      answer: `${total}`,
      explanation: `这个数 = ${part} ÷ ${percent}% = ${part} ÷ 0.0${percent} = ${total}`
    };
  },

  // ========== 几何计算 ==========
  geometry1: (id: number): Question => {
    const side = Math.floor(Math.random() * 5) + 4;
    const perimeter = side * 4;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `一个正方形的边长是${side}厘米，它的周长是多少厘米？`,
      answer: `${perimeter}厘米`,
      explanation: `正方形周长 = 边长 × 4 = ${side} × 4 = ${perimeter}（厘米）`,
      geometry: {
        type: 'square',
        width: 200,
        height: 200,
        annotations: [
          { x: 50, y: 100, text: `${side}cm`, position: 'left' },
          { x: 100, y: 50, text: `${side}cm`, position: 'top' }
        ]
      }
    };
  },
  
  geometry2: (id: number): Question => {
    const length = Math.floor(Math.random() * 5) + 5;
    const width = Math.floor(Math.random() * 3) + 3;
    const area = length * width;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `一个长方形的长是${length}厘米，宽是${width}厘米，它的面积是多少平方厘米？`,
      answer: `${area}平方厘米`,
      explanation: `长方形面积 = 长 × 宽 = ${length} × ${width} = ${area}（平方厘米）`
    };
  },
  
  geometry3: (id: number): Question => {
    const length = Math.floor(Math.random() * 5) + 5;
    const width = Math.floor(Math.random() * 3) + 3;
    const perimeter = (length + width) * 2;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `一个长方形的长是${length}厘米，宽是${width}厘米，它的周长是多少厘米？`,
      answer: `${perimeter}厘米`,
      explanation: `长方形周长 = (长 + 宽) × 2 = (${length} + ${width}) × 2 = ${perimeter}（厘米）`
    };
  },
  
  geometry4: (id: number): Question => {
    const side = Math.floor(Math.random() * 5) + 4;
    const area = side * side;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `一个正方形的边长是${side}厘米，它的面积是多少平方厘米？`,
      answer: `${area}平方厘米`,
      explanation: `正方形面积 = 边长 × 边长 = ${side} × ${side} = ${area}（平方厘米）`,
      geometry: {
        type: 'square',
        width: 200,
        height: 200,
        annotations: [
          { x: 50, y: 100, text: `${side}cm`, position: 'left' },
          { x: 100, y: 50, text: `${side}cm`, position: 'top' }
        ]
      }
    };
  },
  
  // 三角形面积
  geometry5: (id: number): Question => {
    const base = Math.floor(Math.random() * 6) + 5;
    const height = Math.floor(Math.random() * 6) + 5;
    const area = (base * height) / 2;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `一个三角形的底是${base}厘米，高是${height}厘米，它的面积是多少平方厘米？`,
      answer: `${area}平方厘米`,
      explanation: `三角形面积 = 底 × 高 ÷ 2 = ${base} × ${height} ÷ 2 = ${area}（平方厘米）`,
      geometry: {
        type: 'triangle',
        width: 200,
        height: 200,
        annotations: [
          { x: 100, y: 180, text: `${base}cm`, position: 'bottom' },
          { x: 100, y: 20, text: `${height}cm`, position: 'top' }
        ]
      }
    };
  },
  
  // 圆的周长
  geometry6: (id: number): Question => {
    const radius = Math.floor(Math.random() * 5) + 3;
    const perimeter = 2 * Math.PI * radius;
    const roundedPerimeter = Math.round(perimeter * 10) / 10;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `一个圆的半径是${radius}厘米，它的周长是多少厘米？（π取3.14）`,
      answer: `${roundedPerimeter}厘米`,
      explanation: `圆的周长 = 2 × π × 半径 = 2 × 3.14 × ${radius} = ${roundedPerimeter}（厘米）`,
      geometry: {
        type: 'circle',
        width: 200,
        height: 200,
        radius: 60,
        annotations: [
          { x: 100, y: 40, text: `${radius}cm`, position: 'top' }
        ]
      }
    };
  },

  // ========== 单位换算 ==========
  unitConvert1: (id: number): Question => {
    const m = Math.floor(Math.random() * 5) + 2;
    const cm = m * 100;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `${m}米等于多少厘米？`,
      answer: `${cm}厘米`,
      explanation: `1米 = 100厘米，${m}米 = ${m} × 100 = ${cm}厘米`
    };
  },
  
  unitConvert2: (id: number): Question => {
    const kg = Math.floor(Math.random() * 5) + 2;
    const g = kg * 1000;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `${kg}千克等于多少克？`,
      answer: `${g}克`,
      explanation: `1千克 = 1000克，${kg}千克 = ${kg} × 1000 = ${g}克`
    };
  },
  
  unitConvert3: (id: number): Question => {
    const km = Math.floor(Math.random() * 3) + 1;
    const m = km * 1000;
    return {
      id,
      subject: 'math',
      difficulty: 'easy',
      content: `${km}千米等于多少米？`,
      answer: `${m}米`,
      explanation: `1千米 = 1000米，${km}千米 = ${km} × 1000 = ${m}米`
    };
  },

  // ========== 难题 ==========
  hardEquation: (id: number): Question => {
    const a = Math.floor(Math.random() * 3) + 2;
    const b = Math.floor(Math.random() * 5) + 1;
    const x = Math.floor(Math.random() * 5) + 3;
    const c = a * x + b;
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `解方程：2(${a}x + ${b}) = ${2 * c}`,
      answer: `x = ${x}`,
      explanation: `展开：${2*a}x + ${2*b} = ${2*c}，移项：${2*a}x = ${2*c - 2*b}，所以 x = ${x}`
    };
  },
  
  hardFraction: (id: number): Question => {
    const n1 = Math.floor(Math.random() * 3) + 1;
    const d1 = Math.floor(Math.random() * 3) + 2;
    const n2 = Math.floor(Math.random() * 3) + 1;
    const d2 = Math.floor(Math.random() * 3) + 2;
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `计算：(${n1}/${d1} + ${n2}/${d2}) × 2 = ?`,
      answer: `先通分计算括号内，再乘以2`,
      explanation: `先算括号内的加法（需要通分），再算括号外的乘法。`
    };
  },

  hardWordProblem: (id: number): Question => {
    const total = Math.floor(Math.random() * 5) + 10;
    const a = Math.floor(Math.random() * 3) + 2;
    const b = total - a;
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `小明有${total}元钱，买铅笔用去了${a}元，买橡皮用去了${b}元，还剩多少元？`,
      answer: `${total - a - b}元`,
      explanation: `剩余 = 总钱数 - 买铅笔的钱 - 买橡皮的钱 = ${total} - ${a} - ${b} = ${total - a - b}元`
    };
  },
  
  // ========== 应用题 ==========
  // 行程问题
  travelProblem: (id: number): Question => {
    const speed = Math.floor(Math.random() * 20) + 30;
    const time = Math.floor(Math.random() * 3) + 2;
    const distance = speed * time;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `一辆汽车以每小时${speed}千米的速度行驶，${time}小时后行驶了多少千米？`,
      answer: `${distance}千米`,
      explanation: `路程 = 速度 × 时间 = ${speed} × ${time} = ${distance}（千米）`
    };
  },
  
  // 工程问题
  engineeringProblem: (id: number): Question => {
    const totalWork = Math.floor(Math.random() * 5) + 10;
    const dailyWork = Math.floor(Math.random() * 3) + 2;
    const days = totalWork / dailyWork;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `一项工程需要完成${totalWork}个工作量，每天完成${dailyWork}个工作量，需要多少天完成？`,
      answer: `${days}天`,
      explanation: `工作时间 = 总工作量 ÷ 每天工作量 = ${totalWork} ÷ ${dailyWork} = ${days}（天）`
    };
  },
  
  // 浓度问题
  concentrationProblem: (id: number): Question => {
    const solution = Math.floor(Math.random() * 50) + 50;
    const concentration = Math.floor(Math.random() * 20) + 10;
    const solute = solution * concentration / 100;
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `有${solution}克浓度为${concentration}%的盐水，其中含盐多少克？`,
      answer: `${solute}克`,
      explanation: `溶质质量 = 溶液质量 × 浓度 = ${solution} × ${concentration}% = ${solute}（克）`
    };
  },
  
  // ========== 奥数题 ==========
  // 鸡兔同笼
  chickenRabbit: (id: number): Question => {
    const heads = Math.floor(Math.random() * 10) + 10;
    const legs = Math.floor(Math.random() * 20) + 40;
    const rabbits = (legs - 2 * heads) / 2;
    const chickens = heads - rabbits;
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `鸡兔同笼，共有${heads}个头，${legs}条腿，问鸡和兔各有多少只？`,
      options: [`鸡${chickens}只，兔${rabbits}只`, `鸡${rabbits}只，兔${chickens}只`, `鸡${heads}只，兔0只`, `鸡0只，兔${heads}只`],
      answer: `鸡${chickens}只，兔${rabbits}只`,
      explanation: `假设全是鸡，应该有${2 * heads}条腿，比实际少${legs - 2 * heads}条腿。每把一只鸡换成兔子，增加2条腿，所以兔子有${(legs - 2 * heads) / 2}只，鸡有${heads - rabbits}只。`
    };
  },
  
  // 盈亏问题
  profitLoss: (id: number): Question => {
    const each = Math.floor(Math.random() * 5) + 3;
    const extra = Math.floor(Math.random() * 10) + 5;
    const shortage = Math.floor(Math.random() * 10) + 5;
    const total = (extra + shortage) / (each - 1);
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `小朋友分糖果，每人分${each}颗，还剩${extra}颗；每人分${each + 1}颗，还差${shortage}颗。问有多少个小朋友？`,
      answer: `${total}个`,
      explanation: `两次分配的差额为${each + 1 - each}颗，总差额为${extra + shortage}颗，所以小朋友人数为${(extra + shortage) / 1} = ${total}个。`
    };
  },
  
  // 植树问题
  treePlanting: (id: number): Question => {
    const distance = Math.floor(Math.random() * 50) + 50;
    const interval = Math.floor(Math.random() * 5) + 2;
    const trees = distance / interval + 1;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `在一条${distance}米长的道路两侧植树，每隔${interval}米种一棵，两端都种，一共需要种多少棵树？`,
      answer: `${trees * 2}棵`,
      explanation: `一侧植树棵数 = 距离 ÷ 间隔 + 1 = ${distance} ÷ ${interval} + 1 = ${trees}棵，两侧共${trees * 2}棵。`
    };
  },

  // ========== 四则混合运算 ==========
  mixedCalc1: (id: number): Question => {
    const a = Math.floor(Math.random() * 10) + 5;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 3) + 2;
    const result = a + b * c;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${a} + ${b} × ${c} = ?`,
      answer: `${result}`,
      explanation: `先算乘法：${b} × ${c} = ${b * c}，再算加法：${a} + ${b * c} = ${result}`
    };
  },
  
  mixedCalc2: (id: number): Question => {
    const a = Math.floor(Math.random() * 20) + 20;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 5) + 2;
    const result = a - b * c;
    return {
      id,
      subject: 'math',
      difficulty: 'medium',
      content: `计算：${a} - ${b} × ${c} = ?`,
      answer: `${result}`,
      explanation: `先算乘法：${b} × ${c} = ${b * c}，再算减法：${a} - ${b * c} = ${result}`
    };
  },
  
  mixedCalc3: (id: number): Question => {
    const a = Math.floor(Math.random() * 5) + 3;
    const b = Math.floor(Math.random() * 5) + 2;
    const c = Math.floor(Math.random() * 3) + 2;
    const d = Math.floor(Math.random() * 5) + 2;
    const result = (a + b) * (c + d);
    return {
      id,
      subject: 'math',
      difficulty: 'hard',
      content: `计算：(${a} + ${b}) × (${c} + ${d}) = ?`,
      answer: `${result}`,
      explanation: `先算括号内：${a} + ${b} = ${a + b}，${c} + ${d} = ${c + d}，再相乘：${a + b} × ${c + d} = ${result}`
    };
  }
};

import { 
  saveGeneratedIndices,
  shuffleOptions
} from './questionHistory';

const SUBJECT_NAME = 'math';

// 小升初数学题目难度分类
const mathQuestionDifficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
  // 基础题（2道）- 巩固基础
  fractionAdd: 'easy',
  fractionSub: 'easy',
  linearEquation1: 'easy',
  linearEquation2: 'easy',
  pattern1: 'easy',
  timeCalc1: 'easy',
  timeCalc2: 'easy',
  wordProblem1: 'easy',
  wordProblem2: 'easy',
  wordProblem5: 'easy',
  decimalAdd: 'easy',
  decimalSub: 'easy',
  geometry1: 'easy',
  geometry3: 'easy',
  geometry4: 'easy',
  unitConvert1: 'easy',
  unitConvert2: 'easy',
  unitConvert3: 'easy',
  
  // 提高题（5道）- 能力提升
  fractionMul: 'medium',
  fractionDiv: 'medium',
  linearEquation3: 'medium',
  pattern2: 'medium',
  primeNumber: 'medium',
  gcd: 'medium',
  lcm: 'medium',
  ratio1: 'medium',
  wordProblem3: 'medium',
  wordProblem4: 'medium',
  decimalMul: 'medium',
  decimalDiv: 'medium',
  percentage1: 'medium',
  geometry2: 'medium',
  geometry5: 'medium',
  geometry6: 'medium',
  travelProblem: 'medium',
  engineeringProblem: 'medium',
  treePlanting: 'medium',
  mixedCalc1: 'medium',
  mixedCalc2: 'medium',
  
  // 挑战题（3道）- 思维拓展
  pattern3: 'hard',
  percentage2: 'hard',
  hardEquation: 'hard',
  hardFraction: 'hard',
  hardWordProblem: 'hard',
  concentrationProblem: 'hard',
  chickenRabbit: 'hard',
  profitLoss: 'hard',
  mixedCalc3: 'hard'
};

// 生成数学题目 - 小升初难度分布：基础2道、提高5道、挑战3道
export function generateMathQuestions(_count: number = 10): Question[] {
  const questions: Question[] = [];
  const selectedIndices: number[] = [];
  
  // 1. 优先使用用户上传的题目
  const userQuestions = getUserQuestions('math');
  
  // 按难度分类用户题目
  const userEasyQuestions = userQuestions.filter(q => q.difficulty === 'easy');
  const userMediumQuestions = userQuestions.filter(q => q.difficulty === 'medium');
  const userHardQuestions = userQuestions.filter(q => q.difficulty === 'hard');
  
  // 打乱用户题目顺序
  const shuffledUserEasy = [...userEasyQuestions].sort(() => Math.random() - 0.5);
  const shuffledUserMedium = [...userMediumQuestions].sort(() => Math.random() - 0.5);
  const shuffledUserHard = [...userHardQuestions].sort(() => Math.random() - 0.5);
  
  // 2. 按难度分布选择用户题目
  // 基础题（2道）
  for (let i = 0; i < 2 && shuffledUserEasy.length > 0; i++) {
    const question = shuffledUserEasy.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i);
  }
  
  // 提高题（5道）
  for (let i = 0; i < 5 && shuffledUserMedium.length > 0; i++) {
    const question = shuffledUserMedium.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i + 2);
  }
  
  // 挑战题（3道）
  for (let i = 0; i < 3 && shuffledUserHard.length > 0; i++) {
    const question = shuffledUserHard.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i + 7);
  }
  
  // 3. 如果用户题目不足，使用模板生成
  if (questions.length < 10) {
    // 按难度分类题目类型
    const easyTypes = Object.keys(mathQuestionDifficultyMap).filter(
      type => mathQuestionDifficultyMap[type] === 'easy'
    );
    const mediumTypes = Object.keys(mathQuestionDifficultyMap).filter(
      type => mathQuestionDifficultyMap[type] === 'medium'
    );
    const hardTypes = Object.keys(mathQuestionDifficultyMap).filter(
      type => mathQuestionDifficultyMap[type] === 'hard'
    );
    
    // 打乱各难度题目顺序
    const shuffledEasy = [...easyTypes].sort(() => Math.random() - 0.5);
    const shuffledMedium = [...mediumTypes].sort(() => Math.random() - 0.5);
    const shuffledHard = [...hardTypes].sort(() => Math.random() - 0.5);
    
    // 补基础题
    while (questions.length < 2) {
      const type = shuffledEasy[questions.length % shuffledEasy.length];
      const generator = mathQuestionTemplates[type as keyof typeof mathQuestionTemplates];
      const question = shuffleOptions(generator(questions.length + 1));
      questions.push(question);
      selectedIndices.push(questions.length - 1);
    }
    
    // 补提高题
    while (questions.length < 7) {
      const type = shuffledMedium[(questions.length - 2) % shuffledMedium.length];
      const generator = mathQuestionTemplates[type as keyof typeof mathQuestionTemplates];
      const question = shuffleOptions(generator(questions.length + 1));
      questions.push(question);
      selectedIndices.push(questions.length - 1);
    }
    
    // 补挑战题
    while (questions.length < 10) {
      const type = shuffledHard[(questions.length - 7) % shuffledHard.length];
      const generator = mathQuestionTemplates[type as keyof typeof mathQuestionTemplates];
      const question = shuffleOptions(generator(questions.length + 1));
      questions.push(question);
      selectedIndices.push(questions.length - 1);
    }
  }
  
  // 4. 验证题目质量
  const validationResult = validateQuestions(questions);
  if (!validationResult.isValid) {
    console.warn('题目质量验证失败:', validationResult.errors);
  }
  if (validationResult.warnings.length > 0) {
    console.warn('题目质量警告:', validationResult.warnings);
  }
  
  // 5. 保存已生成的类型和内容哈希（动态窗口内不重复）
  saveGeneratedIndices(SUBJECT_NAME, selectedIndices, questions);
  
  return questions;
}

// 清除生成记录
export function clearMathGenerated() {
  localStorage.removeItem('question_generated_history');
}
