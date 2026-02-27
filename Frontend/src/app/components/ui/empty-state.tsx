import React from 'react';
import { LucideIcon, Package, AlertTriangle, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'warning' | 'info';
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  variant = 'default'
}: EmptyStateProps) {
  const variantStyles = {
    default: {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-400 dark:text-gray-500',
      titleColor: 'text-gray-900 dark:text-gray-100',
      descColor: 'text-gray-600 dark:text-gray-400'
    },
    warning: {
      bg: 'bg-orange-50 dark:bg-orange-900/10',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      titleColor: 'text-orange-900 dark:text-orange-100',
      descColor: 'text-orange-700 dark:text-orange-300'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-900 dark:text-blue-100',
      descColor: 'text-blue-700 dark:text-blue-300'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center`}>
      <div className={`${styles.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-8 h-8 ${styles.iconColor}`} />
      </div>
      <h3 className={`text-lg font-medium ${styles.titleColor} mb-2`}>
        {title}
      </h3>
      <p className={`${styles.descColor} max-w-md mx-auto mb-4`}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
