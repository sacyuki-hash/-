import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenExplainerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExplainerModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://www.elixence.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-3 text-decoration-none group"
            title="Elixence 公式サイトを開く"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 group-hover:opacity-80 transition-opacity">
              Elixence
            </span>
            <span className="text-slate-300 text-base">/</span>
            <span className="text-slate-600 text-sm sm:text-base font-medium hidden md:inline tracking-wide">
              アーティスティック経営コンサル 横山祐樹
            </span>
          </a>
        </div>

        {/* Action navigation */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 3-Second Philosophy Explainer Button */}
          <button
            onClick={onOpenExplainerModal}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl transition-all duration-300 cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="tracking-wide">3秒成約哲学</span>
          </button>

          <a
            href="https://www.elixence.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors pl-2"
          >
            <span className="tracking-wide">elixence.work</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
