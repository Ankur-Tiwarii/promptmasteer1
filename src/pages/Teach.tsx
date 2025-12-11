import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Users, Video, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Teach = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Set your own prices and earn revenue from every course sale",
    },
    {
      icon: Users,
      title: "Build Your Audience",
      description: "Reach thousands of students eager to learn prompt engineering",
    },
    {
      icon: Video,
      title: "Easy Course Creation",
      description: "Upload videos, create lessons, and manage your content easily",
    },
    {
      icon: BookOpen,
      title: "Share Your Expertise",
      description: "Help others master AI prompting and make an impact",
    },
  ];

  const steps = [
    "Sign up and create your instructor profile",
    "Plan your course curriculum and content",
    "Record and upload your video lessons",
    "Set your pricing and publish your course",
    "Start earning as students enroll",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Teach <span className="gradient-text">Prompt Engineering</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Share your AI and LLM expertise with thousands of learners. Create courses, earn money, and help shape the future of prompt engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <BookOpen className="w-5 h-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">
              Why <span className="gradient-text">Teach With Us?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass border-primary/20 p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <Card className="glass border-primary/20 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              How It <span className="gradient-text">Works</span>
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <p className="text-lg pt-1">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Requirements */}
          <Card className="glass border-primary/20 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Instructor <span className="gradient-text">Requirements</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                "Expertise in AI, LLMs, or prompt engineering",
                "Ability to create clear, engaging video content",
                "Passion for teaching and helping others learn",
                "Commitment to creating quality educational content",
              ].map((req, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Ready to <span className="gradient-text">Start Teaching?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join our community of expert instructors today
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2 text-lg px-10">
                <BookOpen className="w-5 h-5" />
                Become an Instructor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Teach;
