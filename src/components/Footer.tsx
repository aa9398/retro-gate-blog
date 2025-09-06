import React from 'react';
import { Zap, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t-2 border-primary bg-card/90 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent border-2 border-primary" />
              <h3 className="font-pixel text-lg text-primary animate-neon-glow">
                RetroBlock
              </h3>
            </div>
            <p className="font-mono-retro text-sm text-muted-foreground">
              The future of blogging, with a retro twist. Share your thoughts in pixelated style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-pixel text-sm text-accent mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="font-mono-retro text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Feed
                </a>
              </li>
              <li>
                <a 
                  href="/create" 
                  className="font-mono-retro text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Create Post
                </a>
              </li>
              <li>
                <a 
                  href="/dashboard" 
                  className="font-mono-retro text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-pixel text-sm text-accent mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                title="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                title="Discord"
              >
                <Zap size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-primary/30 text-center">
          <p className="font-mono-retro text-xs text-muted-foreground">
            © 2024 RetroBlock. Built with ❤️ for the retro community.
          </p>
          <div className="mt-2 flex justify-center space-x-2">
            <div className="w-1 h-1 bg-primary animate-pulse" />
            <div className="w-1 h-1 bg-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="w-1 h-1 bg-accent animate-pulse" style={{ animationDelay: '0.6s' }} />
            <div className="w-1 h-1 bg-primary animate-pulse" style={{ animationDelay: '0.8s' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;