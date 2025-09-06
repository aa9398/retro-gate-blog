import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Home, User, PenTool } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Retro Grid Background */}
      <div className="fixed inset-0 retro-grid opacity-30 pointer-events-none" />
      
      {/* Scan Lines Effect */}
      <div className="scan-lines" />

      {/* Navigation Header */}
      <header className="relative z-10 border-b-2 border-primary bg-card/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent border-2 border-primary" />
              <h1 className="font-pixel text-xl text-primary animate-neon-glow">
                RetroBlock
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Home size={16} />
                <span>Feed</span>
              </Link>
              
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === '/dashboard' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <User size={16} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/create"
                className={`flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === '/create' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <PenTool size={16} />
                <span>Create</span>
              </Link>
            </nav>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 border-2 border-primary image-pixelated"
                />
                <span className="font-pixel text-xs text-primary">
                  {user?.name}
                </span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider text-destructive hover:text-destructive/80 transition-colors duration-300"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;