import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenExplainerModal: () => void;
  onSelectPreset?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExplainerModal }) => {
  return (
    <header className="border-b border-[#e9e9e9] bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://www.elixence.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-3 text-decoration-none group"
            title="Elixence 公式サイトを開く"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] group-hover:opacity-80 transition-opacity">
              Elixence
            </span>
            <span className="text-[#cccccc] text-base">/</span>
            <span className="text-[#444444] text-sm sm:text-base font-medium hidden md:inline">
              アーティスティック経営コンサル 横山祐樹
            </span>
          </a>
        </div>

        {/* Action navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenExplainerModal}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-[#111111] hover:text-white bg-transparent hover:bg-[#111111] border border-[#222222] rounded-md transition-all duration-200 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-[#9e7d23]" />
            <span>3秒成約哲学</span>
          </button>

          <a
            href="https://www.elixence.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#555555] hover:text-[#111111] transition-colors"
          >
            <span>elixence.work</span>
            <ArrowUpRight className="w-4 h-4 text-[#888888]" />
          </a>
        </div>
      </div>
    </header>
  );
};
