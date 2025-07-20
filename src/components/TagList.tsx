import { Badge } from "@/components/ui/badge";
import { useId, type KeyboardEvent, createElement, memo, useCallback, useMemo } from "react";

const SAMPLE_TAGS = [
  "Development", "Design", "Marketing", "Business", "Technology",
  "Writing", "Photography", "Travel", "Food", "Health"
];

interface TagListProps {
  title?: string;
  tags?: readonly string[];
  onTagClick?: (tag: string) => void;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  maxItems?: number;
  showMoreText?: string;
  className?: string;
  ariaLabel?: string;
  clickable?: boolean;
  showTitle?: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  keyboardNavigation?: boolean;
}

export const TagList = memo(function TagList({ 
  title = "Popular Tags",
  tags = SAMPLE_TAGS,
  variant = "default",
  size = "md",
  clickable = false,
  onTagClick,
  showTitle = true,
  titleLevel = 2,
  ariaLabel,
  keyboardNavigation = true,
  maxItems,
  className = ""
}: TagListProps) {
  const titleId = useId();
  const listId = useId();
  
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, tag: string) => {
    if (keyboardNavigation && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (clickable && onTagClick) {
        onTagClick(tag);
      }
    }
  }, [keyboardNavigation, clickable, onTagClick]);
  
  const handleTagClick = useCallback((tag: string) => {
    if (clickable && onTagClick) {
      onTagClick(tag);
    }
  }, [clickable, onTagClick]);

  // Memoize display tags to prevent unnecessary array operations
  const displayTags = useMemo(() => {
    return maxItems ? tags.slice(0, maxItems) : tags;
  }, [tags, maxItems]);

  // Memoize size-based class names
  const tagSizeClasses = useMemo(() => {
    const sizeMap = {
      sm: "text-xs px-2 py-1",
      md: "",
      lg: "text-base px-4 py-2"
    };
    return sizeMap[size];
  }, [size]);

  return (
    <section 
      className={`space-y-4 max-w-5xl mx-auto ${className}`}
      aria-labelledby={showTitle ? titleId : undefined}
      aria-label={!showTitle ? ariaLabel || title : undefined}
    >
      {showTitle && (
        createElement(
          `h${titleLevel}`,
          { 
            id: titleId,
            className: "text-2xl font-bold text-white"
          },
          title
        )
      )}
      
      <div 
        id={listId}
        role="list"
        aria-label={ariaLabel || `${title} list`}
        className="flex flex-wrap gap-2"
      >
        {displayTags.map((tag) => (
          <div key={tag} role="listitem">
            {clickable ? (
              <button
                onClick={() => handleTagClick(tag)}
                onKeyDown={(e) => handleKeyDown(e, tag)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-label={`Select tag: ${tag}`}
              >
                <Badge 
                  variant={variant}
                  className={`
                    transition-colors hover:bg-gray-700 bg-[#293038] px-3 py-2 hover:text-white text-[#9eabb8] cursor-pointer
                    ${tagSizeClasses}
                  `}
                >
                  {tag}
                </Badge>
              </button>
            ) : (
              <Badge 
                variant={variant}
                className={tagSizeClasses}
              >
                {tag}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});