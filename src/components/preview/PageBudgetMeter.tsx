import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PageBudgetMeterProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

// At standard 96 DPI print resolution, US Letter is 1056px tall.
// Minus standard 0.5in top/bottom padding (96px), usable single page is ~960px.
const US_LETTER_HEIGHT_PX = 1056;

export const PageBudgetMeter: React.FC<PageBudgetMeterProps> = ({ contentRef }) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    return () => observer.disconnect();
  }, [contentRef]);

  const pagePercentage = Math.round((height / US_LETTER_HEIGHT_PX) * 100);
  const isOverflowing = height > US_LETTER_HEIGHT_PX;
  const overflowLinesEstimate = isOverflowing ? Math.ceil((height - US_LETTER_HEIGHT_PX) / 22) : 0;

  return (
    <div className="flex items-center gap-2 text-xs">
      {isOverflowing ? (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium">
          <AlertTriangle size={13} />
          <span>⚠️ Overflowing: ~{overflowLinesEstimate} lines on Page 2 ({pagePercentage}%)</span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium">
          <CheckCircle2 size={13} />
          <span>Single Page Budget: {pagePercentage}% filled</span>
        </div>
      )}
    </div>
  );
};
