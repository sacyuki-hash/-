import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
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
    <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
      {/* Header kicker */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
            MARKETING BRAIN AUDIT
          </span>
          <span className="text-slate-300">·</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            美意識と成約力（CVR）の統合診断
          </h3>
        </div>
        <div className="text-xs font-medium text-slate-500">
          <span>判定方向性: </span>
          <strong className="text-slate-900 font-bold">{winningAngle || '高単価成約型リデザイン'}</strong>
        </div>
      </div>

      {/* Executive Verdict Quote Box */}
      <div className="rounded-xl bg-gradient-to-r from-amber-50/50 via-white/80 to-purple-50/30 border border-amber-200/50 p-5 sm:p-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-serif-luxury text-amber-800 font-bold tracking-widest uppercase">
              EXECUTIVE VERDICT — 核心総評
            </span>
            <p className="font-serif-luxury text-xl sm:text-2xl text-slate-900 font-bold leading-relaxed">
              “{brain.executive_verdict}”
            </p>
          </div>
          <button
            onClick={handleCopyVerdict}
            className="shrink-0 p-2 rounded-lg border border-slate-200/80 hover:border-slate-400 bg-white/90 hover:bg-slate-900 hover:text-white text-slate-700 transition-all duration-300 cursor-pointer shadow-2xs"
            title="総評をコピー"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3 Pillar Strategic Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* Pillar 1 */}
        <div className="p-5 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
          <div className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
            PILLAR 01
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            ブランド感と反応獲得の乖離
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {brain.brand_vs_response_gap}
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
          <div className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
            PILLAR 02
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            顧客の心理的障壁・先送り理由
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {brain.psychological_barrier}
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
          <div className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
            PILLAR 03
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Elixence式 成約アーキテクチャ
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {brain.conversion_architecture}
          </p>
        </div>
      </div>
    </section>
  );
};
