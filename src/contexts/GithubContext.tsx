import React, { createContext, useContext, useState, useEffect } from 'react';

interface GithubContextType {
  username: string;
  setUsername: (username: string) => void;
}

const GithubContext = createContext<GithubContextType | undefined>(undefined);

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState(() => {
    // URLクエリからユーザー名を取得
    const params = new URLSearchParams(window.location.search);
    return params.get('user') || 'nakmits-dev';
  });

  // ユーザー名が変更されたらURLを更新
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('user', username);
    window.history.pushState({}, '', url.toString());
  }, [username]);

  return (
    <GithubContext.Provider value={{ username, setUsername }}>
      {children}
    </GithubContext.Provider>
  );
}

export function useGithubUsername() {
  const context = useContext(GithubContext);
  if (context === undefined) {
    throw new Error('useGithubUsername must be used within a GithubProvider');
  }
  return context;
}