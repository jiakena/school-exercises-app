

interface GeometryProps {
  type: 'triangle' | 'circle' | 'square' | 'rectangle' | 'line' | 'polygon';
  width?: number;
  height?: number;
  radius?: number;
  points?: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  annotations?: Array<{
    x: number;
    y: number;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export default function GeometryRenderer({ 
  type, 
  width = 200, 
  height = 200, 
  radius = 50, 
  points = '', 
  stroke = '#000000', 
  fill = 'none', 
  strokeWidth = 2, 
  annotations = [] 
}: GeometryProps) {
  const renderShape = () => {
    switch (type) {
      case 'circle':
        return (
          <circle 
            cx={width / 2} 
            cy={height / 2} 
            r={radius} 
            stroke={stroke} 
            fill={fill} 
            strokeWidth={strokeWidth} 
          />
        );
      case 'square':
        const squareSize = Math.min(width, height) * 0.8;
        const squareX = (width - squareSize) / 2;
        const squareY = (height - squareSize) / 2;
        return (
          <rect 
            x={squareX} 
            y={squareY} 
            width={squareSize} 
            height={squareSize} 
            stroke={stroke} 
            fill={fill} 
            strokeWidth={strokeWidth} 
          />
        );
      case 'rectangle':
        const rectWidth = width * 0.8;
        const rectHeight = height * 0.6;
        const rectX = (width - rectWidth) / 2;
        const rectY = (height - rectHeight) / 2;
        return (
          <rect 
            x={rectX} 
            y={rectY} 
            width={rectWidth} 
            height={rectHeight} 
            stroke={stroke} 
            fill={fill} 
            strokeWidth={strokeWidth} 
          />
        );
      case 'triangle':
        const triangleSize = Math.min(width, height) * 0.8;
        const triangleX = width / 2;
        const triangleY = (height - triangleSize) / 2;
        return (
          <polygon 
            points={`${triangleX},${triangleY} ${triangleX - triangleSize/2},${triangleY + triangleSize} ${triangleX + triangleSize/2},${triangleY + triangleSize}`} 
            stroke={stroke} 
            fill={fill} 
            strokeWidth={strokeWidth} 
          />
        );
      case 'line':
        return (
          <line 
            x1={width * 0.2} 
            y1={height * 0.2} 
            x2={width * 0.8} 
            y2={height * 0.8} 
            stroke={stroke} 
            strokeWidth={strokeWidth} 
          />
        );
      case 'polygon':
        return (
          <polygon 
            points={points} 
            stroke={stroke} 
            fill={fill} 
            strokeWidth={strokeWidth} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg width={width} height={height} className="mx-auto">
      {renderShape()}
      {annotations.map((annotation, index) => {
        let textX = annotation.x;
        let textY = annotation.y;
        
        switch (annotation.position) {
          case 'top':
            textY -= 10;
            break;
          case 'bottom':
            textY += 20;
            break;
          case 'left':
            textX -= 5;
            textY += 5;
            break;
          case 'right':
            textX += 5;
            textY += 5;
            break;
        }
        
        return (
          <g key={index}>
            <circle 
              cx={annotation.x} 
              cy={annotation.y} 
              r={3} 
              fill={stroke} 
            />
            <text 
              x={textX} 
              y={textY} 
              fontSize="12" 
              fill="#333" 
              textAnchor={annotation.position === 'left' ? 'end' : 'start'}
            >
              {annotation.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
