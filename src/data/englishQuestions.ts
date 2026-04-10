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
  },
  
  // ========== 完形填空 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: '完形填空：Hello, my name ___ Tom. I ___ a student. I like ___ football. Every day I go ___ school by bus. I ___ lunch at school. After school I ___ my homework. I ___ to bed at 9 oclock. (is, am, playing, to, have, do, go)',
    options: ['is, am, playing, to, have, do, go', 'am, is, play, at, has, does, goes', 'is, is, plays, in, have, does, go', 'am, am, playing, to, has, do, goes'],
    answer: 'is, am, playing, to, have, do, go',
    explanation: '考察基本的be动词、固定搭配和动词形式。Hello, my name is Tom. I am a student. I like playing football. Every day I go to school by bus. I have lunch at school. After school I do my homework. I go to bed at 9 oclock.'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '完形填空：It ___ Sunday today. I ___ at home. My parents ___ going to the park. I ___ going to the library. I like ___ books. There ___ many books in the library. I ___ read books there for two hours. (is, am, are, am, reading, are, will)',
    options: ['is, am, are, am, reading, are, will', 'is, is, are, is, read, is, am', 'are, am, is, am, reading, is, will', 'is, am, is, is, read, are, am'],
    answer: 'is, am, are, am, reading, are, will',
    explanation: '考察be动词、固定搭配和时态。It is Sunday today. I am at home. My parents are going to the park. I am going to the library. I like reading books. There are many books in the library. I will read books there for two hours.'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: '完形填空：Last summer I ___ to Beijing. I ___ the Great Wall. It ___ very long. I ___ many photos. I ___ some gifts for my friends. I ___ a good time. Beijing ___ a beautiful city. (went, visited, is, took, bought, had, is)',
    options: ['went, visited, is, took, bought, had, is', 'go, visit, was, take, buy, have, is', 'went, visit, was, took, buy, had, was', 'go, visited, is, take, bought, have, was'],
    answer: 'went, visited, is, took, bought, had, is',
    explanation: '考察一般过去时和基本动词用法。Last summer I went to Beijing. I visited the Great Wall. It is very long. I took many photos. I bought some gifts for my friends. I had a good time. Beijing is a beautiful city.'
  },
  
  // ========== 语句转换 ==========
  {
    subject: 'english',
    difficulty: 'medium',
    content: '将下列句子改为否定句：He likes apples.',
    options: ['He does not like apples.', 'He do not like apples.', 'He likes not apples.', 'He not likes apples.'],
    answer: 'He does not like apples.',
    explanation: '一般现在时的否定句，第三人称单数用does not + 动词原形。'
  },
  {
    subject: 'english',
    difficulty: 'medium',
    content: '将下列句子改为一般疑问句：They are students.',
    options: ['Are they students?', 'Do they students?', 'They are students?', 'Are they student?'],
    answer: 'Are they students?',
    explanation: 'be动词的一般疑问句，将be动词提前。'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: '对划线部分提问：I go to school by bus. (by bus)',
    options: ['How do you go to school?', 'What do you go to school?', 'How you go to school?', 'How do you go to school by?'],
    answer: 'How do you go to school?',
    explanation: '对方式提问用How，一般现在时的特殊疑问句结构为：疑问词 + do/does + 主语 + 动词原形 + 其他？'
  },
  {
    subject: 'english',
    difficulty: 'hard',
    content: '将下列句子改为现在进行时：She reads a book.',
    options: ['She is reading a book.', 'She reading a book.', 'She reads a book now.', 'She is read a book.'],
    answer: 'She is reading a book.',
    explanation: '现在进行时的结构为：be + 动词的现在分词。'
  }
];

import { 
  getGeneratedIndices, 
  saveGeneratedIndices, 
  shuffleOptions,
  clearSubjectHistory 
} from './questionHistory';

const SUBJECT_NAME = 'english';

// 从本地存储获取用户上传的题目
function getUserQuestions(subject: string): Question[] {
  try {
    const userQuestions = JSON.parse(localStorage.getItem('user_questions') || '[]');
    return userQuestions.filter((q: Question) => q.subject === subject);
  } catch {
    return [];
  }
}

