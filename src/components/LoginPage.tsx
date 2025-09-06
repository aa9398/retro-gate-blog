import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import heroImage from '@/assets/retro-hero.jpg';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Mock Google OAuth flow
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate OAuth redirect and token exchange
    toast.info('Redirecting to Google...');
    
    // Mock delay for OAuth process
    setTimeout(() => {
      // Mock user data that would come from Google
      const mockGoogleUser = {
        name: 'Retro Gamer',
        email: 'retro.gamer@example.com',
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}&backgroundColor=8b5cf6`,
      };
      
      login(mockGoogleUser);
      toast.success('Successfully logged in!');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 retro-grid opacity-30" />
      
      {/* Scan Lines Effect */}
      <div className="scan-lines" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="retro-card text-center hover-glow">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent border-4 border-primary animate-glow-pulse circuit-pattern" />
            <h1 className="retro-title mb-2 animate-neon-glow">RetroBlock</h1>
            <p className="font-pixel text-sm text-accent text-glow">
              The Pixelated Blog Platform
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="retro-subtitle mb-4">Enter the Matrix</h2>
              <p className="font-mono-retro text-sm text-muted-foreground mb-6">
                Connect with Google to access your retro blogging experience
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="retro-button w-full flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span className="loading-dots">Connecting</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 image-pixelated" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Login with Google</span>
                </>
              )}
            </button>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-primary/30">
              <p className="font-mono-retro text-xs text-muted-foreground">
                Welcome to the retro future of blogging
              </p>
              <div className="mt-2 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary animate-pulse" />
                <div className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;