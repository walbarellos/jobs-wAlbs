"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { 
  User, Github, ExternalLink, Sparkles, TrendingUp, Award, 
  Zap, Menu, X, Grid, List, Eye, Copy, Star, Flame, Calendar,
  GitBranch, Code, Book, Package
} from 'lucide-react';

type ThemeKey = 'dark' | 'blue' | 'purple' | 'gradient' | 'neon' | 'ocean';
type ViewMode = 'grid' | 'list';

type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  featured?: boolean;
  lastUpdate: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
};

const THEMES: Record<ThemeKey, { bg: string; accent: string }> = {
  dark: { 
    bg: 'from-gray-900 via-black to-gray-900',
    accent: 'from-blue-500 to-purple-500'
  },
  blue: { 
    bg: 'from-blue-950 via-blue-900 to-indigo-950',
    accent: 'from-cyan-400 to-blue-500'
  },
  purple: { 
    bg: 'from-purple-950 via-purple-900 to-pink-950',
    accent: 'from-purple-400 to-pink-500'
  },
  gradient: { 
    bg: 'from-orange-900 via-red-900 to-pink-900',
    accent: 'from-yellow-400 to-red-500'
  },
  neon: { 
    bg: 'from-black via-gray-900 to-black',
    accent: 'from-green-400 to-cyan-400'
  },
  ocean: { 
    bg: 'from-teal-950 via-blue-950 to-indigo-950',
    accent: 'from-teal-400 to-blue-500'
  }
};

const PROFILE = {
  name: "Willian Albarello",
  username: "walbarellos",
  bio: "Full Stack Developer | Open Source Enthusiast | Building the Future",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=walbarello",
  githubUrl: "https://github.com/walbarellos",
  totalContributions: 127,
  currentStreak: 12,
  longestStreak: 45
};

const REPOSITORIES: Repository[] = [
  { 
    id: 'blackhole', 
    name: 'BlackHoleDemo', 
    description: 'Interactive black hole simulation with Three.js and WebGL',
    url: 'https://github.com/walbarellos/BlackHoleDemo',
    language: 'JavaScript',
    stars: 24,
    forks: 5,
    featured: true,
    lastUpdate: '2025-11-26'
  },
  { 
    id: 'shomer', 
    name: 'shomer-OSINT', 
    description: 'OSINT toolkit for reconnaissance and information gathering',
    url: 'https://github.com/walbarellos/shomer-OSINT',
    language: 'Python',
    stars: 18,
    forks: 3,
    featured: true,
    lastUpdate: '2025-11-24'
  },
  { 
    id: 'zsh-config', 
    name: 'mypersonal-zsh-config', 
    description: 'My customized Zsh configuration with themes and plugins',
    url: 'https://github.com/walbarellos/mypersonal-zsh-config',
    language: 'Shell',
    stars: 12,
    forks: 2,
    featured: false,
    lastUpdate: '2025-11-23'
  }
];

const PRODUCTS: Product[] = [
  {
    id: 'vscode-theme',
    name: 'Dark Ocean Theme',
    description: 'VSCode theme inspired by deep ocean colors',
    url: '#',
    icon: '🎨',
    category: 'Extension'
  },
  {
    id: 'devtools',
    name: 'DevTools CLI',
    description: 'Command line tools for developers',
    url: '#',
    icon: '⚡',
    category: 'Tool'
  },
  {
    id: 'course',
    name: 'React Advanced',
    description: 'Advanced React patterns and best practices',
    url: '#',
    icon: '📚',
    category: 'Course'
  }
];

// Simulação de contribuições do GitHub (últimos 53 dias)
const generateContributions = () => {
  const contributions = [];
  const today = new Date();
  
  for (let i = 52; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const level = Math.floor(Math.random() * 5); // 0-4
    contributions.push({
      date: date.toISOString().split('T')[0],
      count: level === 0 ? 0 : level * 3,
      level
    });
  }
  
  return contributions;
};

