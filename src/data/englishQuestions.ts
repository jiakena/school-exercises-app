import type { Question } from '@/types';

// 英语完型填空题库 - 覆盖小学全面语法知识点
export const englishQuestionBank: Omit<Question, 'id'>[] = [
  // ========== be动词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'My name ___ Tom. I am a student.',
    options: ['is', 'am', 'are', 'be'],
    answer: 'is',
    explanation: '主语"My name"是第三人称单数，be动词用is。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I ___ a boy. I like playing football.',
    options: ['am', 'is', 'are', 'be'],
    answer: 'am',
    explanation: '主语I搭配be动词am。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'They ___ good friends.',
    options: ['are', 'is', 'am', 'be'],
    answer: 'are',
    explanation: '主语They是复数，be动词用are。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'There ___ some water in the glass.',
    options: ['is', 'are', 'have', 'has'],
    answer: 'is',
    explanation: 'water是不可数名词，there be句型中用is。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'There ___ many books on the desk.',
    options: ['are', 'is', 'have', 'has'],
    answer: 'are',
    explanation: 'books是可数名词复数，there be句型中用are。'
  },
  
  // ========== 一般现在时 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    answer: 'go',
    explanation: '主语I是第一人称，一般现在时用动词原形go。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'She ___ English very well.',
    options: ['speaks', 'speak', 'speaking', 'spoke'],
    answer: 'speaks',
    explanation: '主语She是第三人称单数，动词要加-s。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'My father ___ newspapers in the morning.',
    options: ['reads', 'read', 'reading', 'is reading'],
    answer: 'reads',
    explanation: '主语My father是第三人称单数，一般现在时动词加-s。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'We often ___ basketball after school.',
    options: ['play', 'plays', 'playing', 'played'],
    answer: 'play',
    explanation: '主语We是复数，一般现在时用动词原形。'
  },
  
  // ========== 现在进行时 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'Look! The children ___ in the playground.',
    options: ['are playing', 'play', 'plays', 'played'],
    answer: 'are playing',
    explanation: 'Look!提示动作正在进行，用现在进行时be + doing。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'She ___ a book now.',
    options: ['is reading', 'reads', 'read', 'reading'],
    answer: 'is reading',
    explanation: 'now表示现在进行时，结构为be + doing。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'Listen! Someone ___ at the door.',
    options: ['is knocking', 'knocks', 'knocking', 'knocked'],
    answer: 'is knocking',
    explanation: 'Listen!提示动作正在进行，用现在进行时。'
  },
  
  // ========== 一般过去时 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'I ___ to Beijing last summer.',
    options: ['went', 'go', 'goes', 'going'],
    answer: 'went',
    explanation: 'last summer表示过去时间，用一般过去时，go的过去式是went。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'She ___ a new dress yesterday.',
    options: ['bought', 'buy', 'buys', 'buying'],
    answer: 'bought',
    explanation: 'yesterday表示过去时间，buy的过去式是bought。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'They ___ a film last night.',
    options: ['saw', 'see', 'sees', 'seeing'],
    answer: 'saw',
    explanation: 'last night表示过去时间，see的过去式是saw。'
  },
  
  // ========== 一般将来时 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'I ___ visit my grandparents tomorrow.',
    options: ['will', 'am', 'was', 'do'],
    answer: 'will',
    explanation: 'tomorrow表示将来时间，用will + 动词原形表示将来。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'We ___ going to have a party next week.',
    options: ['are', 'is', 'am', 'be'],
    answer: 'are',
    explanation: 'be going to表示计划好的将来，主语We用are。'
  },
  
  // ========== 助动词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ you like apples?',
    options: ['Do', 'Does', 'Are', 'Is'],
    answer: 'Do',
    explanation: '主语you是第二人称，一般疑问句用助动词Do开头。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ he go to school by bus?',
    options: ['Does', 'Do', 'Is', 'Are'],
    answer: 'Does',
    explanation: '主语he是第三人称单数，一般疑问句用助动词Does开头。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ she watching TV now?',
    options: ['Is', 'Does', 'Do', 'Are'],
    answer: 'Is',
    explanation: 'now表示现在进行时，一般疑问句把be动词提前。'
  },
  
  // ========== 情态动词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I ___ swim. I am very happy.',
    options: ['can', 'am', 'do', 'will'],
    answer: 'can',
    explanation: 'can表示能力，意思是"会游泳"。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'You ___ eat too much candy. It is bad for your teeth.',
    options: ['should not', 'can not', 'do not', 'will not'],
    answer: 'should not',
    explanation: 'should not表示不应该，劝告对方不要吃太多糖。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ I use your pen? Mine is broken.',
    options: ['May', 'Do', 'Are', 'Will'],
    answer: 'May',
    explanation: 'May表示请求许可，语气比Can更礼貌。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'You ___ finish your homework first.',
    options: ['must', 'can', 'may', 'will'],
    answer: 'must',
    explanation: 'must表示必须，强调必要性。'
  },
  
  // ========== 代词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'This is my book. ___ is on the desk.',
    options: ['Yours', 'Your', 'You', 'Yours'],
    answer: 'Yours',
    explanation: 'Yours是名词性物主代词，相当于your book。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ is that girl? She is my sister.',
    options: ['Who', 'What', 'Where', 'How'],
    answer: 'Who',
    explanation: 'Who用于询问人，意思是"谁"。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'The book is ___. I bought it yesterday.',
    options: ['mine', 'my', 'me', 'I'],
    answer: 'mine',
    explanation: 'mine是名词性物主代词，相当于my book。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ pen is this? It is Toms.',
    options: ['Whose', 'Who', 'Which', 'What'],
    answer: 'Whose',
    explanation: 'Whose用于询问所属关系，意思是"谁的"。'
  },
  
  // ========== 介词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I was born ___ 2010.',
    options: ['in', 'on', 'at', 'by'],
    answer: 'in',
    explanation: '年份前用介词in。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'We have classes ___ Monday to Friday.',
    options: ['from', 'in', 'at', 'on'],
    answer: 'from',
    explanation: 'from...to...表示"从...到..."。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'Do not be late ___ school.',
    options: ['for', 'to', 'at', 'in'],
    answer: 'for',
    explanation: 'be late for是固定搭配，意思是"迟到"。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'The cat is hiding ___ the bed.',
    options: ['under', 'on', 'in', 'at'],
    answer: 'under',
    explanation: 'under表示"在...下面"。'
  },
  
  // ========== 形容词副词比较级 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'Tom is ___ than his brother.',
    options: ['taller', 'tall', 'tallest', 'the tallest'],
    answer: 'taller',
    explanation: 'than是比较级的标志，tall的比较级是taller。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'She runs ___ of all the girls.',
    options: ['fastest', 'faster', 'fast', 'the faster'],
    answer: 'fastest',
    explanation: 'of all表示范围，用最高级，fast的最高级是fastest。'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: 'The ___ you work, the ___ progress you will make.',
    options: ['harder; more', 'hard; more', 'harder; much', 'hard; much'],
    answer: 'harder; more',
    explanation: 'the+比较级...the+比较级...表示"越...越..."。'
  },
  
  // ========== 连词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I like apples ___ bananas.',
    options: ['and', 'but', 'or', 'so'],
    answer: 'and',
    explanation: 'and表示并列关系，连接两个并列成分。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I like him, ___ I do not trust him.',
    options: ['but', 'and', 'or', 'so'],
    answer: 'but',
    explanation: 'but表示转折关系，意思是"但是"。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'Hurry up, ___ you will be late.',
    options: ['or', 'and', 'but', 'so'],
    answer: 'or',
    explanation: 'or表示"否则"，警告不这样做的后果。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'It was raining, ___ we stayed at home.',
    options: ['so', 'but', 'or', 'and'],
    answer: 'so',
    explanation: 'so表示因果关系，意思是"所以"。'
  },
  
  // ========== 冠词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'This is ___ apple. It is red.',
    options: ['an', 'a', 'the', 'no article'],
    answer: 'an',
    explanation: 'apple以元音音素开头，用不定冠词an。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'He is ___ tallest boy in our class.',
    options: ['the', 'a', 'an', 'no article'],
    answer: 'the',
    explanation: '形容词最高级前用定冠词the。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'I play ___ basketball every afternoon.',
    options: ['no article', 'the', 'a', 'an'],
    answer: 'no article',
    explanation: '球类运动前一般不加冠词。'
  },
  
  // ========== 被动语态 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'The book ___ by Mark Twain.',
    options: ['was written', 'wrote', 'writes', 'written'],
    answer: 'was written',
    explanation: '书是被写的，用被动语态be + 过去分词。'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: 'The house ___ last year.',
    options: ['was built', 'built', 'is built', 'builds'],
    answer: 'was built',
    explanation: 'last year表示过去，房子是被建造的，用一般过去时的被动语态。'
  },
  
  // ========== 宾语从句 ==========
  {
    subject: 'english',
    difficulty: 'hard',
    content: 'I do not know ___ he will come.',
    options: ['if', 'that', 'what', 'how'],
    answer: 'if',
    explanation: 'if表示"是否"，引导宾语从句。'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: 'Can you tell me ___ the hospital is?',
    options: ['where', 'what', 'which', 'who'],
    answer: 'where',
    explanation: 'where询问地点，引导宾语从句。'
  },
  
  // ========== 条件状语从句 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'If it ___ tomorrow, we will go hiking.',
    options: ['does not rain', 'will not rain', 'not rain', 'do not rain'],
    answer: 'does not rain',
    explanation: 'if引导的条件状语从句，主句用将来时，从句用一般现在时。'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: 'If I ___ you, I would study harder.',
    options: ['were', 'am', 'was', 'be'],
    answer: 'were',
    explanation: '虚拟语气中，与现在事实相反，be动词用were。'
  },

  // ========== 名词单复数 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'There are three ___ on the desk.',
    options: ['books', 'book', 'bookes', 'books'],
    answer: 'books',
    explanation: 'three表示复数，book的复数是books。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I have two ___.',
    options: ['feet', 'foot', 'foots', 'feets'],
    answer: 'feet',
    explanation: 'foot的复数是不规则变化feet。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'There are many ___ in the zoo.',
    options: ['children', 'childs', 'child', 'childrens'],
    answer: 'children',
    explanation: 'child的复数是不规则变化children。'
  },

  // ========== 不定代词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I have ___ apples. Would you like one?',
    options: ['some', 'any', 'much', 'a'],
    answer: 'some',
    explanation: 'some用于肯定句，any用于否定句和疑问句。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'Do you have ___ questions?',
    options: ['any', 'some', 'much', 'a'],
    answer: 'any',
    explanation: '疑问句中用any表示"一些"。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'There is not ___ water in the bottle.',
    options: ['any', 'some', 'many', 'a'],
    answer: 'any',
    explanation: '否定句中用any表示"一些"。'
  },

  // ========== 数词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'There are ___ days in a week.',
    options: ['seven', 'seventh', 'sevens', 'sevenths'],
    answer: 'seven',
    explanation: '表示数量用基数词seven。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'October is the ___ month of a year.',
    options: ['tenth', 'ten', 'tens', 'tenth'],
    answer: 'tenth',
    explanation: '表示顺序用序数词tenth。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'My birthday is on June ___.',
    options: ['the first', 'one', 'first', 'a first'],
    answer: 'the first',
    explanation: '日期用序数词，前面加the，June the first。'
  },

  // ========== 疑问句 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ is your father? He is a doctor.',
    options: ['What', 'Who', 'Where', 'How'],
    answer: 'What',
    explanation: 'What is...?询问职业，意思是"你爸爸是做什么的？"。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ is your name? My name is Tom.',
    options: ['What', 'Who', 'Where', 'How'],
    answer: 'What',
    explanation: 'What is your name?询问名字。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ do you go to school? By bus.',
    options: ['How', 'What', 'Where', 'When'],
    answer: 'How',
    explanation: 'How询问方式，意思是"怎样"。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ do you get up every day? At 6 oclock.',
    options: ['When', 'What', 'How', 'Where'],
    answer: 'When',
    explanation: 'When询问时间，意思是"什么时候"。'
  },

  // ========== 感叹句 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ beautiful flower it is!',
    options: ['What a', 'What', 'How', 'How a'],
    answer: 'What a',
    explanation: 'What a + 形容词 + 单数名词 + 主谓！'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '___ fast he runs!',
    options: ['How', 'What', 'What a', 'How a'],
    answer: 'How',
    explanation: 'How + 形容词/副词 + 主谓！'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: '___ interesting books they are!',
    options: ['What', 'What a', 'How', 'How a'],
    answer: 'What',
    explanation: 'What + 形容词 + 复数名词 + 主谓！'
  },

  // ========== 祈使句 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ quiet, please.',
    options: ['Be', 'Is', 'Are', 'Am'],
    answer: 'Be',
    explanation: '祈使句以动词原形开头，Be quiet表示"安静"。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: '___ open the window. It is cold.',
    options: ['Do not', 'Does not', 'Not', 'No'],
    answer: 'Do not',
    explanation: '否定祈使句用Do not + 动词原形。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'Let us ___ to the park.',
    options: ['go', 'going', 'to go', 'goes'],
    answer: 'go',
    explanation: 'Let us + 动词原形，表示建议。'
  },

  // ========== 频率副词 ==========
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'I ___ go to school by bus. (always)',
    options: ['always', 'usually', 'sometimes', 'never'],
    answer: 'always',
    explanation: 'always表示"总是"，频率最高。'
  },
  {
    subject: 'english',
    difficulty: 'easy',
    content: 'She ___ helps her mother. (never)',
    options: ['never', 'always', 'often', 'usually'],
    answer: 'never',
    explanation: 'never表示"从不"，频率为0。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: 'He ___ watches TV on weekends. (sometimes)',
    options: ['sometimes', 'always', 'never', 'usually'],
    answer: 'sometimes',
    explanation: 'sometimes表示"有时"，频率较低。'
  }
];

