import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export function ExpandableText({ text, maxLength = 150, className = "" }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className={className}>
      <p className="leading-relaxed">{isExpanded ? text : `${text.slice(0, maxLength)}...`}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 cursor-pointer text-primary hover:text-primary/80 active:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
      >
        {isExpanded ? (
          <>
            Show less <ChevronUp className="h-3 w-3" />
          </>
        ) : (
          <>
            Read more <ChevronDown className="h-3 w-3" />
          </>
        )}
      </button>
    </div>
  );
}
