import React, { useState } from 'react';
import { Brain, Compass, Sparkles, ShieldAlert, ArrowRight, Quote, Check, Copy } from 'lucide-react';
import { ElixenceMarketingBrain } from '../types/adDiagnosis';

interface MarketingBrainCardProps {
  brain?: ElixenceMarketingBrain;
  winningAngle: string;
}

export const MarketingBrainCard: React.FC<MarketingBrainCardProps> = ({ brain, winningAngle }) => {
  const [copied, setCopied] = useState(false);

  if (!brain) return null;

  const handleCopyVerdict = () => {
    navigator.clipboard.writeText(brain.executive_verdict);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-b from-[#161821] via-[#10121a] to-[#0c0d14] p-6 sm:p-8 shadow-2xl">
      {/* Decorative subtle ambient gold ray */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#8a7024]/10 blur-3xl" />

      {/* Header kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4af37]">
            <Brain className="w-4 h-4 text-[#d4af37]" />
            <span className="uppercase tracking-widest text-[11px]">ELIXENCE MARKETING BRAIN</span>
            <span className="text-white/30">·</span>
            <span className="text-white/60">横山ユウキ式 成約心理・構造看破</span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1 tracking-wide">
            広告の美意識とコンバージョン（CVR）の統合診断
          </h3>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-medium text-white/50 bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-full">
          <span>美意識とDRMの融合</span>
          <span className="text-white/20">/</span>
          <span className="text-[#d4af37]">高単価成約</span>
        </div>
      </div>

      {/* Executive Verdict Quote Box */}
      <div className="my-6 relative rounded-xl border border-[#d4af37]/40 bg-gradient-to-r from-[#211d14]/70 via-[#181611]/80 to-[#211d14]/70 p-5 sm:p-6 shadow-lg">
        <div className="flex items-start gap-3.5">
          <Quote className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5 opacity-80" />
          <div className="space-y-1.5 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]/90">
              横山ユウキ直伝 エグゼクティブ・バーディクト
            </span>
            <p className="font-serif-luxury text-base sm:text-lg text-[#fff9e6] font-semibold leading-relaxed tracking-wide">
              “{brain.executive_verdict}”
            </p>
          </div>
          <button
            onClick={handleCopyVerdict}
            className="shrink-0 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
            title="格言をコピー"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3 Pillar Strategic Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* Pillar 1: Brand vs Response Gap */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/30 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f7df94]">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>01. ブランド感と反応獲得の乖離</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            {brain.brand_vs_response_gap}
          </p>
        </div>

        {/* Pillar 2: Psychological Barrier */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/30 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>02. 顧客の心理的障壁・先送り理由</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            {brain.psychological_barrier}
          </p>
        </div>

        {/* Pillar 3: Conversion Architecture */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/30 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>03. Elixence式 成約アーキテクチャ</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            {brain.conversion_architecture}
          </p>
        </div>
      </div>
    </div>
  );
};