import { 
  getGeneratedIndices, 
  saveGeneratedIndices, 
  shuffleOptions,
  clearSubjectHistory 
} from './questionHistory';

const SUBJECT_NAME = 'english';

// 生成英语题目 - 7天去重 + 选项随机打乱
export function generateEnglishQuestions(_count: number = 10): Question[] {
  const generatedIndices = getGeneratedIndices(SUBJECT_NAME);
  const availableIndices = englishQuestionBank.map((_, i) => i).filter(i => !generatedIndices.includes(i));
  
  // 如果可用题目不足，重置记录
  if (availableIndices.length < 10) {
    clearSubjectHistory(SUBJECT_NAME);
    availableIndices.length = 0;
    for (let i = 0; i < englishQuestionBank.length; i++) {
      availableIndices.push(i);
    }
  }
  
  // 按难度分布选择
  const easyIndices = availableIndices.filter(i => englishQuestionBank[i].difficulty === 'easy');
  const mediumIndices = availableIndices.filter(i => englishQuestionBank[i].difficulty === 'medium');
  const hardIndices = availableIndices.filter(i => englishQuestionBank[i].difficulty === 'hard');
  
  const selectedIndices: number[] = [];
  const questions: Question[] = [];
  
  // 选择4道简单题
  for (let i = 0; i < 4 && easyIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * easyIndices.length);
    const selectedIndex = easyIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...englishQuestionBank[selectedIndex],
      id: i + 1
    };
    questions.push(shuffleOptions(question));
  }
  
  // 选择4道中等题
  for (let i = 0; i < 4 && mediumIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * mediumIndices.length);
    const selectedIndex = mediumIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...englishQuestionBank[selectedIndex],
      id: i + 5
    };
    questions.push(shuffleOptions(question));
  }
  
  // 选择2道困难题
  for (let i = 0; i < 2 && hardIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * hardIndices.length);
    const selectedIndex = hardIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...englishQuestionBank[selectedIndex],
      id: i + 9
    };
    questions.push(shuffleOptions(question));
  }
  
  // 保存已生成的索引
  saveGeneratedIndices(SUBJECT_NAME, selectedIndices);
  
  return questions;
}

// 清除生成记录
export function clearEnglishGenerated() {
  clearSubjectHistory(SUBJECT_NAME);
}