// 小升初英语题目类型分类
const englishQuestionTypeMap: Record<number, 'basic' | 'comprehensive' | 'advanced'> = {
  // 基础题（2道）- be动词、一般现在时、基础语法
  0: 'basic', 1: 'basic', 2: 'basic', 3: 'basic', 4: 'basic',
  5: 'basic', 6: 'basic', 7: 'basic', 8: 'basic',
  
  // 综合题（5道）- 时态综合运用、介词、代词、连词、冠词、数词、疑问句等
  9: 'comprehensive', 10: 'comprehensive', 11: 'comprehensive',
  12: 'comprehensive', 13: 'comprehensive', 14: 'comprehensive',
  15: 'comprehensive', 16: 'comprehensive', 17: 'comprehensive',
  18: 'comprehensive', 19: 'comprehensive', 20: 'comprehensive',
  21: 'comprehensive', 22: 'comprehensive', 23: 'comprehensive',
  24: 'comprehensive', 25: 'comprehensive', 26: 'comprehensive',
  27: 'comprehensive', 28: 'comprehensive', 29: 'comprehensive',
  30: 'comprehensive', 31: 'comprehensive', 32: 'comprehensive',
  33: 'comprehensive', 34: 'comprehensive', 35: 'comprehensive',
  36: 'comprehensive', 37: 'comprehensive', 38: 'comprehensive',
  39: 'comprehensive', 40: 'comprehensive', 41: 'comprehensive',
  42: 'comprehensive', 43: 'comprehensive', 44: 'comprehensive',
  45: 'comprehensive', 46: 'comprehensive', 47: 'comprehensive',
  48: 'comprehensive', 49: 'comprehensive', 50: 'comprehensive',
  51: 'comprehensive', 52: 'comprehensive', 53: 'comprehensive',
  54: 'comprehensive', 55: 'comprehensive', 56: 'comprehensive',
  57: 'comprehensive', 58: 'comprehensive', 59: 'comprehensive',
  60: 'comprehensive', 61: 'comprehensive', 62: 'comprehensive',
  
  // 提升题（3道）- 完形填空、语句转换、综合应用
  63: 'advanced', 64: 'advanced', 65: 'advanced',
  66: 'advanced', 67: 'advanced', 68: 'advanced', 69: 'advanced'
};

// 生成英语题目 - 小升初难度分布：基础2道、综合5道、提升3道
export function generateEnglishQuestions(_count: number = 10): Question[] {
  const questions: Question[] = [];
  const selectedIndices: number[] = [];
  
  // 1. 优先使用用户上传的题目
  const userQuestions = getUserQuestions('english');
  
  // 按类型分类用户题目
  const userBasicQuestions = userQuestions.filter(q => q.difficulty === 'easy');
  const userComprehensiveQuestions = userQuestions.filter(q => q.difficulty === 'medium');
  const userAdvancedQuestions = userQuestions.filter(q => q.difficulty === 'hard');
  
  // 打乱用户题目顺序
  const shuffledUserBasic = [...userBasicQuestions].sort(() => Math.random() - 0.5);
  const shuffledUserComprehensive = [...userComprehensiveQuestions].sort(() => Math.random() - 0.5);
  const shuffledUserAdvanced = [...userAdvancedQuestions].sort(() => Math.random() - 0.5);
  
  // 2. 按难度分布选择用户题目
  // 基础题（2道）
  for (let i = 0; i < 2 && shuffledUserBasic.length > 0; i++) {
    const question = shuffledUserBasic.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i);
  }
  
  // 综合题（5道）
  for (let i = 0; i < 5 && shuffledUserComprehensive.length > 0; i++) {
    const question = shuffledUserComprehensive.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i + 2);
  }
  
  // 提升题（3道）
  for (let i = 0; i < 3 && shuffledUserAdvanced.length > 0; i++) {
    const question = shuffledUserAdvanced.pop()!;
    questions.push({
      ...question,
      id: questions.length + 1
    });
    selectedIndices.push(i + 7);
  }
  
  // 3. 如果用户题目不足，使用静态题库补充
  if (questions.length < 10) {
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
    
    // 按类型分类可用题目
    const basicIndices = availableIndices.filter(i => englishQuestionTypeMap[i] === 'basic');
    const comprehensiveIndices = availableIndices.filter(i => englishQuestionTypeMap[i] === 'comprehensive');
    const advancedIndices = availableIndices.filter(i => englishQuestionTypeMap[i] === 'advanced');
    
    // 补基础题
    while (questions.length < 2 && basicIndices.length > 0) {
      const randomIdx = Math.floor(Math.random() * basicIndices.length);
      const selectedIndex = basicIndices.splice(randomIdx, 1)[0];
      selectedIndices.push(selectedIndex);
      const question = {
        ...englishQuestionBank[selectedIndex],
        id: questions.length + 1
      };
      questions.push(shuffleOptions(question));
    }
    
    // 补综合题
    while (questions.length < 7 && comprehensiveIndices.length > 0) {
      const randomIdx = Math.floor(Math.random() * comprehensiveIndices.length);
      const selectedIndex = comprehensiveIndices.splice(randomIdx, 1)[0];
      selectedIndices.push(selectedIndex);
      const question = {
        ...englishQuestionBank[selectedIndex],
        id: questions.length + 1
      };
      questions.push(shuffleOptions(question));
    }
    
    // 补提升题
    while (questions.length < 10 && advancedIndices.length > 0) {
      const randomIdx = Math.floor(Math.random() * advancedIndices.length);
      const selectedIndex = advancedIndices.splice(randomIdx, 1)[0];
      selectedIndices.push(selectedIndex);
      const question = {
        ...englishQuestionBank[selectedIndex],
        id: questions.length + 1
      };
      questions.push(shuffleOptions(question));
    }
  }
  
  // 4. 保存已生成的索引
  saveGeneratedIndices(SUBJECT_NAME, selectedIndices);
  
  return questions;
}

// 清除生成记录
export function clearEnglishGenerated() {
  clearSubjectHistory(SUBJECT_NAME);
}
