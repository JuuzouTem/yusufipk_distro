import { Heart, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  onReset?: () => void;
  showReset?: boolean;
  disabled?: boolean;
}

export default function ActionButtons({
  onLike,
  onDislike,
  onReset,
  showReset = false,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <Button
        size="icon"
        variant="outline"
        className="h-16 w-16 rounded-full border-2 border-red-500/50 bg-transparent transition-all duration-200 hover:scale-110 hover:border-red-500 hover:bg-red-500/10"
        onClick={onDislike}
        disabled={disabled}
        data-testid="button-dislike"
      >
        <X className="h-8 w-8 text-red-500" />
      </Button>

      {showReset && onReset && (
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full border-2 border-yellow-500/50 bg-transparent transition-all duration-200 hover:scale-110 hover:border-yellow-500 hover:bg-yellow-500/10"
          onClick={onReset}
          data-testid="button-reset"
        >
          <RotateCcw className="h-5 w-5 text-yellow-500" />
        </Button>
      )}

      <Button
        size="icon"
        variant="outline"
        className="h-16 w-16 rounded-full border-2 border-green-500/50 bg-transparent transition-all duration-200 hover:scale-110 hover:border-green-500 hover:bg-green-500/10"
        onClick={onLike}
        disabled={disabled}
        data-testid="button-like"
      >
        <Heart className="h-8 w-8 text-green-500" fill="currentColor" />
      </Button>
    </div>
  );
}
