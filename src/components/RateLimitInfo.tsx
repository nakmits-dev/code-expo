import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useRateLimit } from '../hooks/useGithubData';

export function RateLimitInfo() {
  const { rateLimit, error } = useRateLimit();

  if (error || !rateLimit) return null;

  const remaining = rateLimit.remaining;
  const resetTime = new Date(rateLimit.reset * 1000).toLocaleTimeString('ja-JP');

  if (remaining < 10) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-50 text-red-800 p-3 rounded-lg shadow-lg flex items-center gap-2">
        <AlertCircle size={20} />
        <span>API制限まで残り{remaining}回 ({resetTime}にリセット)</span>
      </div>
    );
  }

  return null;
}