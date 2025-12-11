import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Creator = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Coming Soon State */}
          <Card className="glass border-primary/20 p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <Avatar className="w-24 h-24 mx-auto border-2 border-primary/20">
                <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                  {username?.charAt(0).toUpperCase() || <User className="w-8 h-8" />}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold gradient-text">@{username}</h3>
              <p className="text-muted-foreground">
                Creator profiles are coming soon! You'll be able to view creator stats, 
                their uploaded prompts, and follow your favorite prompt engineers.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Creator;