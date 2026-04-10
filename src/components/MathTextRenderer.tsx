


import MathRenderer from './MathRenderer';

interface MathTextRendererProps {
  content: string;
}

export default function MathTextRenderer({ content }: MathTextRendererProps) {
  // 首先处理 HTML 标签，将 HTML 实体替换为真实的 HTML 标签
  const contentWithHtml = content
    .replace(/&lt;u&gt;/g, '<u>')
    .replace(/&lt;\/u&gt;/g, '</u>')
    .replace(/&lt;br&gt;/g, '<br />')
    .replace(/&lt;strong&gt;/g, '<strong>')
    .replace(/&lt;\/strong&gt;/g, '</strong>')
    .replace(/&lt;em&gt;/g, '<em>')
    .replace(/&lt;\/em&gt;/g, '</em>')
    .replace(/&lt;span&gt;/g, '<span>')
    .replace(/&lt;\/span&gt;/g, '</span>');
  
  // 处理其他可能的 HTML 实体
  const contentWithDecodedEntities = contentWithHtml
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

  // 然后处理数学公式
  const mathRegex = /\$(.*?)\$/g;
  const parts = contentWithDecodedEntities.split(mathRegex);
  
  return (
    <span style={{
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      whiteSpace: 'normal',
      wordBreak: 'break-word'
    }}>
      {parts.map((part, index) => {
        // 偶数索引是普通文本（包含 HTML 标签），奇数索引是数学公式
        if (index % 2 === 0) {
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        } else {
          return <MathRenderer key={index} content={`$${part}$`} block={false} />;
        }
      })}
    </span>
  );
}