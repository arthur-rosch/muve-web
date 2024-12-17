interface LoadingPlaceholderProps {
  className?: string;
}

export function LoadingPlaceholder({
  className = "",
}: LoadingPlaceholderProps) {
  return (
    <div className={`absolute inset-0 bg-gray-100 ${className}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500" />
      </div>
    </div>
  );
}
