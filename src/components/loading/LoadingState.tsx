import { LoadingPlaceholder } from "./LoadingPlaceholder";

export function LoadingState() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingPlaceholder />
    </div>
  );
}
