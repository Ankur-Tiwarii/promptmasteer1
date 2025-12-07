import { Link } from "react-router-dom";
import { Mail, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">About</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                PromptMaster was founded by <span className="text-primary font-medium">Ankur Tiwari</span>, a visionary developer and AI enthusiast dedicated to bridging the gap between human creativity and artificial intelligence.
              </p>
              <p>
                With deep expertise in prompt engineering and a passion for making AI more accessible, Ankur created PromptMaster to empower users to unlock the full potential of AI through better communication.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a 
                href="mailto:ankur.tiwari.work@gmail.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>ankur.tiwari.work@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Terms Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Terms</h3>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">
                  Terms of Service
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glass border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl gradient-text">Terms of Service</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Last updated: January 2025
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing and using PromptMaster, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms, please do not use our service.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">2. Use License</h4>
                    <p>Permission is granted to temporarily use PromptMaster for personal, non-commercial purposes. This license does not include any resale or commercial use of PromptMaster or its contents.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">3. User Content</h4>
                    <p>You retain all ownership rights to prompts you create. By using our service, you grant PromptMaster a license to process your prompts for the purpose of providing refinement services. We do not claim ownership of your content.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">4. Service Availability</h4>
                    <p>PromptMaster is provided "as is" without warranties of any kind. We reserve the right to modify or discontinue the service at any time without notice.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">5. Limitation of Liability</h4>
                    <p>PromptMaster shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Privacy Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Privacy</h3>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glass border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl gradient-text">Privacy Policy</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Last updated: January 2025
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">1. Information We Collect</h4>
                    <p>We collect information you provide directly to us, including prompts you input, account information, and any communications with our support team. We also automatically collect certain technical information when you use our service.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h4>
                    <p>We use the information we collect to provide, maintain, and improve our services, process your prompts, communicate with you, and ensure the security of our platform.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">3. Data Storage and Security</h4>
                    <p>Your prompts and data are stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">4. Data Sharing</h4>
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share data only as necessary to provide our services or as required by law.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">5. Your Rights</h4>
                    <p>You have the right to access, update, or delete your personal information at any time. You can manage your account settings or contact us to exercise these rights.</p>
                  </section>
                  <section>
                    <h4 className="font-semibold text-foreground mb-2">6. Cookies and Tracking</h4>
                    <p>We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our service functionality.</p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>© PromptMaster 2025</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Built with precision and passion for the AI community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
