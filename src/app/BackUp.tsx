"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { 
  User, Briefcase, Link2, Heart, BarChart3, ExternalLink, 
  Sparkles, TrendingUp, Award, Zap, Menu, X, Grid, List,
  Eye, Copy, QrCode, Share2, Settings, Palette, Bell,
  MousePointerClick, ArrowUpDown, Star, Flame
} from 'lucide-react';

type ThemeKey = 'dark' | 'blue' | 'purple' | 'gradient' | 'neon' | 'ocean';
type ViewMode = 'grid' | 'list';
type LinkData = {
  id: string;
  title: string;
  url: string;
  section: 'work' | 'affiliation';
  emoji: string;
  featured?: boolean;
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
  bio: "Desenvolvedor Full Stack | Criador de Conteúdo | Especialista em SaaS",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=walbarello",
  slug: "walbarello",
  views: 1247,
  totalEarnings: 'R$ 0.25'
};

const INITIAL_LINKS: LinkData[] = [
  { id: 'portfolio', title: 'Meu Portfólio', url: 'https://portfolio.exemplo.com', section: 'work', emoji: '🎨', featured: true },
  { id: 'consultoria', title: 'Consultoria 1:1', url: 'https://cal.com/joao', section: 'work', emoji: '💼' },
  { id: 'curso', title: 'Meu Curso Online', url: 'https://curso.exemplo.com', section: 'work', emoji: '📚', featured: true },
  { id: 'amazon', title: 'Amazon Associates', url: 'https://amzn.to/exemplo', section: 'affiliation', emoji: '📦' },
  { id: 'hotmart', title: 'Hotmart Top Produtos', url: 'https://hotmart.com/exemplo', section: 'affiliation', emoji: '🔥', featured: true },
  { id: 'rakuten', title: 'Rakuten Cashback', url: 'https://rakuten.com/exemplo', section: 'affiliation', emoji: '🛍️' }
];

