import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, LogIn, LogOut, History, BookOpen, Layers, Users, Upload, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold gradient-text hover:opacity-90 transition-opacity">
          <img src="/logo.svg" alt="PromptMaster" className="w-9 h-9" />
          PromptMaster
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Home className="w-4 h-4" />
            Home
            {location.pathname === "/" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link
            to="/refine"
            className={`text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/refine" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Refine Prompt
            {location.pathname === "/refine" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link
            to="/presets"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/presets" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Layers className="w-4 h-4" />
            Presets
            {location.pathname === "/presets" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link
            to="/courses"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/courses" || location.pathname.startsWith("/course") 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Courses
            {(location.pathname === "/courses" || location.pathname.startsWith("/course")) && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link
            to="/community"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/community" || location.pathname.startsWith("/creator") 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Users className="w-4 h-4" />
            Community
            {(location.pathname === "/community" || location.pathname.startsWith("/creator")) && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {user && (
            <Link
              to="/upload"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
                location.pathname === "/upload" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload
              {location.pathname === "/upload" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          )}

          <Link
            to="/history"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
              location.pathname === "/history" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <History className="w-4 h-4" />
            History
            {location.pathname === "/history" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-1 ${
                location.pathname === "/dashboard" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
              {location.pathname === "/dashboard" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          )}

          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-shadow"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="animate-glow gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Start Free</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
