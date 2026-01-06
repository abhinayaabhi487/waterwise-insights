import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'safe' | 'moderate' | 'unsafe';
  label: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const statusStyles = {
    safe: 'status-badge-safe',
    moderate: 'status-badge-moderate',
    unsafe: 'status-badge-unsafe',
  };

  return (
    <span className={cn(statusStyles[status], className)}>
      {label}
    </span>
  );
};

export default StatusBadge;
