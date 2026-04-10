import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
  block?: boolean;
}

export default function MathRenderer({ content, block = false }: MathRendererProps) {
  try {
    // 移除 $ 符号，KaTeX 不需要这些分隔符
    // 转义 % 符号，因为 % 在 LaTeX 中是注释符
    const cleanContent = content
      .replace(/\$/g, '')
      .replace(/%/g, '\\%');
    
    if (block) {
      return <div style={{ 
        maxWidth: '100%', 
        wordWrap: 'break-word', 
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        overflowX: 'hidden'
      }}><BlockMath math={cleanContent} /></div>;
    } else {
      return <span style={{ 
        maxWidth: '100%', 
        overflowWrap: 'break-word', 
        wordBreak: 'break-word'
      }}><InlineMath math={cleanContent} /></span>;
    }
  } catch (error) {
    console.error('Math rendering error:', error);
    return <span style={{ 
      maxWidth: '100%', 
      overflowWrap: 'break-word', 
      wordBreak: 'break-word'
    }}>{content}</span>;
  }
}
