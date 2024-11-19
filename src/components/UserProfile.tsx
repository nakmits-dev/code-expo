import React from 'react';
import { MapPin, Building, Link as LinkIcon, Twitter, Globe, Mail, Linkedin, Facebook, Youtube, Instagram, Github } from 'lucide-react';
import { useGithubUser } from '../hooks/useGithubUser';

function getSocialLinks(blog: string) {
  const links = [];
  const urls = blog.split(/[\s,]+/).filter(url => url.trim());

  for (const url of urls) {
    const cleanUrl = url.trim().toLowerCase();
    if (!cleanUrl.startsWith('http')) continue;

    try {
      const urlObj = new URL(cleanUrl);
      const domain = urlObj.hostname;

      if (domain.includes('twitter.com')) {
        links.push({ type: 'X (Twitter)', url: cleanUrl, icon: Twitter, color: 'bg-[#1DA1F2]' });
      } else if (domain.includes('linkedin.com')) {
        links.push({ type: 'LinkedIn', url: cleanUrl, icon: Linkedin, color: 'bg-[#0A66C2]' });
      } else if (domain.includes('facebook.com')) {
        links.push({ type: 'Facebook', url: cleanUrl, icon: Facebook, color: 'bg-[#1877F2]' });
      } else if (domain.includes('youtube.com')) {
        links.push({ type: 'YouTube', url: cleanUrl, icon: Youtube, color: 'bg-[#FF0000]' });
      } else if (domain.includes('instagram.com')) {
        links.push({ type: 'Instagram', url: cleanUrl, icon: Instagram, color: 'bg-[#E4405F]' });
      } else {
        links.push({ type: 'Website', url: cleanUrl, icon: Globe, color: 'bg-primary' });
      }
    } catch {
      continue;
    }
  }

  return links;
}

export function UserProfile() {
  const { user, isLoading } = useGithubUser();

  if (isLoading) {
    return (
      <div className="w-full h-48 bg-surface animate-pulse"></div>
    );
  }

  if (!user) return null;

  const socialLinks = user.blog ? getSocialLinks(user.blog) : [];
  const allSocialLinks = [
    {
      type: 'GitHub',
      url: `https://github.com/${user.login}`,
      icon: Github,
      color: 'bg-[#333333]'
    },
    ...(user.email ? [{
      type: 'Email',
      url: `mailto:${user.email}`,
      icon: Mail,
      color: 'bg-primary'
    }] : []),
    ...(user.twitter_username ? [{
      type: 'X (Twitter)',
      url: `https://twitter.com/${user.twitter_username}`,
      icon: Twitter,
      color: 'bg-[#1DA1F2]'
    }] : []),
    ...socialLinks
  ];

  return (
    <div className="relative mb-8 overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-ring"></div>
              <img
                className="relative h-32 w-32 rounded-full ring-4 ring-white sm:h-40 sm:w-40 object-cover transform transition-all duration-300 group-hover:scale-105 animate-float"
                src={user.avatar_url}
                alt={user.name || 'User avatar'}
              />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="mb-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
                {user.name || user.login}
              </h1>
              {user.login && user.name && (
                <p className="text-lg text-text-secondary mt-1">@{user.login}</p>
              )}
            </div>
            {user.bio && (
              <p className="text-lg text-text-secondary mb-4 max-w-2xl leading-relaxed">
                {user.bio}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-6">
              {user.company && (
                <div className="flex items-center text-text-secondary hover:text-primary transition-colors">
                  <Building className="h-5 w-5 mr-2" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center text-text-secondary hover:text-primary transition-colors">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              {allSocialLinks.map(({ type, url, icon: Icon, color }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${color}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{type}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}