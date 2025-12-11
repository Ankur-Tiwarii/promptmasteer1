import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Star, Users, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data from database
  const courses = [
    {
      id: 1,
      title: "Master Prompt Engineering for ChatGPT",
      instructor: "John Doe",
      price: 49.99,
      rating: 4.8,
      students: 1234,
      duration: "8 hours",
      thumbnail: "/placeholder.svg",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced AI Prompting Techniques",
      instructor: "Jane Smith",
      price: 79.99,
      rating: 4.9,
      students: 856,
      duration: "12 hours",
      thumbnail: "/placeholder.svg",
      level: "Advanced",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Learn <span className="gradient-text">Prompt Engineering</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master the art of AI prompting from industry experts. Build your skills and become a prompt master.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="glass border-primary/20 p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/30 border-border/50"
                />
              </div>
              <Button>Search</Button>
            </div>
          </Card>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`}>
                <Card className="glass border-primary/20 overflow-hidden hover:border-primary/40 transition-all hover:scale-105 cursor-pointer">
                  <div className="aspect-video bg-muted/30 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {course.level}
                      </span>
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-2xl font-bold gradient-text">${course.price}</span>
                      <Button size="sm">Enroll Now</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA for Instructors */}
          <Card className="glass border-primary/20 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Become an <span className="gradient-text">Instructor</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Share your expertise in AI and prompt engineering. Create courses, earn money, and help others master prompting.
            </p>
            <Link to="/teach">
              <Button size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Start Teaching
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
