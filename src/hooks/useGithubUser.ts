import useSWR from 'swr';
import { useGithubUsername } from '../contexts/GithubContext';
import toast from 'react-hot-toast';

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  blog: string;
  email: string;
  twitter_username: string;
  company: string;
  location: string;
  followers: number;
  following: number;
}

const GITHUB_API = 'https://api.github.com';

async function fetcher(url: string) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('ユーザー情報の取得に失敗しました');
  }
  
  return response.json();
}

export function useGithubUser() {
  const { username } = useGithubUsername();
  const { data, error, isLoading } = useSWR<GithubUser>(
    username ? `${GITHUB_API}/users/${username}` : null,
    fetcher,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  );

  return {
    user: data,
    isLoading,
    error
  };
}