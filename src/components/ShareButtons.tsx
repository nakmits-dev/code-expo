import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, X } from 'lucide-react';
import { useGithubUsername } from '../contexts/GithubContext';
import toast from 'react-hot-toast';

export function ShareButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useGithubUsername();
  const currentUrl = `${window.location.origin}/?user=${encodeURIComponent(username)}`;
  const title = `${username}のポートフォリオ - Code Expo`;
  const description = `${username}のGitHubプロジェクトショーケース`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
        toast.success('共有しました');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('共有に失敗しました');
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'bg-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'bg-[#1877F2]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'bg-[#0A66C2]'
    }
  ];

  return (
    <>
      {/* モバイルでのオーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-4 left-4 z-50">
        <div className="relative">
          <button
            onClick={handleNativeShare}
            className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary 
                     transition-all duration-300 active:scale-95"
            aria-label="共有"
          >
            <Share2 size={24} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* デスクトップでのホバーメニュー */}
          <div className="absolute bottom-full left-0 mb-2 hidden md:group-hover:flex flex-col gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-white p-3 rounded-full shadow-lg 
                         hover:scale-110 transition-all duration-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2`}
                title={`${link.name}で共有`}
                aria-label={`${link.name}で共有`}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          {/* モバイルでのボトムシート */}
          <div
            className={`fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl p-6 transform transition-transform duration-300 md:hidden
                     ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-text">共有</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface rounded-full"
                aria-label="閉じる"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-surface transition-colors"
                >
                  <div className={`${link.color} p-3 rounded-full`}>
                    <link.icon size={24} className="text-white" />
                  </div>
                  <span className="text-sm text-text-secondary">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}