export default function GithubPortfolio() {
  const [theme, setTheme] = useState<ThemeKey>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showMenu, setShowMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [contributions] = useState(generateContributions());

  const copyProfileLink = () => {
    navigator.clipboard.writeText(PROFILE.githubUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getLevelColor = (level: number) => {
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
    return colors[level];
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 136, 0.6); }
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-br ${THEMES[theme].bg} text-white transition-all duration-700 relative overflow-hidden`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Top Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Dev Portfolio
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              
              <button 
                onClick={copyProfileLink}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                {copiedLink ? <Star size={20} className="text-yellow-400" /> : <Copy size={20} />}
              </button>
              
              <a 
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </nav>

        {/* Sidebar Menu */}
        <div className={`fixed left-0 top-0 h-full w-72 glass-morphism border-r border-white/10 z-40 transition-transform duration-300 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 space-y-6 mt-16">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">TEMAS</h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(THEMES) as ThemeKey[]).map(key => (
                  <button
                    key={key}
                    onClick={() => {setTheme(key); setShowMenu(false);}}
                    className={`h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                      theme === key ? 'border-white scale-105' : 'border-white/20'
                    } bg-gradient-to-br ${THEMES[key].bg}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          
          {/* Profile Header */}
          <header className="mb-16 flex flex-col items-center text-center">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition animate-pulse" />
              <img
                src={PROFILE.avatarUrl}
                alt={PROFILE.name}
                className="relative w-36 h-36 rounded-full border-4 border-white/20 shadow-2xl"
              />
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-gray-900 bg-white text-gray-900 hover:scale-110 transition"
              >
                <Github size={20} />
              </a>
            </div>

            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {PROFILE.name}
            </h1>
            <p className="text-gray-400 mb-1">@{PROFILE.username}</p>
            <p className="text-gray-300 text-xl max-w-2xl mb-6">{PROFILE.bio}</p>

            <div className="flex items-center gap-4">
              <div className="glass-morphism px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Flame size={16} className="text-orange-400" />
                <span>{PROFILE.currentStreak} day streak</span>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <TrendingUp size={16} className="text-green-400" />
                <span>{PROFILE.totalContributions} contributions</span>
              </div>
            </div>

            {copiedLink && (
              <div className="mt-4 glass-morphism px-4 py-2 rounded-lg text-sm text-green-400 animate-bounce">
                GitHub link copied!
              </div>
            )}
          </header>

          {/* GitHub Contributions Graph */}
          <section className="mb-12">
            <div className="glass-morphism rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar size={24} className="text-green-400" />
                  Contribution Activity
                </h2>
                <span className="text-sm text-gray-400">November 2025</span>
              </div>
              
              <div className="overflow-x-auto">
                <div className="inline-flex gap-1 min-w-full">
                  {contributions.map((day, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm hover:ring-2 ring-white transition-all cursor-pointer"
                      style={{ backgroundColor: getLevelColor(day.level) }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getLevelColor(level) }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </section>

          {/* Featured Repositories */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${THEMES[theme].accent}`}>
                  <Code size={24} />
                </div>
                Featured Projects
              </h2>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
              {REPOSITORIES.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group glass-morphism rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 block ${
                    repo.featured ? 'ring-2 ring-yellow-400/50' : ''
                  }`}
                >
                  {repo.featured && (
                    <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold mb-3">
                      <Star size={14} fill="currentColor" />
                      FEATURED
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-blue-400 transition">
                        <Book size={20} />
                        {repo.name}
                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition" />
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{repo.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch size={14} />
                      {repo.forks}
                    </span>
                    <span className="ml-auto text-xs">
                      Updated {new Date(repo.lastUpdate).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Recommended Products */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Package size={24} />
                </div>
                Recommended Products
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  className="group glass-morphism rounded-xl p-6 border border-white/20 hover:border-purple-400/40 transition-all hover:scale-105 block"
                >
                  <div className="text-4xl mb-3">{product.icon}</div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {product.category}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-12">
            <div className="glass-morphism rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap size={24} className="text-yellow-400" />
                GitHub Stats
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-morphism rounded-xl p-6 border border-blue-400/20">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{PROFILE.totalContributions}</div>
                  <div className="text-sm text-gray-400">Total Contributions</div>
                </div>

                <div className="glass-morphism rounded-xl p-6 border border-orange-400/20">
                  <div className="text-4xl font-bold text-orange-400 mb-2">{PROFILE.currentStreak}</div>
                  <div className="text-sm text-gray-400">Current Streak</div>
                </div>

                <div className="glass-morphism rounded-xl p-6 border border-green-400/20">
                  <div className="text-4xl font-bold text-green-400 mb-2">{PROFILE.longestStreak}</div>
                  <div className="text-sm text-gray-400">Longest Streak</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center border-t border-white/10 pt-12">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Sparkles size={20} className="text-yellow-400" />
              <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Built with ❤️ and React
              </p>
              <Sparkles size={20} className="text-yellow-400" />
            </div>
            <a 
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <Github size={20} />
              Follow me on GitHub
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}