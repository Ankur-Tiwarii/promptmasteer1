import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, Sparkles } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 pt-28 pb-12 flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 pt-28 pb-12 flex-1 flex items-center justify-center">
          <Card className="glass border-primary/20 p-12 text-center max-w-md">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Sign in required</h3>
              <p className="text-muted-foreground">
                Please sign in to upload and share your prompts with the community
              </p>
              <Button onClick={() => navigate('/auth')} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Sign In
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Upload <span className="gradient-text">Prompt</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Share your amazing prompts with the community
            </p>
          </div>

          {/* Coming Soon */}
          <Card className="glass border-primary/20 p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Upload Feature Coming Soon!</h3>
              <p className="text-muted-foreground">
                We're working on the ability for creators to upload and share their prompts. 
                This feature will be available soon!
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Upload;