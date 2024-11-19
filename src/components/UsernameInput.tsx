import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useGithubUsername } from '../contexts/GithubContext';
import toast from 'react-hot-toast';

export function UsernameInput() {
  const { username, setUsername } = useGithubUsername();
  const [inputValue, setInputValue] = useState(username);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setInputValue(username);
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDebouncing) {
      return;
    }

    const trimmedValue = inputValue.trim();
    
    if (trimmedValue === '') {
      toast.error('ユーザー名を入力してください');
      return;
    }

    if (trimmedValue === username) {
      toast.error('同じユーザー名が設定されています');
      return;
    }

    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(trimmedValue)) {
      toast.error('無効なユーザー名です');
      return;
    }

    setIsDebouncing(true);
    setUsername(trimmedValue);
    
    setTimeout(() => {
      setIsDebouncing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="GitHubのユーザー名を入力"
          className="w-full px-4 py-2 pr-12 rounded-lg border border-border bg-surface
                   text-text placeholder-text-secondary/60
                   focus:outline-none focus:ring-2 focus:ring-primary-5 focus:border-primary
                   transition-all duration-300"
          disabled={isDebouncing}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md
                     text-text-secondary hover:text-primary
                     hover:bg-primary-5 transition-all duration-300
                     ${isDebouncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDebouncing}
        >
          <Search size={20} className="transition-transform group-hover:scale-110" />
        </button>
      </div>
    </form>
  );
}