import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  description: string;
  color?: 'primary' | 'accent' | 'destructive';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon: Icon, 
  title, 
  count, 
  description, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'text-primary border-primary/50',
    accent: 'text-accent border-accent/50',
    destructive: 'text-destructive border-destructive/50',
  };

  return (
    <div className={`retro-card text-center ${colorClasses[color]} hover-glow`}>
      <Icon className="w-12 h-12 mx-auto mb-4 animate-pulse" />
      <div className="font-pixel text-2xl mb-2 text-glow">{count}</div>
      <h3 className="font-pixel text-xs uppercase tracking-wider mb-2">{title}</h3>
      <p className="font-mono-retro text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export default StatsCard;