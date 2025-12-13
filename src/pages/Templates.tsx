import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, LayoutTemplate } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { adTemplates } from "@/data/adTemplates";

const Templates = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (prompt: string) => {
    navigate(`/refine?template=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col relative overflow-hidden">
      {/* Cosmic 3D-inspired background */}
      <div className="cosmic-bg">
        <div className="starfield" />
        <div className="planet-3d planet-1" />
        <div className="planet-3d planet-2" />
        <div className="planet-3d planet-3" />
        <div className="galaxy-3d" />
        <div className="blackhole-3d" />
        <div className="galaxy-cluster cluster-1" />
        <div className="galaxy-cluster cluster-2" />
        <div className="galaxy-cluster cluster-3" />
      </div>

      {/* Subtle glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-10 right-1/5 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <LayoutTemplate className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Ad Generation Templates</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Choose Your <span className="gradient-text">Ad Template</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select from 20 professionally crafted ad templates designed to convert. Click any template to start refining.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adTemplates.map((template) => (
              <Card
                key={template.id}
                className="glass border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] group overflow-hidden cursor-pointer"
                onClick={() => handleTemplateClick(template.prompt)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.image_caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {template.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.image_caption}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 group-hover:border-primary/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateClick(template.prompt);
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Use Template
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8">
            <Card className="glass border-primary/20 p-8 inline-block">
              <p className="text-muted-foreground mb-4">
                Want to create a custom prompt instead?
              </p>
              <Link to="/refine">
                <Button size="lg" className="gap-2 animate-glow">
                  <Sparkles className="w-5 h-5" />
                  Start Refining Custom Prompt
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Templates;

