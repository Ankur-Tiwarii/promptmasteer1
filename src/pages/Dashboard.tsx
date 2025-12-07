import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Copy, Trash2, User as UserIcon, ListChecks, History as HistoryIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, db, serverTime } from "@/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  limit,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Prompt = {
  id: string;
  original_prompt: string;
  refined_prompt: string;
  style: string;
  created_at: string;
};

type Profile = {
  name: string;
  usage: string;
  email?: string | null;
};

type RecentHistory = {
  id: string;
  user_prompt: string;
  style: string;
  timestamp: string;
};

const Dashboard = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({ name: "", usage: "", email: "" });
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [recentHistory, setRecentHistory] = useState<RecentHistory[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth");
      return;
    }
    loadProfile(user.uid, user.email);
    loadPrompts(user.uid);
    loadRecentHistory(user.uid);
  }, [navigate]);

  const loadProfile = async (userId: string, email: string | null) => {
    try {
      const ref = doc(db, "users", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as any;
        setProfile({
          name: data.name || "",
          usage: data.usage || "",
          email: data.email ?? email,
        });
      } else {
        setProfile({
          name: "",
          usage: "",
          email,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadPrompts = async (userId: string) => {
    try {
      const promptsRef = collection(db, "prompts");
      const q = query(
        promptsRef,
        where("user_id", "==", userId),
        orderBy("created_at", "desc")
      );
      const snapshot = await getDocs(q);
      const data: Prompt[] = snapshot.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          original_prompt: v.original_prompt,
          refined_prompt: v.refined_prompt,
          style: v.style,
          created_at: v.created_at?.toDate
            ? v.created_at.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      setPrompts(data);
    } catch (error: any) {
      console.error("Error loading prompts:", error);
      toast({
        title: "Error",
        description: "Failed to load your prompts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentHistory = async (userId: string) => {
    try {
      const historyRef = collection(db, "prompt_history");
      const q = query(
        historyRef,
        where("user_id", "==", userId),
        orderBy("timestamp", "desc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      const data: RecentHistory[] = snapshot.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          user_prompt: v.user_prompt,
          style: v.style,
          timestamp: v.timestamp?.toDate
            ? v.timestamp.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      setRecentHistory(data);
    } catch (error) {
      console.error("Error loading recent history:", error);
    }
  };

  const handleProfileSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth");
      return;
    }
    setIsProfileSaving(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: profile.email || user.email,
          name: profile.name,
          usage: profile.usage,
          updated_at: serverTime(),
        },
        { merge: true }
      );
      toast({
        title: "Profile saved",
        description: "Your profile information has been updated.",
      });
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "prompts", id));

      setPrompts(prompts.filter((p) => p.id !== id));
      toast({
        title: "Deleted",
        description: "Prompt removed from your history",
      });
    } catch (error: any) {
      console.error("Error deleting prompt:", error);
      toast({
        title: "Error",
        description: "Failed to delete prompt",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Your <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              View your profile, prompts, and recent activity
            </p>
          </div>

          {/* Profile Section */}
          <Card className="glass border-primary/20 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">Your Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Tell us who you are and what you use PromptMaster for.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="bg-muted/30 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  What are you using this site for?
                </label>
                <Textarea
                  value={profile.usage}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, usage: e.target.value }))
                  }
                  placeholder="e.g. Improving my AI image prompts, writing better stories, marketing copy..."
                  className="min-h-[80px] bg-muted/30 border-border/50"
                />
              </div>
              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted-foreground">
                  This information is private to your account and helps you keep
                  track of your goals.
                </p>
                <Button
                  size="sm"
                  onClick={handleProfileSave}
                  disabled={isProfileSaving}
                  className="gap-2"
                >
                  {isProfileSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <ListChecks className="w-4 h-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent Prompt History Summary */}
          {recentHistory.length > 0 && (
            <Card className="glass border-primary/20 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HistoryIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Recent Prompt History</h2>
                    <p className="text-sm text-muted-foreground">
                      A quick look at your latest refined prompts. View the full details on the History page.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => navigate("/history")}
                >
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-2 border-t border-border/40 first:border-t-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary capitalize">
                          {item.style}
                        </span>
                        <span>
                          {new Date(item.timestamp).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">
                        {item.user_prompt}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="self-start md:self-auto text-xs text-primary"
                      onClick={() =>
                        navigate(
                          `/refine?example=${encodeURIComponent(
                            item.user_prompt
                          )}&style=${item.style}`
                        )
                      }
                    >
                      Refine Again
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Loading your prompts...</p>
            </div>
          ) : prompts.length === 0 ? (
            <Card className="glass border-primary/10 p-12 text-center space-y-4">
              <Sparkles className="w-16 h-16 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold">No prompts yet</h3>
              <p className="text-muted-foreground">
                Start refining prompts to see them appear here
              </p>
              <Button onClick={() => navigate("/refine")} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Refine Your First Prompt
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6">
              {prompts.map((prompt) => (
                <Card
                  key={prompt.id}
                  className="glass border-primary/10 p-6 hover:border-primary/30 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Original</div>
                          <p className="text-foreground">{prompt.original_prompt}</p>
                        </div>
                        <div>
                          <div className="text-sm text-primary mb-1">Refined</div>
                          <p className="text-foreground leading-relaxed">
                            {prompt.refined_prompt}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(prompt.refined_prompt)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(prompt.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="capitalize px-2 py-1 rounded bg-primary/10 text-primary">
                        {prompt.style}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(prompt.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
