import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider, db, serverTime } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        // Create or update user profile document
        await setDoc(
          doc(db, "users", cred.user.uid),
          {
            email: cred.user.email,
            name: cred.user.displayName || "",
            usage: "",
            created_at: serverTime(),
            updated_at: serverTime(),
          },
          { merge: true }
        );

        toast({
          title: "Success!",
          description: "Account created successfully. You can now sign in.",
        });

        setIsSignUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        toast({
          title: "Welcome back!",
          description: "You have signed in successfully",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error: any) {
      console.error("Auth error:", error);

      let errorMessage = "Authentication failed";
      const code = error.code || "";

      if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (code.includes("auth/email-already-in-use")) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
      } else if (code.includes("auth/weak-password")) {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);

      const user = auth.currentUser;
      if (user) {
        // Ensure user profile exists
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            name: user.displayName || "",
            usage: "",
            updated_at: serverTime(),
          },
          { merge: true }
        );
      }

      toast({
        title: "Success!",
        description: "Signed in with Google",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Welcome to PromptMaster</span>
            </div>
            <h1 className="text-4xl font-bold">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp
                ? "Start refining your prompts with AI"
                : "Welcome back! Sign in to continue"}
            </p>
          </div>

          <Card className="glass border-primary/10 p-8 space-y-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted/30 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-muted/30 border-border/50"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2 h-12 animate-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {isSignUp ? "Create Account" : "Sign In"}
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Info about Google OAuth */}
            <div className="glass border-primary/20 rounded-lg p-3 text-xs text-muted-foreground bg-primary/5">
              <p className="text-center">
                <span className="text-primary font-medium">Note:</span> Google sign-in requires OAuth to be enabled in your Supabase project. 
                If you see an error, go to{" "}
                <span className="text-primary">Supabase Dashboard → Authentication → Providers → Google</span> and enable it.
              </p>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full gap-2 h-12"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Note: Google sign-in requires OAuth configuration in Supabase. 
                <br />
                If you see an error, enable Google provider in Supabase Dashboard → Authentication → Providers.
              </p>
            </div>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
