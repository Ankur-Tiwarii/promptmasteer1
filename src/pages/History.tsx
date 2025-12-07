import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight,
  History as HistoryIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { auth, db } from "@/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

type PromptHistory = {
  id: string;
  user_prompt: string;
  refined_prompt: string;
  enhancements: string[];
  style: string;
  timestamp: string;
};

const History = () => {
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth");
      return;
    }
    loadHistory(user.uid);
  }, [navigate]);

  const loadHistory = async (userId: string) => {
    setIsLoading(true);
    try {
      const historyRef = collection(db, "prompt_history");
      const q = query(
        historyRef,
        where("user_id", "==", userId),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data: PromptHistory[] = snapshot.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          user_prompt: v.user_prompt,
          refined_prompt: v.refined_prompt,
          enhancements: v.enhancements || [],
          style: v.style,
          timestamp: v.timestamp?.toDate
            ? v.timestamp.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      setHistory(data);
    } catch (error: any) {
      console.error("Error loading history:", error);
      toast({
        title: "Error",
        description: "Failed to load prompt history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRefined = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied ✓",
      description: "Refined prompt copied to clipboard",
    });
  };

  const handleCopyOriginal = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied ✓",
      description: "Original prompt copied to clipboard",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "prompt_history", id));

      setHistory(history.filter((item) => item.id !== id));
      toast({
        title: "Deleted ✓",
        description: "Prompt removed from history",
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

  const handleUseAgain = (userPrompt: string, style: string) => {
    navigate(`/refine?example=${encodeURIComponent(userPrompt)}&style=${style}`);
    toast({
      title: "Loaded into editor ✓",
      description: "Prompt ready to refine",
    });
  };

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStyleLabel = (style: string) => {
    const styleMap: Record<string, string> = {
      cinematic: "Cinematic",
      professional: "Professional",
      "dark-aesthetic": "Dark Aesthetic",
      marketing: "Marketing Copy",
      storytelling: "Storytelling",
      "ui-ux": "UI/UX",
      "video-script": "Video Script",
      "image-prompt": "Image Prompt",
    };
    return styleMap[style] || style;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading history...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-20 flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center glass rounded-2xl p-12 border border-primary/20">
            <HistoryIcon className="w-16 h-16 text-primary/50 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">No prompt history yet.</h2>
            <p className="text-muted-foreground mb-8">
              Start refining prompts to build your creative library.
            </p>
            <Link to="/refine">
              <Button size="lg" className="gap-2 animate-glow">
                <Sparkles className="w-5 h-5" />
                Start Refining
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 pt-32 pb-20 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prompt <span className="gradient-text">History</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your refined prompts and creative journey
            </p>
          </div>

          <div className="space-y-4">
            {history.map((item) => {
              const isOpen = openItems.has(item.id);
              const refinedText = item.refined_prompt.split("💡 What was enhanced:")[0].trim();
              const enhancements = item.enhancements.length > 0 
                ? item.enhancements 
                : (item.refined_prompt.includes("💡 What was enhanced:") 
                    ? item.refined_prompt.split("💡 What was enhanced:")[1]?.trim().split(/\n|[-•]/).filter(e => e.trim()).map(e => e.trim()) || []
                    : []);

              return (
                <Card
                  key={item.id}
                  className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant="outline" 
                            className="border-primary/30 bg-primary/10 text-primary font-semibold"
                          >
                            {getStyleLabel(item.style)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Original Prompt - Collapsed by default */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-3 mb-4 hover:bg-primary/5 text-left"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            Original Prompt
                          </span>
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mb-4">
                        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {item.user_prompt}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Refined Prompt - Expandable */}
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        onClick={() => toggleItem(item.id)}
                        className="w-full justify-between p-3 mb-3 hover:bg-primary/5 text-left"
                      >
                        <span className="text-sm font-medium text-primary">
                          {isOpen ? "Hide" : "Show"} Refined Output
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>

                      {isOpen && (
                        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 mb-4 transition-all duration-300">
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {refinedText}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Enhancements */}
                    {enhancements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                          Enhancements
                        </h4>
                        <ul className="space-y-1">
                          {enhancements.map((enhancement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{enhancement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyRefined(refinedText)}
                        className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Refined
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyOriginal(item.user_prompt)}
                        className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Original
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseAgain(item.user_prompt, item.style)}
                        className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform border-primary/30 hover:bg-primary/5"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Use Again
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;

