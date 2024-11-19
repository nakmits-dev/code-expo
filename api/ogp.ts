import ogs from 'open-graph-scraper';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({
      error: '無効なURLです'
    });
  }

  try {
    const options = {
      url: url.trim(),
      timeout: 10000,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; CodeExpo/1.0)',
      },
      onlyGetOpenGraphInfo: true,
      retry: { 
        max: 2,
        delay: 1000
      },
      followRedirects: true,
      blacklist: [
        'favicon',
        'manifest.json',
        '.css',
        '.js',
        '.ico',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg'
      ]
    };

    const { error, result } = await ogs(options);
    
    if (error) {
      throw error;
    }

    const response = {
      title: result.ogTitle || result.twitterTitle || '',
      description: result.ogDescription || result.twitterDescription || '',
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || ''
    };

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(response);
  } catch (error) {
    console.error('OGP Scraping Error:', error);
    return res.status(500).json({
      error: 'OGPデータの取得に失敗しました'
    });
  }
}