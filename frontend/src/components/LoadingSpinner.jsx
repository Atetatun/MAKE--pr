import { Loader } from 'lucide-react';

export function LoadingSpinner({ size = 'default', text = 'Loading...' }) {
  const sizeMap = {
    small: 24,
    default: 40,
    large: 56,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader size={sizeMap[size]} className="text-cyan animate-spin" />
      {text && <p className="text-text-muted text-sm">{text}</p>}
    </div>
  );
}
