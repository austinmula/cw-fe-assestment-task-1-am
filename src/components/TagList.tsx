import { Badge } from "@/components/ui/badge";

interface TagListProps {
  title: string;
  tags: string[];
  onTagClick?: (tag: string) => void;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  maxItems?: number;
  showMoreText?: string;
  className?: string;
}

export function TagList({ 
  title, 
  tags, 
  onTagClick,
  variant = "default",
  size = "md",
  maxItems,
  showMoreText = "Show more...",
  className = ""
}: TagListProps) {
  const displayTags = maxItems ? tags.slice(0, maxItems) : tags;
  const hasMoreTags = maxItems && tags.length > maxItems;

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-1";
      case "lg":
        return "text-base px-4 py-2";
      default:
        return "text-sm px-3 py-1.5";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "bg-transparent border border-gray-600 text-white hover:border-gray-400";
      case "secondary":
        return "bg-gray-700 text-white hover:bg-gray-600";
      default:
        return "bg-gray-800 text-white hover:bg-gray-700";
    }
  };

  return (
    <div className={`mt-8 px-6 max-w-5xl mx-auto ${className}`}>
      <div className="text-white text-lg font-semibold mb-4">{title}</div>
      <div className="flex flex-wrap gap-3">
        {displayTags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`
              ${getVariantClasses()} 
              ${getSizeClasses()} 
              ${onTagClick ? 'cursor-pointer' : 'cursor-default'}
              transition-colors duration-200
            `}
          >
            {tag}
          </Badge>
        ))}
        {hasMoreTags && (
          <Badge
            variant="outline"
            className="cursor-pointer text-gray-400 border-gray-600 hover:border-gray-400"
            onClick={() => {
              // Could trigger a callback to show all tags
              console.log(`${tags.length - maxItems!} more tags available`);
            }}
          >
            {showMoreText}
          </Badge>
        )}
      </div>
    </div>
  );
}
