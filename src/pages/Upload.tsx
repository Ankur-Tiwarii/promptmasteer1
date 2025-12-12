import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload as UploadIcon, Sparkles, Image, Tag, Eye, EyeOff, Loader2 } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  "Cinematic",
  "Dark Aesthetic", 
  "Marketing Copy",
  "Storytelling",
  "UI/UX Design",
  "Image Generation",
  "Product Photography",
  "Character Design",
  "Logo Design",
  "Social Media",
  "Email Marketing",
  "Blog Writing",
  "Creative Writing",
  "Technical Writing",
  "Other"
];

const Upload = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [promptText, setPromptText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Get user profile from Supabase
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', firebaseUser.uid)
            .single();
          
          setProfile(profileData);
        } catch (error) {
          console.warn('Could not fetch profile:', error);
        }
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !profile) {
      toast({
        title: "Error",
        description: "You must be signed in to upload prompts",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !category || !promptText.trim()) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      const { data, error } = await supabase
        .from('user_prompts')
        .insert({
          creator_id: profile.id,
          title: title.trim(),
          category,
          prompt_text: promptText.trim(),
          image_url: imageUrl.trim() || null,
          tags: tagsArray,
          is_public: isPublic,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your prompt has been uploaded successfully",
      });

      // Reset form
      setTitle("");
      setCategory("");
      setPromptText("");
      setImageUrl("");
      setTags("");
      setIsPublic(true);

      // Navigate to community or creator profile
      navigate('/community');
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload prompt",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

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

          {/* Upload Form */}
          <Card className="glass border-primary/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy title for your prompt"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-muted/30 border-border/50"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/100 characters
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt Text */}
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium">
                  Prompt Text <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your refined prompt here..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="bg-muted/30 border-border/50 min-h-[120px] resize-none"
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground">
                  {promptText.length}/2000 characters
                </p>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Preview Image URL (Optional)
                </Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-muted/30 border-border/50"
                />
                <p className="text-xs text-muted-foreground">
                  Add a preview image to make your prompt more attractive
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags (Optional)
                </Label>
                <Input
                  id="tags"
                  placeholder="ai, creative, photography, design"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-muted/30 border-border/50"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas to help others find your prompt
                </p>
              </div>

              {/* Visibility */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Visibility</Label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      isPublic 
                        ? 'bg-primary/20 border-primary/40 text-primary' 
                        : 'bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      !isPublic 
                        ? 'bg-primary/20 border-primary/40 text-primary' 
                        : 'bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <EyeOff className="w-4 h-4" />
                    Private
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isPublic ? 'Everyone can see and copy this prompt' : 'Only you can see this prompt'}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={uploading || !title.trim() || !category || !promptText.trim()}
                className="w-full gap-2 h-12 animate-glow"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-5 h-5" />
                    Upload Prompt
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Upload;