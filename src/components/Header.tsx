import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenExplainerModal: () => void;
  onSelectPreset: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExplainerModal,
}) => {
  return (
    <header className="border-b border-white/[0.08] bg-[#0c0d13]/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b8942b] to-[#6d5512] p-[1px] shadow-lg shadow-[#d4af37]/15">
            <div className="w-full h-full rounded-[11px] bg-[#0f1118] flex items-center justify-center">
              <span className="font-serif-luxury text-xl font-bold tracking-wider text-[#f5de99]">
                E
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs tracking-wider text-[#d4af37]">
              <span className="font-serif-luxury tracking-widest font-semibold text-[13px]">ELIXENCE</span>
              <span className="text-white/20">/</span>
              <span className="text-white/50 text-[11px]">横山ユウキ式 マーケティング脳</span>
            </div>
            <h1 className="font-serif-luxury text-lg sm:text-xl font-bold text-white tracking-wide">
              チラシ改善プロンプトメーカー
            </h1>
          </div>
        </div>

        {/* Action navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExplainerModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors"
            title="3秒ルールの基準を学ぶ"
          >
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span>Elixence 3秒哲学</span>
          </button>
        </div>
      </div>
    </header>
  );
};
