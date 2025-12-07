import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, LayoutDashboard, LogIn, LogOut, History } from "lucide-react";
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
        <Link to="/" className="flex items-center gap-2 text-xl font-bold gradient-text">
          <Sparkles className="w-6 h-6 text-primary" />
          PromptMaster
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <Link
            to="/refine"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/refine" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Refine Prompt
          </Link>

          <Link
            to="/history"
            className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
              location.pathname === "/history" ? "text-primary" : "text-muted-foreground hover:text-primary"
            } hover:shadow-[0_0_10px_hsl(var(--primary)/0.3)]`}
          >
            <History className="w-4 h-4" />
            History
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
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
