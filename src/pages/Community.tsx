import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

const categories = [
  "All",
  "Nano Banana",
  "VEO-3 Cinematic", 
  "Viral Aesthetic",
  "Cyberpunk / Neon",
  "Product Photoshoot",
  "Cinematic Storytelling",
];

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Community <span className="gradient-text">Prompts</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover amazing prompts created by our community of AI experts and creators
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-primary/20"
            />
          </div>

          {/* Category Chips */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3 min-w-max justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)] scale-105"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Coming Soon State */}
          <Card className="glass border-primary/20 p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Coming Soon!</h3>
              <p className="text-muted-foreground">
                We're building an amazing community where creators can share their best prompts. 
                Stay tuned for user-uploaded prompts, creator profiles, and more!
              </p>
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                Get Notified
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;