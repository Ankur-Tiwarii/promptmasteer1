import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { db, auth, serverTime } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

const outputStyles = [
  { value: "cinematic", label: "Cinematic" },
  { value: "professional", label: "Professional" },
  { value: "dark-aesthetic", label: "Dark Aesthetic" },
  { value: "marketing", label: "Marketing Copy" },
  { value: "storytelling", label: "Storytelling" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "video-script", label: "Video Script" },
  { value: "image-prompt", label: "Image Prompt" },
];

const Refine = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputPrompt, setInputPrompt] = useState("");
  const [outputStyle, setOutputStyle] = useState("cinematic");
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check for example prompt and style in URL params
  useEffect(() => {
    const examplePrompt = searchParams.get("example");
    const styleParam = searchParams.get("style");
    
    if (examplePrompt) {
      setInputPrompt(decodeURIComponent(examplePrompt));
    }
    
    if (styleParam && outputStyles.find(s => s.value === styleParam)) {
      setOutputStyle(styleParam);
    }
    
    // Clear the URL parameters after setting the values
    if (examplePrompt || styleParam) {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleRefine = async () => {
    if (!inputPrompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a prompt to refine",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Missing VITE_GEMINI_API_KEY. Please add it to your .env file or Vercel environment variables."
        );
      }
      
      console.log("Using Gemini API key:", apiKey.substring(0, 10) + "...");

      // Style-specific instructions for Gemini
      const stylePrompts: Record<string, string> = {
        "cinematic":
          "You are an expert at creating cinematic prompts. Transform the user's basic prompt into a detailed, cinematic description with lighting, camera angles, atmosphere, and professional photography terms. Make it vivid and visually rich. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "professional":
          "You are an expert at creating professional prompts. Transform the user's basic prompt into a clear, structured, and professional description with proper terminology, constraints, and detailed specifications. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "dark-aesthetic":
          "You are an expert at creating dark aesthetic prompts. Transform the user's basic prompt into a moody, atmospheric description with dark tones, shadows, noir elements, and dramatic contrast. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "marketing":
          "You are an expert at creating marketing copy prompts. Transform the user's basic prompt into compelling marketing language with benefit-driven descriptions, emotional triggers, and persuasive elements. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "storytelling":
          "You are an expert at creating narrative prompts. Transform the user's basic prompt into a story-driven description with character, setting, plot elements, and emotional depth. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "ui-ux":
          "You are an expert at creating UI/UX design prompts. Transform the user's basic prompt into a detailed interface description with user experience considerations, layout specifics, interaction patterns, and design system elements. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "video-script":
          "You are an expert at creating video script prompts. Transform the user's basic prompt into a structured video script with scene descriptions, transitions, pacing, and visual storytelling elements. If this is for image generation, start with \"Create an image of\" or \"Generate an image showing\".",
        "image-prompt":
          "You are an expert at creating image generation prompts. Transform the user's basic prompt into a highly detailed image description with artistic style, composition, lighting, color palette, and technical specifications for AI image generation. Always start with \"Create an image of\" or \"Generate an image showing\".",
      };

      const analysisPrompt =
        'After providing the refined prompt, add a new paragraph starting with "💡 What was enhanced:" and briefly list 2-4 key improvements you made (e.g., added lighting details, specified composition, enhanced atmosphere, included technical parameters). Be polite and constructive.';

      const systemPrompt =
        stylePrompts[outputStyle] || stylePrompts["cinematic"];

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\n${analysisPrompt}\n\nTransform this prompt: "${inputPrompt}"`,
              },
            ],
          },
        ],
      };

      console.log("Sending request to Gemini API with model: gemini-2.5-flash");
      
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to refine prompt";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorData.message || errorMessage;
          console.error("Gemini API error:", response.status, errorData);
        } catch {
          const errorText = await response.text();
          console.error("Gemini API error (text):", response.status, errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      const fullRefinedPrompt =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*\*/g, "") ||
        "";
      
      if (!fullRefinedPrompt) {
        throw new Error("No response from Gemini API. Please check your API key and try again.");
      }
      
      setRefinedPrompt(fullRefinedPrompt);

      // Extract enhancements if present
      let enhancements: string[] = [];
      const enhancementMatch = fullRefinedPrompt.match(/💡 What was enhanced:\s*(.+?)(?:\n\n|$)/is);
      if (enhancementMatch) {
        const enhancementText = enhancementMatch[1].trim();
        // Split by common separators (newlines, dashes, bullets)
        enhancements = enhancementText
          .split(/\n|[-•]\s*/)
          .map(e => e.trim())
          .filter(e => e.length > 0);
      }

      // Save to prompt_history (Firestore) automatically (silent)
      try {
        const user = auth.currentUser;
        await addDoc(collection(db, "prompt_history"), {
          user_id: user?.uid || null,
          user_prompt: inputPrompt,
          refined_prompt: fullRefinedPrompt,
          enhancements: enhancements.length > 0 ? enhancements : [],
          style: outputStyle,
          timestamp: serverTime(),
        });
      } catch (saveError) {
        console.error("Error saving to history:", saveError);
      }

      toast({
        title: "Prompt refined!",
        description: "Your prompt has been enhanced successfully",
      });
    } catch (error: any) {
      console.error("Error refining prompt:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to refine prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedPrompt);
    toast({
      title: "Copied!",
      description: "Refined prompt copied to clipboard",
    });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your prompts",
        variant: "destructive",
      });
      return;
    }

    try {
      await addDoc(collection(db, "prompts"), {
        user_id: user.uid,
        original_prompt: inputPrompt,
        refined_prompt: refinedPrompt,
        style: outputStyle,
        created_at: serverTime(),
      });

      toast({
        title: "Saved!",
        description: "Prompt saved to your dashboard",
      });
    } catch (error: any) {
      console.error("Error saving prompt:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save prompt",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Refine Your <span className="gradient-text">AI Prompts</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Transform basic prompts into professional, structured masterpieces
            </p>
          </div>

          {/* Before/After Example Section */}
          <Card className="glass border-primary/20 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 gradient-text">
              See PromptMaster in Action
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Before</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground italic">"Make a horror story"</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-primary/30" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">After</span>
                  <div className="h-px flex-1 bg-primary/30" />
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm text-foreground leading-relaxed">"Create a spine-chilling horror story set in an abandoned Victorian mansion, featuring a protagonist uncovering dark family secrets through mysterious diary entries, with atmospheric tension building through shadows and whispers."</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass border-primary/10 p-5 md:p-6 space-y-5">
            {/* Input Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Prompt</label>
              <Textarea
                placeholder="Enter your basic prompt here... e.g., 'make me an image of a sunset'"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="min-h-[100px] bg-muted/30 border-border/50 resize-none"
              />
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Style</label>
              <Select value={outputStyle} onValueChange={setOutputStyle}>
                <SelectTrigger className="w-full bg-muted/30 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover/95 backdrop-blur-sm">
                  {outputStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Refine Button */}
            <Button
              onClick={handleRefine}
              disabled={isLoading}
              className="w-full gap-2 text-base md:text-lg h-11 md:h-12 animate-glow transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="animate-pulse">Refining</span>
                  <span className="animate-pulse animation-delay-200">.</span>
                  <span className="animate-pulse animation-delay-400">.</span>
                  <span className="animate-pulse animation-delay-600">.</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Refine Prompt
                </>
              )}
            </Button>
          </Card>

          {/* Output Section - Side by Side Comparison */}
          {refinedPrompt && (
            <>
              <Card className="glass border-primary/20 p-5 md:p-8 space-y-5 animate-fade-in shadow-lg shadow-primary/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold gradient-text">Refined Prompt</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave} 
                      className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy} 
                      className="gap-2 flex-1 sm:flex-none hover:scale-105 transition-transform"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {/* Original Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-border/50" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Original</span>
                      <div className="h-px flex-1 bg-border/50" />
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4 md:p-6 border border-border/50 min-h-[200px]">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">{inputPrompt}</p>
                    </div>
                  </div>

                  {/* Refined Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-primary/30" />
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">Enhanced</span>
                      <div className="h-px flex-1 bg-primary/30" />
                    </div>
                    <div 
                      className="bg-primary/10 rounded-lg p-4 md:p-6 border border-primary/20 min-h-[200px] relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))'
                      }}
                    >
                      <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                        {refinedPrompt.split('💡 What was enhanced:')[0].trim()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* What Was Enhanced Section */}
              {refinedPrompt.includes('💡 What was enhanced:') && (
                <Card className="glass border-primary/20 p-5 md:p-6 animate-fade-in shadow-lg shadow-primary/10">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                      💡 What was enhanced
                    </h4>
                    <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {refinedPrompt.split('💡 What was enhanced:')[1]?.trim()}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Refine;
