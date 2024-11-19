import React from 'react';
import {
  FileJson,
  FileType,
  FileCode,
  FileCheck,
  FileCog,
  FileSearch,
  Braces,
  Coffee,
  Hash,
  Terminal,
  Cpu,
  Gem,
  Database,
  Layers,
  Palette
} from 'lucide-react';

interface Props {
  language: string;
  size?: number;
}

export function LanguageIcon({ language, size = 16 }: Props) {
  const className = "flex-shrink-0";

  switch (language.toLowerCase()) {
    case 'javascript':
      return <FileJson size={size} className={`${className} text-yellow-500`} />;
    case 'typescript':
      return <FileType size={size} className={`${className} text-blue-500`} />;
    case 'python':
      return <FileCode size={size} className={`${className} text-green-500`} />;
    case 'java':
      return <Coffee size={size} className={`${className} text-red-500`} />;
    case 'c#':
    case 'csharp':
      return <Hash size={size} className={`${className} text-purple-500`} />;
    case 'php':
      return <Braces size={size} className={`${className} text-indigo-500`} />;
    case 'go':
      return <Terminal size={size} className={`${className} text-cyan-500`} />;
    case 'rust':
      return <Cpu size={size} className={`${className} text-orange-500`} />;
    case 'ruby':
      return <Gem size={size} className={`${className} text-red-600`} />;
    case 'sql':
    case 'plsql':
      return <Database size={size} className={`${className} text-blue-600`} />;
    case 'vue':
    case 'svelte':
      return <Layers size={size} className={`${className} text-green-600`} />;
    case 'css':
    case 'scss':
    case 'sass':
    case 'less':
      return <Palette size={size} className={`${className} text-pink-500`} />;
    case 'c':
    case 'c++':
    case 'cpp':
      return <FileCog size={size} className={`${className} text-blue-700`} />;
    default:
      return <FileSearch size={size} className={`${className} text-gray-500`} />;
  }
}