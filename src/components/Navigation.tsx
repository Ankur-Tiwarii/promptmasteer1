import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, LogIn, LogOut, History, BookOpen, Layers, Users, Upload, Sparkles, Menu, X, LayoutTemplate } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log("Auth error:", error);
      // Continue without auth if Firebase fails
      setUser(null);
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.log("Sign out error:", error);
      setMobileMenuOpen(false);
      toast({
        title: "Signed out",
        description: "You have been signed out",
      });
    }
  };

  const NavLink = ({ to, icon: Icon, label, showOnMobile = true }: { to: string; icon: React.ElementType; label: string; showOnMobile?: boolean }) => {
    const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
    return (
      <Link
        to={to}
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 relative py-2 px-3 rounded-lg ${
          isActive 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
        } ${!showOnMobile ? 'hidden md:flex' : ''}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9998] border-b border-border/50 glass">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-bold gradient-text hover:opacity-90 transition-opacity">
          <img src="/logo.svg" alt="PromptMaster" className="w-8 h-8 md:w-9 md:h-9" />
          <span className="hidden xs:inline">PromptMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavLink to="/" icon={Home} label="Home" />
          <NavLink to="/refine" icon={Sparkles} label="Refine" />
          <NavLink to="/templates" icon={LayoutTemplate} label="Templates" />
          <NavLink to="/presets" icon={Layers} label="Master Prompts" />
          <NavLink to="/courses" icon={BookOpen} label="Courses" />
          <NavLink to="/community" icon={Users} label="Community" />
          {user && <NavLink to="/upload" icon={Upload} label="Upload" />}
          <NavLink to="/history" icon={History} label="History" />
          {user && <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Start Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 rounded-lg hover:bg-primary/10 transition-colors bg-primary/5 border border-primary/20"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay - Solid Black Background */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-[9999] bg-[#0a0a12] border-t border-primary/20 min-h-screen">
          <div className="px-6 py-8 flex flex-col gap-4 min-h-full overflow-y-auto">
            {/* Navigation Links */}
            <div className="space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <Home className="w-6 h-6" />
                Home
              </Link>
              <Link
                to="/refine"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/refine" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <Sparkles className="w-6 h-6" />
                Refine Prompt
              </Link>
              <Link
                to="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/templates" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <LayoutTemplate className="w-6 h-6" />
                Templates
              </Link>
              <Link
                to="/presets"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/presets" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <Layers className="w-6 h-6" />
                Master Prompts
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/courses" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <BookOpen className="w-6 h-6" />
                Courses
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/community" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <Users className="w-6 h-6" />
                Community
              </Link>
              {user && (
                <Link
                  to="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                    location.pathname === "/upload" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                  }`}
                >
                  <Upload className="w-6 h-6" />
                  Upload
                </Link>
              )}
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                  location.pathname === "/history" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                }`}
              >
                <History className="w-6 h-6" />
                History
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-lg font-medium py-4 px-5 rounded-xl transition-all border ${
                    location.pathname === "/dashboard" ? "text-primary bg-primary/15 border-primary/30" : "text-foreground hover:bg-primary/10 border-transparent hover:border-primary/20"
                  }`}
                >
                  <LayoutDashboard className="w-6 h-6" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-primary/20 my-4" />

            {/* Auth Section */}
            <div className="space-y-4 mt-6">
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={handleSignOut} 
                  className="w-full gap-3 justify-center py-7 text-lg font-semibold border-2"
                >
                  <LogOut className="w-6 h-6" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button variant="outline" className="w-full gap-3 justify-center py-7 text-lg font-semibold border-2">
                      <LogIn className="w-6 h-6" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button className="w-full gap-3 justify-center py-7 text-lg font-semibold">
                      <Sparkles className="w-6 h-6" />
                      Start Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};