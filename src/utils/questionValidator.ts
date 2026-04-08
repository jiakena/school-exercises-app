import type { Question } from '@/types';

/**
 * 题目质量验证结果
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 验证题目质量
 */
export function validateQuestion(question: Question): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 验证基本信息
  if (!question.content || question.content.trim() === '') {
    errors.push('题目内容不能为空');
  } else {
    // 检查题目内容是否完整（至少包含一个完整的句子或问题）
    const content = question.content.trim();
    
    // 检查是否以问号、句号、感叹号或特定关键词结尾
    const validEndings = /[。？！?]$/;
    const validKeywords = /(是多少|等于|选择|填空|计算|解|问|哪|什么|谁|怎么|为什么|如何|请|把|将|用|根据|按照|如果|假设)/;
    
    if (!validEndings.test(content) && !validKeywords.test(content)) {
      errors.push('题目内容可能不完整，缺少结尾标点或关键词');
    }
    
    // 检查题目长度是否合理（至少5个字符）
    if (content.length < 5) {
      errors.push('题目内容过短，可能不完整');
    }
    
    // 检查是否有明显的截断模式
    const truncationPatterns = [
      /求\d+的\d+$/,  // 如"求95的5"
      /\d+的\d+%$/,  // 如"95的5%"（缺少"是多少"）
      /计算.*\d+$/,  // 以数字结尾的计算题
      /[是|为|等于]$/,  // 以"是"、"为"、"等于"结尾
    ];
    
    for (const pattern of truncationPatterns) {
      if (pattern.test(content)) {
        errors.push(`题目内容可能被截断: "${content}"`);
        break;
      }
    }
  }

  if (!question.answer || question.answer.trim() === '') {
    errors.push('题目答案不能为空');
  }

  if (!question.explanation || question.explanation.trim() === '') {
    warnings.push('题目解析建议添加');
  }

  // 验证选项
  if (question.options) {
    if (question.options.length < 2) {
      errors.push('选择题至少需要2个选项');
    }

    if (question.options.length > 4) {
      warnings.push('选择题建议不超过4个选项');
    }

    // 检查选项是否包含答案
    const answerInOptions = question.options.some(option => 
      option.trim() === question.answer.trim()
    );
    if (!answerInOptions) {
      errors.push('答案必须在选项中');
    }

    // 检查选项是否重复
    const uniqueOptions = new Set(question.options.map(opt => opt.trim()));
    if (uniqueOptions.size !== question.options.length) {
      warnings.push('选项存在重复');
    }
  }

  // 验证数学题
  if (question.subject === 'math') {
    // 检查数学表达式是否正确
    if (question.content.includes('\\frac') || question.content.includes('\\sqrt')) {
      // 简单检查LaTeX语法
      const latexPattern = /\\frac\{[^}]+\}\{[^}]+\}|\\sqrt\{[^}]+\}/g;
      const matches = question.content.match(latexPattern);
      if (matches) {
        // 检查括号是否匹配
        matches.forEach(match => {
          const openBrackets = (match.match(/\{/g) || []).length;
          const closeBrackets = (match.match(/\}/g) || []).length;
          if (openBrackets !== closeBrackets) {
            warnings.push('数学表达式可能存在括号不匹配的问题');
          }
        });
      }
    }

    // 检查几何图形信息
    if (question.geometry) {
      if (!question.geometry.type) {
        warnings.push('几何图形类型未指定');
      }
      if (question.geometry.type === 'circle' && !question.geometry.radius) {
        warnings.push('圆形几何图形缺少半径信息');
      }
    }
  }

  // 验证语文题
  if (question.subject === 'chinese') {
    // 检查文言文题目是否有足够的上下文
    if (question.content.includes('文言文')) {
      if (question.content.length < 50) {
        warnings.push('文言文题目建议提供更多上下文');
      }
    }
  }

  // 验证英语题
  if (question.subject === 'english') {
    const content = question.content;
    
    // 检查完形填空题目是否完整
    if (content.includes('完形填空')) {
      if (!content.includes('(') || !content.includes(')')) {
        warnings.push('完形填空题目建议提供备选答案');
      }
    }
    
    // 检查中英文混杂问题
    const chineseChars = /[\u4e00-\u9fa5]/;
    const englishWords = /[a-zA-Z]{3,}/;
    
    if (chineseChars.test(content) && englishWords.test(content)) {
      // 检查是否是不应该出现的中英文混杂
      // 允许特定情况：如"完形填空"、"将下列句子"等中文提示语
      const allowedChinesePatterns = /^(完形填空|将下列句子|对划线部分|把下列句子|选择正确的|用所给词的|根据汉语意思|根据首字母|从方框中选择|阅读短文|根据短文内容)/;
      
      if (!allowedChinesePatterns.test(content)) {
        // 检查是否包含不应该出现的中文词汇
        const invalidMixedPattern = /[\u4e00-\u9fa5]+[a-zA-Z]+|[a-zA-Z]+[\u4e00-\u9fa5]+/;
        if (invalidMixedPattern.test(content)) {
          errors.push(`英语题目出现中英文混杂: "${content.substring(0, 50)}..."`);
        }
      }
    }
    
    // 检查英语题目是否以英文标点或特定词结尾
    const validEnglishEnding = /[?.!:]$/;
    const validEnglishWords = /(choose|select|fill|complete|write|read|answer|what|which|who|where|when|why|how|is|are|was|were|do|does|did|can|could|will|would|should|may|might|have|has|had)$/i;
    
    if (!validEnglishEnding.test(content.trim()) && !validEnglishWords.test(content.trim())) {
      warnings.push('英语题目可能不完整，缺少结尾标点');
    }
    
    // 检查选项是否都是英文
    if (question.options) {
      const hasChineseInOptions = question.options.some(opt => chineseChars.test(opt));
      if (hasChineseInOptions) {
        warnings.push('英语题目选项中包含中文字符');
      }
    }
    
    // 检查答案是否都是英文
    if (question.answer && chineseChars.test(question.answer)) {
      warnings.push('英语题目答案中包含中文字符');
    }
    
    // 检查明显的语法错误模式
    const grammarErrors = [
      /\b(a|an|the)\s+(a|an|the)\b/i,  // 重复冠词
      /\b(is|are|was|were)\s+(is|are|was|were)\b/i,  // 重复be动词
      /\b(do|does|did)\s+(do|does|did)\b/i,  // 重复助动词
    ];
    
    for (const pattern of grammarErrors) {
      if (pattern.test(content)) {
        warnings.push('英语题目可能存在语法错误（重复单词）');
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 验证题目数组质量
 */
export function validateQuestions(questions: Question[]): ValidationResult {
  const overallErrors: string[] = [];
  const overallWarnings: string[] = [];

  questions.forEach((question, index) => {
    const result = validateQuestion(question);
    if (result.errors.length > 0) {
      overallErrors.push(`第${index + 1}题: ${result.errors.join(', ')}`);
    }
    if (result.warnings.length > 0) {
      overallWarnings.push(`第${index + 1}题: ${result.warnings.join(', ')}`);
    }
  });

  // 检查题目多样性
  const questionTypes = new Set(questions.map(q => q.content.substring(0, 10)));
  if (questionTypes.size < questions.length * 0.8) {
    overallWarnings.push('题目类型不够多样化');
  }

  // 检查难度分布
  const difficultyCounts = {
    easy: 0,
    medium: 0,
    hard: 0
  };

  questions.forEach(q => {
    if (difficultyCounts[q.difficulty as keyof typeof difficultyCounts] !== undefined) {
      difficultyCounts[q.difficulty as keyof typeof difficultyCounts]++;
    }
  });

  if (difficultyCounts.easy === 0) {
    overallWarnings.push('建议包含一些简单题目');
  }
  if (difficultyCounts.hard === 0) {
    overallWarnings.push('建议包含一些困难题目');
  }

  return {
    isValid: overallErrors.length === 0,
    errors: overallErrors,
    warnings: overallWarnings
  };
}
