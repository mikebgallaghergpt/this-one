// Debug test component to check if carousel is rendering
import { EnhancedImageCarousel } from "./components/EnhancedImageCarousel";

export function DebugTest() {
  return (
    <div className="w-full h-screen bg-red-500">
      <div className="text-white p-4">Debug: Testing Carousel</div>
      <div className="w-full h-96 border-4 border-yellow-400">
        <EnhancedImageCarousel />
      </div>
    </div>
  );
}