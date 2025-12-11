import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Sparkles, Zap, Brain, Lightbulb, Film, Gauge, PlayCircle, PenTool, Palette, FileCheck, MessageSquare, Layers, BookOpen, Users, Copy, LayoutTemplate } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (startOnView && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
};

const Index = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Stats counters
  const promptsRefined = useCountUp(12500, 2000);
  const activeUsers = useCountUp(3200, 2000);
  const promptTemplates = useCountUp(150, 1500);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col relative overflow-hidden scroll-smooth">
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
      
      {/* Hero Section - Enhanced */}
      <section className="container mx-auto px-4 pt-24 md:pt-36 pb-12 md:pb-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Badge - Enhanced with better animation */}
          <div className="inline-block animate-float">
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass border border-primary/40 text-xs md:text-sm backdrop-blur-xl shadow-[0_0_30px_hsl(var(--primary)/0.25)]">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
              <span className="gradient-text font-semibold tracking-wide">Transform Your Prompts with AI</span>
            </div>
          </div>

          {/* Main Headline - Better spacing and readability */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight px-2">
            Turn Your Basic Ideas Into{" "}
            <span className="gradient-text relative inline-block">
              Brilliant AI Prompts.
              <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 md:h-1.5 bg-gradient-primary opacity-60 blur-sm animate-pulse-slow rounded-full" />
            </span>
          </h1>

          {/* Subheadline - Enhanced contrast and readability */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light px-2">
            PromptMaster transforms your vague thoughts into{" "}
            <span className="text-primary font-medium drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]">
              cinematic, structured, high-impact prompts
            </span>{" "}
            — instantly.
          </p>

          {/* CTA Buttons - Enhanced with better hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center pt-6 md:pt-8 px-4">
            <Link to="/refine" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 md:gap-3 text-base md:text-lg px-6 md:px-10 py-5 md:py-7 h-auto font-semibold relative group overflow-hidden animate-glow hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_35px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)]"
              >
                <span className="relative z-10">Refine Your Prompt</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto gap-2 md:gap-3 text-base md:text-lg px-6 md:px-10 py-5 md:py-7 h-auto font-semibold border-2 border-primary/40 hover:border-primary/70 hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(var(--primary)/0.25)] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm"
              onClick={scrollToFeatures}
            >
              See How It Works
              <PlayCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Stats Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div 
          ref={promptsRefined.ref}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {/* Stat 1: Prompts Refined */}
            <div className="text-center glass rounded-lg md:rounded-xl p-3 sm:p-4 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <Copy className="w-4 h-4 md:w-5 md:h-5 text-primary opacity-70" />
              </div>
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-0.5 md:mb-1">
                {promptsRefined.count.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                Prompts Refined
              </div>
            </div>

            {/* Stat 2: Active Users */}
            <div 
              ref={activeUsers.ref}
              className="text-center glass rounded-lg md:rounded-xl p-3 sm:p-4 md:p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary opacity-70" />
              </div>
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-0.5 md:mb-1">
                {activeUsers.count.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                Active Users
              </div>
            </div>

            {/* Stat 3: Prompt Templates */}
            <div 
              ref={promptTemplates.ref}
              className="text-center glass rounded-lg md:rounded-xl p-3 sm:p-4 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <LayoutTemplate className="w-4 h-4 md:w-5 md:h-5 text-primary opacity-70" />
              </div>
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-0.5 md:mb-1">
                {promptTemplates.count}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                Templates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before → After Example Section */}
      <section className="container mx-auto px-4 py-10 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-12 border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.1)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 hidden md:block" />
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                {/* Left Box - Basic Prompt */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <div className="h-px flex-1 bg-border/50" />
                    <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic Prompt</span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  <div className="bg-muted/40 rounded-lg md:rounded-xl p-4 md:p-6 border border-border/50 min-h-[80px] md:min-h-[120px] flex items-center">
                    <p className="text-sm md:text-lg text-muted-foreground italic font-light">Make a horror story</p>
                  </div>
                </div>

                {/* Right Box - Refined Prompt */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <div className="h-px flex-1 bg-primary/30" />
                    <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider">Refined Prompt</span>
                    <div className="h-px flex-1 bg-primary/30" />
                  </div>
                  <div className="bg-primary/10 rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/30 min-h-[100px] md:min-h-[120px] flex items-center relative overflow-hidden backdrop-blur-sm" style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.05))'
                  }}>
                    <p className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed">
                      Create a spine-chilling horror story set in an abandoned Victorian mansion where a young journalist discovers a century-old diary — each entry materializes in blood as she reads, revealing a dark family secret. Build atmospheric tension through shadow play, creaking floorboards, and whispers from empty rooms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Try This Example Button */}
              <div className="flex justify-center">
                <Link to={`/refine?example=${encodeURIComponent("Make a horror story")}`} className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto gap-2 text-sm md:text-base px-6 md:px-8 py-4 md:py-6 h-auto font-semibold relative group overflow-hidden hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    Try This Example
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 md:py-20 relative z-10 scroll-mt-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Everything You Need to <span className="gradient-text">Master Prompts</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            Powerful features designed to transform your ideas into high-impact AI prompts
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
          {/* Feature 1: AI-Enhanced Prompt Engine */}
          <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-primary/10 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <Brain className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-primary transition-colors duration-300">
                AI-Enhanced Engine
              </h3>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                Transform basic ideas into impactful prompts.
              </p>
            </div>
          </div>

          {/* Feature 2: Explains What You Were Missing */}
          <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-secondary/10 hover:border-secondary/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_hsl(var(--secondary)/0.3)]">
                <Lightbulb className="w-5 h-5 md:w-7 md:h-7 text-secondary" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-secondary transition-colors duration-300">
                Learn As You Go
              </h3>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                See what enhancements were made and why.
              </p>
            </div>
          </div>

          {/* Feature 3: Premium Cinematic Styles */}
          <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-primary/10 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <Film className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-primary transition-colors duration-300">
                Cinematic Styles
              </h3>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                Premium styles for every use case.
              </p>
            </div>
          </div>

          {/* Feature 4: Fast, Clean, and Beginner-Friendly */}
          <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-secondary/10 hover:border-secondary/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_hsl(var(--secondary)/0.3)]">
                <Gauge className="w-5 h-5 md:w-7 md:h-7 text-secondary" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-secondary transition-colors duration-300">
                Fast & Easy
              </h3>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                Get professional results in seconds with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            How <span className="gradient-text">PromptMaster</span> Works
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            Transform your ideas into professional prompts in three simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative">
            {/* Connecting Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(33.333%+2rem)] right-[calc(33.333%+2rem)] h-0.5 bg-gradient-primary opacity-30" />
            <ArrowRight className="hidden md:block absolute top-9 left-1/2 -translate-x-1/2 w-6 h-6 text-primary/50" />

            {/* Step 1: Enter your prompt */}
            <div className="relative z-10 group">
              <div className="text-center space-y-4 md:space-y-6">
                {/* Step Number & Icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] group-hover:scale-110 transition-transform duration-300">
                    <PenTool className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                    1
                  </div>
                </div>

                {/* Step Content */}
                <div className="glass rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-primary">
                    Enter Your Prompt
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Start with your basic idea or rough prompt. Type anything—we'll transform it into something brilliant.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Choose your style */}
            <div className="relative z-10 group">
              <div className="text-center space-y-6">
                {/* Step Number & Icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse-slow animation-delay-400" />
                  <div className="relative w-20 h-20 rounded-2xl bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center shadow-[0_0_30px_hsl(var(--secondary)/0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    2
                  </div>
                </div>

                {/* Step Content */}
                <div className="glass rounded-lg md:rounded-xl p-4 md:p-6 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-secondary">
                    Choose Your Style
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Select from cinematic, professional, marketing, storytelling, and more premium styles to match your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Get refined prompt + analysis */}
            <div className="relative z-10 group">
              <div className="text-center space-y-6">
                {/* Step Number & Icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow animation-delay-600" />
                  <div className="relative w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] group-hover:scale-110 transition-transform duration-300">
                    <FileCheck className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    3
                  </div>
                </div>

                {/* Step Content */}
                <div className="glass rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-primary">
                    Get Refined Prompt + Analysis
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Receive a professional, structured prompt instantly, plus a breakdown of what was enhanced and why.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Example Output Carousel Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            Explore <span className="gradient-text">Premium Styles</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            See how PromptMaster transforms prompts across different styles and use cases
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Cinematic Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Film className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Cinematic</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Create a cinematic photograph of a lone astronaut standing on a distant planet at twilight, with two moons visible in the purple-hued sky. Dramatic low-angle lighting, lens flares, anamorphic bokeh, shot on Arri Alexa, color graded with deep shadows and vibrant highlights.
                  </p>
                  <Link to="/refine?example=Create an epic space scene&style=cinematic" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Dark Aesthetic Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Dark Aesthetic</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Generate a dark, moody cyberpunk street scene at night in neon-soaked rain. Noir atmosphere, deep shadows, electric blue and magenta neon signs reflecting on wet asphalt, cinematic depth of field, high contrast black and white with selective color accents.
                  </p>
                  <Link to="/refine?example=Make a dark futuristic city&style=dark-aesthetic" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Marketing Copy Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Marketing Copy</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Write compelling marketing copy that highlights our AI-powered productivity tool's key benefits: seamless automation, intelligent insights, and time-saving features. Use persuasive language with clear value propositions, engaging headlines, and a strong call-to-action that drives conversions.
                  </p>
                  <Link to="/refine?example=Write marketing copy for a product&style=marketing" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Storytelling Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Storytelling</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Craft a narrative prompt about a time traveler who discovers their own journal entries from the future, each one describing a different version of their life based on choices they haven't made yet. Explore themes of fate, free will, and the weight of decisions through vivid character development and emotional depth.
                  </p>
                  <Link to="/refine?example=Write a story about time travel&style=storytelling" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* UI/UX Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Gauge className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">UI/UX</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Design a modern, minimalist mobile app interface for a meditation and wellness app. Include a clean dashboard with breathing exercises, mood tracking, and guided meditation sessions. Focus on intuitive navigation, calming color palette (soft blues and greens), ample white space, and accessible touch targets for optimal user experience.
                  </p>
                  <Link to="/refine?example=Design a mobile app interface&style=ui-ux" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>

              {/* Image Prompt Style */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="glass rounded-xl p-6 h-full border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Image Prompt</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Create an image of a serene Japanese zen garden at sunrise, with carefully raked sand patterns, smooth river stones, a small wooden bridge over a koi pond, cherry blossoms in soft focus, golden hour lighting, shallow depth of field, 8K resolution, photorealistic, ultra-detailed, masterpiece quality.
                  </p>
                  <Link to="/refine?example=Make an image of a peaceful garden&style=image-prompt" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300">
                      Use This Preset
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative left-0 -translate-x-0 static border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" />
              <CarouselNext className="relative right-0 translate-x-0 static border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Why PromptMaster Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
              Why <span className="gradient-text">PromptMaster</span> Matters
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
              The gap between having an idea and creating a brilliant prompt is real—and we're here to bridge it
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Point 1: Struggle to express ideas */}
            <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">People Struggle to Express Ideas Clearly</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    You know what you want, but translating that vision into words AI can understand? That's where most people get stuck. Simple prompts lead to generic results.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2: AI responds better to structured prompts */}
            <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">AI Responds Better to Structured Prompts</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    When prompts include details, constraints, tone, and pacing—AI delivers exactly what you envision. Structure transforms vague requests into precise outputs.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3: Most users don't know how to add details */}
            <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">Most Users Don't Know How to Add Details, Constraints, Tone, or Pacing</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    It's not intuitive. What details matter? How do you control tone? What makes pacing perfect? These are skills that take time to learn—unless you see them in action.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 4: PromptMaster teaches by example */}
            <div className="glass rounded-lg md:rounded-xl p-4 md:p-8 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-5 transition-opacity duration-300" />
              <div className="relative flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_hsl(var(--secondary)/0.3)]">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-secondary">PromptMaster Teaches You by Example</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Every refined prompt shows you exactly what changed and why. You don't just get better results—you learn the art of prompt engineering through real examples. Watch your skills evolve with every transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-16 border border-primary/20 animate-glow relative overflow-hidden">
          {/* Enhanced glow background */}
          <div className="absolute inset-0 bg-gradient-primary opacity-5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
              Ready to Master <span className="gradient-text">AI Prompting?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-10 max-w-2xl mx-auto px-4">
              Transform your ideas into brilliant prompts with the power of AI
            </p>
            <Link to="/refine">
              <Button 
                size="lg" 
                className="gap-2 md:gap-3 text-base md:text-lg lg:text-xl px-8 md:px-12 py-6 md:py-8 h-auto font-semibold relative group overflow-hidden animate-glow hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.7)]"
              >
                <span className="relative z-10">Start Refining for Free</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;