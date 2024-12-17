interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );
}
