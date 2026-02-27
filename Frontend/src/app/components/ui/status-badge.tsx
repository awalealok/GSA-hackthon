import React from 'react';

interface StatusBadgeProps {
  status: 'live' | 'active' | 'ai-recommended' | 'manual-review' | 'pending' | 'success' | 'warning' | 'error';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, pulse = false, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  const statusConfig = {
    live: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      dot: 'bg-green-600',
      label: 'Live'
    },
    active: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      dot: 'bg-blue-600',
      label: 'Active'
    },
    'ai-recommended': {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-700 dark:text-indigo-300',
      dot: 'bg-indigo-600',
      label: 'AI Recommended'
    },
    'manual-review': {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-700 dark:text-orange-300',
      dot: 'bg-orange-600',
      label: 'Manual Review Required'
    },
    pending: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-300',
      dot: 'bg-yellow-600',
      label: 'Pending'
    },
    success: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      dot: 'bg-green-600',
      label: 'Success'
    },
    warning: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-700 dark:text-orange-300',
      dot: 'bg-orange-600',
      label: 'Warning'
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      dot: 'bg-red-600',
      label: 'Error'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${pulse ? 'animate-pulse' : ''}`} />
      {config.label}
    </span>
  );
}
