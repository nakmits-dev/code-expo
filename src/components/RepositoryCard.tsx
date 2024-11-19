import React from 'react';
import { Calendar, Star, Globe, ExternalLink } from 'lucide-react';
import { Repository } from '../types/github';
import { LanguageIcon } from './LanguageIcon';

interface Props {
  repo: Repository;
}

export function RepositoryCard({ repo }: Props) {
  return (
    <div className="card">
      <div className="relative h-2 bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 opacity-50"></div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
          <div className="flex items-center gap-1.5 bg-surface text-primary px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={16} />
            <span>{repo.stargazers_count}</span>
          </div>
        </div>

        <p className="text-text-secondary mb-4 line-clamp-2">
          {repo.description || 'No description available'}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.map(topic => (
              <span
                key={topic}
                className="px-3 py-1 text-sm rounded-full bg-surface text-primary border border-border hover:bg-primary-5 transition-colors duration-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <LanguageIcon language={repo.language} size={18} />
              <span className="font-medium">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{new Date(repo.updated_at).toLocaleDateString('ja-JP')}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg button-outline"
          >
            <Globe size={18} />
            <span>コードを見る</span>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg button-primary"
            >
              <ExternalLink size={18} />
              <span>デモを見る</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}