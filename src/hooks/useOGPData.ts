import useSWR from 'swr';
import { OGPData } from '../types/github';
import toast from 'react-hot-toast';

const API_ENDPOINT = '/api/ogp';

async function fetcher(url: string): Promise<OGPData> {
  if (!url || !url.startsWith('http')) {
    return {};
  }

  try {
    const targetUrl = url.trim();
    const params = new URLSearchParams({ url: targetUrl });
    const response = await fetch(`${API_ENDPOINT}?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'same-origin',
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'OGPデータの取得に失敗しました');
    }
    
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw new Error('無効なOGPデータ形式です');
    }
    
    return data;
  } catch (error) {
    console.error('OGP fetch error:', error instanceof Error ? error.message : error);
    return {};
  }
}

export function useOGPData(url: string | null) {
  const { data, error } = useSWR<OGPData>(
    url ? `ogp-${url}` : null,
    () => fetcher(url || ''),
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // 1時間キャッシュ
      fallbackData: {},
      shouldRetryOnError: false,
      errorRetryCount: 2,
      onError: (err) => {
        toast.error('プレビュー情報の取得に失敗しました');
      }
    }
  );

  return {
    ogpData: data || {},
    isLoading: !error && !data,
    error
  };
}