import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIExplainabilityProps {
  recommendation: string;
  reasons: string[];
  confidence: number;
  variant?: 'default' | 'compact';
}

export function AIExplainability({
  recommendation,
  reasons,
  confidence,
  variant = 'default'
}: AIExplainabilityProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getConfidenceColor = () => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getConfidenceLabel = () => {
    if (confidence >= 80) return 'High confidence';
    if (confidence >= 60) return 'Medium confidence';
    return 'Low confidence';
  };

  if (variant === 'compact') {
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-start justify-between gap-2 text-left"
        >
          <div className="flex items-start gap-2 flex-1">
            <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-indigo-900 dark:text-indigo-100">
                {recommendation}
              </div>
              <div className={`text-xs mt-1 ${getConfidenceColor()}`}>
                {getConfidenceLabel()} ({confidence}%)
              </div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800 space-y-2">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-indigo-800 dark:text-indigo-200">
                <div className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-1.5 flex-shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              AI Recommendation
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {recommendation}
            </p>
          </div>
        </div>
        <div className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getConfidenceColor()} bg-white dark:bg-gray-800`}>
          {confidence}%
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
      >
        <span className="font-medium">Why this recommendation?</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800 space-y-2.5">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
