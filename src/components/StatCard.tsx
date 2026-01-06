import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  description?: string;
  status?: 'safe' | 'moderate' | 'unsafe';
  className?: string;
}

const StatCard = ({ title, value, unit, icon: Icon, description, status, className }: StatCardProps) => {
  const statusColors = {
    safe: 'border-l-status-safe',
    moderate: 'border-l-status-moderate',
    unsafe: 'border-l-status-unsafe',
  };

  return (
    <div className={cn(
      'stat-card border-l-4',
      status ? statusColors[status] : 'border-l-primary',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {value}
            {unit && <span className="text-lg font-normal text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        <div className={cn(
          'p-3 rounded-xl',
          status === 'safe' && 'bg-status-safe-bg text-status-safe',
          status === 'moderate' && 'bg-status-moderate-bg text-status-moderate',
          status === 'unsafe' && 'bg-status-unsafe-bg text-status-unsafe',
          !status && 'bg-secondary text-primary'
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};

export default StatCard;
