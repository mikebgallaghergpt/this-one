import { useState } from "react";
import { Button } from "./components/ui/button";
import { Settings, ArrowLeft } from "lucide-react";

// Import components
import { EnhancedImageCarousel } from "./components/EnhancedImageCarousel";
import { SignupFormOriginal } from "./components/SignupFormOriginal";
import { SimpleSignupForm } from "./components/SimpleSignupForm";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "signup" | "admin"
  >("signup");
  const [useSimpleForm, setUseSimpleForm] = useState(false);

  // Admin view
  if (currentView === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80">
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="outline"
            onClick={() => setCurrentView("signup")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Signup
          </Button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  // Main signup view - Split screen on desktop, stacked on mobile
  return (
    <div className="min-h-screen">
      {/* DESKTOP/WEB VERSION: Side by side layout - Now starts at md breakpoint (768px+) */}
      <div className="hidden md:flex min-h-screen">
        {/* LEFT: Carousel */}
        <div className="w-1/2 h-screen">
          <EnhancedImageCarousel />
        </div>

        {/* RIGHT: Form */}
        <div className="w-1/2 h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80 flex items-center justify-center p-6 relative">
          {/* Admin button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              onClick={() => setCurrentView("admin")}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </div>

          {/* Form */}
          <div className="w-full max-w-md">
            {useSimpleForm ? (
              <SimpleSignupForm />
            ) : (
              <SignupFormOriginal />
            )}
            {!useSimpleForm && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUseSimpleForm(true)}
                  className="text-xs"
                >
                  Switch to Simple Form
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE VERSION: Stacked layout (Form on top, Carousel below) - Now only on small screens */}
      <div className="md:hidden min-h-screen">
        {/* TOP: Form section */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100/80 min-h-[60vh] flex items-center justify-center p-6 relative">
          {/* Admin button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              onClick={() => setCurrentView("admin")}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-sm"
            >
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </div>

          {/* Form */}
          <div className="w-full max-w-md">
            {useSimpleForm ? (
              <SimpleSignupForm />
            ) : (
              <SignupFormOriginal />
            )}
            {!useSimpleForm && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUseSimpleForm(true)}
                  className="text-xs"
                >
                  Switch to Simple Form
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM: Carousel section */}
        <div className="h-64">
          <EnhancedImageCarousel />
        </div>
      </div>
    </div>
  );
}