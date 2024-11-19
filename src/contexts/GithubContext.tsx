import React, { createContext, useContext, useState } from 'react';

interface GithubContextType {
  username: string;
  setUsername: (username: string) => void;
}

const GithubContext = createContext<GithubContextType | undefined>(undefined);

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('nakmits-dev');

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