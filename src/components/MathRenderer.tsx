import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
  block?: boolean;
}

/**
 * 转义 LaTeX 中的特殊字符
 * 将普通文本中的特殊字符转义，避免被解析为 LaTeX 命令
 */
function escapeLatex(text: string): string {
  // 先检查是否包含 LaTeX 数学公式标记
  const hasLatexFormula = /\\(frac|sqrt|sum|prod|int|lim|infty|pi|alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|pm|times|div|cdot|leq|geq|neq|approx|equiv|rightarrow|leftarrow|Rightarrow|Leftarrow|in|subset|cup|cap|emptyset|forall|exists|nabla|partial|infty)/.test(text);
  
  if (!hasLatexFormula) {
    // 如果没有 LaTeX 公式，将整个文本包裹在 \text{} 中
    // 但需要先转义特殊字符
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/%/g, '\\%')
      .replace(/&/g, '\\&')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\textasciicircum{}');
  }
  
  // 如果包含 LaTeX 公式，需要更复杂的处理
  // 将文本和公式分开处理
  // 这里使用简单的策略：保留已有的 LaTeX 命令，只转义普通文本中的特殊字符
  return text
    .replace(/([^\\])%/g, '$1\\%')  // 转义 %，但不转义 \%
    .replace(/([^\\])&/g, '$1\\&')  // 转义 &，但不转义 \&
    .replace(/([^\\])\$/g, '$1\\$'); // 转义 $，但不转义 \$
}

export default function MathRenderer({ content, block = false }: MathRendererProps) {
  try {
    // 转义特殊字符
    const escapedContent = escapeLatex(content);
    
    if (block) {
      return <BlockMath math={escapedContent} />;
    } else {
      return <InlineMath math={escapedContent} />;
    }
  } catch (error) {
    console.error('Math rendering error:', error);
    return <span>{content}</span>;
  }
}