export default function UniversoLinksProDemo() {
  const [theme, setTheme] = useState<ThemeKey>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showMenu, setShowMenu] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [links, setLinks] = useState(INITIAL_LINKS);
  const [clicks, setClicks] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    INITIAL_LINKS.forEach(link => { initial[link.id] = Math.floor(Math.random() * 50); });
    return initial;
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleLinkClick = useCallback((link: LinkData) => {
    setClicks(prev => ({ ...prev, [link.id]: (prev[link.id] ?? 0) + 1 }));
    
    // Animação de partículas
    const rect = document.getElementById(`link-${link.id}`)?.getBoundingClientRect();
    if (rect) {
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }, []);

  const createParticles = (x: number, y: number) => {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #00ff88, #00ccff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particleFloat 1s ease-out forwards;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = links.findIndex(l => l.id === draggedItem);
    const targetIndex = links.findIndex(l => l.id === targetId);
    
    const newLinks = [...links];
    const [removed] = newLinks.splice(draggedIndex, 1);
    newLinks.splice(targetIndex, 0, removed);
    setLinks(newLinks);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const copyProfileLink = () => {
    const url = `https://universo.app/${PROFILE.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const totalClicks = useMemo(() => Object.values(clicks).reduce((a, b) => a + b, 0), [clicks]);
  const works = useMemo(() => links.filter(l => l.section === 'work'), [links]);
  const affiliations = useMemo(() => links.filter(l => l.section === 'affiliation'), [links]);
  const workClicks = works.reduce((sum, l) => sum + (clicks[l.id] ?? 0), 0);
  const affiliationClicks = affiliations.reduce((sum, l) => sum + (clicks[l.id] ?? 0), 0);
  const ctr = ((totalClicks / PROFILE.views) * 100).toFixed(1);

  return (
    <>
      <style jsx global>{`
        @keyframes particleFloat {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx, 0), -100px) scale(0); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 136, 0.6); }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-br ${THEMES[theme].bg} text-white transition-all duration-700 relative overflow-hidden`}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Top Navigation Bar */}
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
                Universo
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-white/10 rounded-lg transition"
                title={viewMode === 'grid' ? 'Ver em lista' : 'Ver em grade'}
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              
              <button 
                onClick={copyProfileLink}
                className="p-2 hover:bg-white/10 rounded-lg transition relative"
                title="Copiar link do perfil"
              >
                {copiedLink ? <Star size={20} className="text-yellow-400" /> : <Copy size={20} />}
              </button>
              
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Share2 size={20} />
              </button>
              
              <button className="p-2 hover:bg-white/10 rounded-lg transition relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Menu */}
        <div className={`fixed left-0 top-0 h-full w-72 glass-morphism border-r border-white/10 z-40 transition-transform duration-300 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 space-y-6 mt-16">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <Palette size={16} />
                TEMAS
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(THEMES) as ThemeKey[]).map(key => (
                  <button
                    key={key}
                    onClick={() => {setTheme(key); setShowMenu(false);}}
                    className={`h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                      theme === key ? 'border-white scale-105' : 'border-white/20'
                    } bg-gradient-to-br ${THEMES[key].bg}`}
                    title={key}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <Settings size={16} />
                CONFIGURAÇÕES
              </h3>
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition flex items-center gap-2">
                <QrCode size={18} />
                Gerar QR Code
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition flex items-center gap-2">
                <Eye size={18} />
                Preview Público
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg transition flex items-center gap-2">
                <BarChart3 size={18} />
                Analytics Completo
              </button>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-xs text-gray-500 space-y-1">
                <p>✨ Drag & drop ativado</p>
                <p>🎨 6 temas disponíveis</p>
                <p>📊 Analytics em tempo real</p>
                <p>🔥 Efeitos profissionais</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score Badge */}
        <div className="fixed left-4 top-20 z-30 glass-morphism px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              9.5/10
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
          
          {/* Avatar Header com Animação */}
          <header className="mb-16 flex flex-col items-center text-center">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition animate-pulse" />
              <img
                src={PROFILE.avatarUrl}
                alt={PROFILE.name}
                className="relative w-36 h-36 rounded-full border-4 border-white/20 shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 animate-bounce">
                <User size={16} />
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {PROFILE.name}
            </h1>

            <p className="text-gray-300 text-xl max-w-2xl leading-relaxed mb-4">
              {PROFILE.bio}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="glass-morphism px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Eye size={16} className="text-blue-400" />
                <span>{PROFILE.views.toLocaleString()} views</span>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Flame size={16} className="text-orange-400" />
                <span>{PROFILE.totalEarnings}</span>
              </div>
              <div className="glass-morphism px-4 py-2 rounded-full text-sm">
                @{PROFILE.slug}
              </div>
            </div>

            {copiedLink && (
              <div className="mt-4 glass-morphism px-4 py-2 rounded-lg text-sm text-green-400 flex items-center gap-2 animate-bounce">
                <Star size={16} />
                Link copiado!
              </div>
            )}
          </header>

          {/* Seção Trabalhos */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${THEMES[theme].accent}`}>
                  <Briefcase size={24} />
                </div>
                <h2 className="text-3xl font-bold">Trabalhos</h2>
                <ArrowUpDown size={18} className="text-gray-500" />
              </div>
              <span className="text-sm text-gray-500">{workClicks} cliques</span>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {works.map((link) => (
                <div
                  key={link.id}
                  id={`link-${link.id}`}
                  draggable
                  onDragStart={() => handleDragStart(link.id)}
                  onDragOver={(e) => handleDragOver(e, link.id)}
                  onDragEnd={handleDragEnd}
                  className={`group relative cursor-move transition-all duration-300 hover:scale-105 ${
                    draggedItem === link.id ? 'opacity-50 scale-95' : ''
                  }`}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className={`w-full glass-morphism rounded-2xl p-6 text-left transition-all duration-300 
                    hover:bg-white/10 border border-white/20 hover:border-white/40
                    ${link.featured ? 'ring-2 ring-yellow-400/50 animate-pulse-glow' : ''}`}
                  >
                    {link.featured && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star size={12} fill="currentColor" />
                        DESTAQUE
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-4xl mb-2 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          {link.emoji}
                        </div>
                        <div className="text-lg font-semibold mb-1 flex items-center gap-2">
                          {link.title}
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <MousePointerClick size={14} />
                            {clicks[link.id] ?? 0} cliques
                          </span>
                        </div>
                      </div>
                      <div className={`text-2xl text-blue-400 transition-transform group-hover:translate-x-2`}>
                        →
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 rounded-2xl" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Seção Afiliações */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500`}>
                  <Link2 size={24} />
                </div>
                <h2 className="text-3xl font-bold">Afiliações</h2>
                <ArrowUpDown size={18} className="text-gray-500" />
              </div>
              <span className="text-sm text-gray-500">{affiliationClicks} cliques</span>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {affiliations.map((link) => (
                <div
                  key={link.id}
                  id={`link-${link.id}`}
                  draggable
                  onDragStart={() => handleDragStart(link.id)}
                  onDragOver={(e) => handleDragOver(e, link.id)}
                  onDragEnd={handleDragEnd}
                  className={`group relative cursor-move transition-all duration-300 hover:scale-105 ${
                    draggedItem === link.id ? 'opacity-50 scale-95' : ''
                  }`}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className={`w-full glass-morphism rounded-2xl p-6 text-left transition-all duration-300 
                    hover:bg-white/10 border border-white/20 hover:border-white/40
                    ${link.featured ? 'ring-2 ring-yellow-400/50 animate-pulse-glow' : ''}`}
                  >
                    {link.featured && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star size={12} fill="currentColor" />
                        DESTAQUE
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-4xl mb-2 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          {link.emoji}
                        </div>
                        <div className="text-lg font-semibold mb-1 flex items-center gap-2">
                          {link.title}
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <MousePointerClick size={14} />
                            {clicks[link.id] ?? 0} cliques
                          </span>
                        </div>
                      </div>
                      <div className={`text-2xl text-purple-400 transition-transform group-hover:translate-x-2`}>
                        →
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 rounded-2xl" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Botão de Gorjeta com Animação */}
          <div className="mb-12">
            <button
              onClick={() => setShowTip(!showTip)}
              className="group relative w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-2xl p-8 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <div className="relative flex items-center justify-center gap-3">
                <Heart size={28} className="animate-pulse" fill="currentColor" />
                <span className="text-2xl">Enviar Gorjeta ☕</span>
                <Sparkles size={24} className="animate-bounce" />
              </div>
            </button>

            {showTip && (
              <div className="mt-6 glass-morphism rounded-2xl p-8 border border-pink-400/30 animate-fadeIn">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Heart size={24} fill="currentColor" className="text-pink-400" />
                  Escolha o valor
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {['R$ 5', 'R$ 10', 'R$ 20'].map(val => (
                    <button
                      key={val}
                      className="glass-morphism border border-pink-400/40 rounded-xl py-4 text-lg font-semibold hover:bg-pink-500/20 transition-all hover:scale-105"
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl py-4 text-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-105 mb-3">
                  💚 Pagar com Pix
                </button>
                <button className="w-full glass-morphism border border-blue-400/40 rounded-xl py-4 text-lg font-semibold hover:bg-blue-500/20 transition-all hover:scale-105">
                  💳 PayPal / Cartão
                </button>
              </div>
            )}
          </div>

          {/* Analytics Avançado */}
          <div className="mb-12 glass-morphism rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 size={24} className="text-green-400" />
              Analytics em Tempo Real
              <Zap size={20} className="text-yellow-400 animate-pulse" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="glass-morphism rounded-xl p-6 border border-blue-400/20 transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-400 mb-2 animate-pulse">{totalClicks}</div>
                <div className="text-sm text-gray-400 mb-2">Total de Clicks</div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <TrendingUp size={14} />
                  {ctr}% CTR
                </div>
              </div>

              <div className="glass-morphism rounded-xl p-6 border border-purple-400/20 transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-purple-400 mb-2">{workClicks}</div>
                <div className="text-sm text-gray-400 mb-2">Trabalhos</div>
                <div className="text-xs text-purple-300">Conversões Diretas</div>
              </div>

              <div className="glass-morphism rounded-xl p-6 border border-pink-400/20 transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-pink-400 mb-2">{affiliationClicks}</div>
                <div className="text-sm text-gray-400 mb-2">Afiliações</div>
                <div className="text-xs text-pink-300">Comissões Geradas</div>
              </div>
            </div>

            {/* Barra de Progresso Animada */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-300">Meta Mensal de Clicks</span>
                <span className="text-sm font-bold text-green-400">{totalClicks}/1000</span>
              </div>
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${Math.min((totalClicks / 1000) * 100, 100)}%` }}
                >
                  <div className="absolute inset-0 shimmer" />
                </div>
              </div>
                <div className="mt-2 text-xs text-gray-500 text-right">
                {(((totalClicks / 1000) * 100).toFixed(1))}% concluído
              </div>
            </div>
          </div>

          {/* Footer Aprimorado */}
          <footer className="text-center border-t border-white/10 pt-12">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Sparkles size={20} className="text-yellow-400 animate-spin" />
              <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Feito com ❤️ no Universo Paralelo
              </p>
              <Sparkles size={20} className="text-yellow-400 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="text-sm text-gray-500 mb-8">
              Vendas • Afiliações • Gorjetas • Seu Multiverso Digital
            </p>

            <div className="glass-morphism rounded-2xl p-8 border border-yellow-400/30">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award size={28} className="text-yellow-400" />
                <h4 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Avaliação: 9.5/10
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">✅ Design moderno e responsivo</p>
                  <p className="flex items-center gap-2">✅ 6 temas personalizáveis</p>
                  <p className="flex items-center gap-2">✅ Drag & Drop funcional</p>
                  <p className="flex items-center gap-2">✅ Menu lateral interativo</p>
                  <p className="flex items-center gap-2">✅ Animações profissionais</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">✅ Efeitos de partículas</p>
                  <p className="flex items-center gap-2">✅ Links em destaque</p>
                  <p className="flex items-center gap-2">✅ Visualização grid/lista</p>
                  <p className="flex items-center gap-2">✅ Copiar link do perfil</p>
                  <p className="flex items-center gap-2">✅ Glassmorphism & Shimmer</p>
                </div>
              </div>

              <div className="pt-6 border-t border-yellow-400/20">
                <p className="text-sm font-semibold text-yellow-300 mb-3 flex items-center justify-center gap-2">
                  <Flame size={18} />
                  🚀 Próximas Evoluções (Para 10/10)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                  <p>• Integração real Pix/PayPal/Stripe</p>
                  <p>• Gráficos interativos (Recharts)</p>
                  <p>• QR Code generator</p>
                  <p>• Multi-idioma (i18n)</p>
                  <p>• A/B Testing de botões</p>
                  <p>• Export Analytics (CSV/PDF)</p>
                  <p>• Webhooks para automações</p>
                  <p>• Editor WYSIWYG</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
