import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 retro-grid opacity-20" />
      
      {/* Scan Lines Effect */}
      <div className="scan-lines" />

      {/* 404 Content */}
      <div className="relative z-10 text-center">
        <div className="retro-card max-w-md mx-auto">
          <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-destructive animate-pulse" />
          
          <h1 className="retro-title mb-4 text-destructive">404</h1>
          <h2 className="retro-subtitle mb-6">Page Not Found</h2>
          
          <p className="font-mono-retro text-muted-foreground mb-8">
            The page you're looking for has been deleted or moved to another dimension.
          </p>
          
          <Link to="/" className="retro-button inline-flex items-center space-x-2">
            <Home size={16} />
            <span>Return to Feed</span>
          </Link>
          
          <div className="mt-6 pt-6 border-t border-primary/30">
            <p className="font-pixel text-xs text-muted-foreground">
              Error Code: {location.pathname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
