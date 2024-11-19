import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useGithubRepositories } from './hooks/useGithubData';
import { RepositoryCard } from './components/RepositoryCard';
import { RateLimitInfo } from './components/RateLimitInfo';
import { UsernameInput } from './components/UsernameInput';
import { UserProfile } from './components/UserProfile';
import { useGithubUsername } from './contexts/GithubContext';

function App() {
  const { username } = useGithubUsername();
  const { repositories, isLoading, error, retry } = useGithubRepositories();

  return (
    <>
      <Helmet>
        <title>{`Code Expo - ${username}'s Portfolio`}</title>
        <meta name="description" content={`${username}のGitHubプロジェクトショーケース`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1a1a1a',
              border: '1px solid #e5e7eb',
            },
            success: {
              iconTheme: {
                primary: '#0075E2',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
              duration: 5000,
            },
          }} 
        />
        
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-[#0075E2] hover:text-[#1E90FF] transition-colors">
                Code Expo
              </h1>
              <div className="flex-1 max-w-xl">
                <UsernameInput />
              </div>
            </div>
          </div>
        </header>
        
        <UserProfile />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader className="w-8 h-8 animate-spin text-[#0075E2]" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <p className="text-red-600 mb-4 text-lg">
                {error.message || 'エラーが発生しました'}
              </p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-[#0075E2] text-white rounded-lg hover:bg-[#1E90FF] transition-colors"
              >
                再試行
              </button>
            </div>
          ) : repositories?.length === 0 ? (
            <div className="text-center text-gray-600 min-h-[400px] flex items-center justify-center">
              <p className="text-lg">
                公開リポジトリが見つかりませんでした
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories?.map(repo => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </main>

        <RateLimitInfo />
      </div>
    </>
  );
}

export default App;