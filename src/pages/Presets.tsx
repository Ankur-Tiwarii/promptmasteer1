import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { presets } from "@/data/presets";

const categories = [
  "All",
  "Nano Banana",
  "VEO-3 Cinematic",
  "Viral Aesthetic",
  "Storytelling",
  "Interior Design",
  "Cyberpunk / Neon",
  "Product Photoshoot",
  "Branding / Marketing",
  "UI/UX",
  "Anime / Stylized",
  "Horror / Thriller Writing",
];

const Presets = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredPresets = selectedCategory === "All" 
    ? presets 
    : presets.filter(p => p.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt Copied ✓",
        description: "Ready to use in your AI tool",
      });
    } catch (error) {
      toast({
        title: "Unable to copy prompt",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Preset <span className="gradient-text">Prompt Library</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our curated collection of professionally crafted, ready-to-use prompts. Copy and paste directly into your AI tool.
            </p>
          </div>

          {/* Category Chips */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)] scale-105"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-[0_0_10px_hsl(var(--primary)/0.2)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Cards Grid */}
          {filteredPresets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPresets.map((preset) => {
                const isExpanded = expandedCards.includes(preset.id);
                return (
                  <Card
                    key={preset.id}
                    className="glass border-primary/20 overflow-hidden hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] group"
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-muted/30 border-b border-primary/10">
                      <img
                        src={preset.image}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-5 space-y-3">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
                          {preset.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg leading-tight">{preset.title}</h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{preset.description}</p>

                      {/* Full Prompt - Expandable */}
                      <div className="relative">
                        <div className={`bg-muted/30 rounded-lg p-4 border border-border/50 ${
                          isExpanded ? "" : "max-h-24 overflow-hidden"
                        }`}>
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {preset.prompt}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExpand(preset.id)}
                          className="text-primary text-xs font-medium mt-2 flex items-center gap-1 hover:underline transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              Show Full Prompt
                            </>
                          )}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleCopy(preset.prompt)}
                          className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                        >
                          <Copy className="w-4 h-4" />
                          Copy Prompt
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <Card className="glass border-primary/20 p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30">
                  <Copy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">No prompts in this category yet</h3>
                <p className="text-muted-foreground">
                  We're constantly adding new professionally crafted prompts. Check back soon!
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Presets;
