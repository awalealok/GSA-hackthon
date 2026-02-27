import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface LastUpdatedProps {
  timestamp?: Date;
  className?: string;
}

export function LastUpdated({ timestamp, className = '' }: LastUpdatedProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      if (!timestamp) {
        // Generate a random time between 1-15 minutes ago
        const minutesAgo = Math.floor(Math.random() * 15) + 1;
        setTimeAgo(`${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`);
        return;
      }

      const now = new Date();
      const diff = now.getTime() - timestamp.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (days > 0) {
        setTimeAgo(`${days} ${days === 1 ? 'day' : 'days'} ago`);
      } else if (hours > 0) {
        setTimeAgo(`${hours} ${hours === 1 ? 'hour' : 'hours'} ago`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      } else {
        setTimeAgo('just now');
      }
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div className={`flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      <span>Last updated {timeAgo}</span>
    </div>
  );
}
