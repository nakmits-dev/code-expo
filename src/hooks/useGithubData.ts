import useSWR from 'swr';
import { Repository, RateLimit } from '../types/github';
import { useGithubUsername } from '../contexts/GithubContext';
import toast from 'react-hot-toast';

const GITHUB_API = 'https://api.github.com';

async function fetcher(url: string) {
  const response = await fetch(url);
  
  if (response.status === 404) {
    throw new Error('ユーザーが見つかりませんでした');
  }
  
  if (response.status === 403) {
    const rateLimitReset = response.headers.get('x-ratelimit-reset');
    const resetTime = new Date(Number(rateLimitReset) * 1000).toLocaleTimeString('ja-JP');
    throw new Error(`API制限に達しました。${resetTime}にリセットされます。`);
  }
  
  if (!response.ok) {
    throw new Error('データの取得に失敗しました。しばらく待ってから再試行してください。');
  }
  
  return response.json();
}

export function useGithubRepositories() {
  const { username } = useGithubUsername();
  const { data, error, isLoading, mutate } = useSWR<Repository[]>(
    username ? `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100` : null,
    fetcher,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      revalidateOnFocus: false,
      dedupingInterval: 30000
    }
  );

  const retry = () => {
    toast.promise(
      mutate(),
      {
        loading: 'データを再取得中...',
        success: 'データを更新しました',
        error: 'リトライに失敗しました'
      }
    );
  };

  return {
    repositories: data,
    isLoading,
    error,
    retry
  };
}

export function useRateLimit() {
  const { data, error } = useSWR<{ resources: { core: RateLimit } }>(
    `${GITHUB_API}/rate_limit`,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
      onError: (err) => {
        console.error('Rate limit check failed:', err);
      }
    }
  );

  return {
    rateLimit: data?.resources.core,
    error
  };
}