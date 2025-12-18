import { useState } from 'react';

type Annotation = {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage width
  height: number; // percentage height
  label: string;
  type: 'error' | 'highlight';
};

type AnnotatedResumeProps = {
  imageSrc: string;
  alt: string;
  annotations: Annotation[];
  showAnnotations?: boolean;
};

const AnnotatedResume = ({ imageSrc, alt, annotations, showAnnotations = true }: AnnotatedResumeProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <img 
        src={imageSrc} 
        alt={alt} 
        className="w-full rounded-lg border border-border"
      />
      
      {showAnnotations && annotations.map((annotation) => (
        <div key={annotation.id}>
          {/* Annotation box */}
          <div
            className={`absolute border-2 border-dashed rounded transition-all ${
              annotation.type === 'error' 
                ? 'border-destructive bg-destructive/5' 
                : 'border-gold bg-gold/5'
            } ${isHovered === annotation.id ? 'bg-opacity-20' : ''}`}
            style={{
              left: `${annotation.x}%`,
              top: `${annotation.y}%`,
              width: `${annotation.width}%`,
              height: `${annotation.height}%`,
            }}
            onMouseEnter={() => setIsHovered(annotation.id)}
            onMouseLeave={() => setIsHovered(null)}
          />
          
          {/* Number badge */}
          <div
            className="absolute w-6 h-6 rounded-full bg-gold text-foreground text-xs font-bold flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${annotation.x + annotation.width}%`,
              top: `${annotation.y}%`,
            }}
          >
            {annotation.id}
          </div>
          
          {/* Tooltip on hover */}
          {isHovered === annotation.id && (
            <div
              className="absolute z-10 bg-foreground text-background text-xs px-2 py-1 rounded shadow-lg max-w-48 whitespace-normal"
              style={{
                left: `${annotation.x + annotation.width + 2}%`,
                top: `${annotation.y}%`,
              }}
            >
              {annotation.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnotatedResume;
