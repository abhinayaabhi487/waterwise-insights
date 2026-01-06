import { cn } from '@/lib/utils';

interface WaterQualityGaugeProps {
  value: number;
  max: number;
  safeMax: number;
  moderateMax: number;
  label: string;
  unit: string;
}

const WaterQualityGauge = ({ value, max, safeMax, moderateMax, label, unit }: WaterQualityGaugeProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  let status: 'safe' | 'moderate' | 'unsafe';
  if (value <= safeMax) status = 'safe';
  else if (value <= moderateMax) status = 'moderate';
  else status = 'unsafe';

  const statusColors = {
    safe: 'bg-status-safe',
    moderate: 'bg-status-moderate',
    unsafe: 'bg-status-unsafe',
  };

  return (
    <div className="water-card p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn(
          'text-lg font-bold',
          status === 'safe' && 'text-status-safe',
          status === 'moderate' && 'text-status-moderate',
          status === 'unsafe' && 'text-status-unsafe'
        )}>
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </span>
      </div>
      
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', statusColors[status])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>0</span>
        <span className="text-status-safe">Safe: ≤{safeMax}</span>
        <span className="text-status-moderate">Moderate: ≤{moderateMax}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default WaterQualityGauge;
