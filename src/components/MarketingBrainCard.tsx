import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
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
    <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
      {/* Header kicker */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#e9e9e9] pb-5">
        <div className="flex items-center gap-3">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            MARKETING BRAIN AUDIT
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            美意識と成約力（CVR）の統合診断
          </h3>
        </div>
        <div className="text-sm font-medium text-[#666666]">
          <span>判定方向性: </span>
          <strong className="text-[#111111] font-bold">{winningAngle || '高単価成約型リデザイン'}</strong>
        </div>
      </div>

      {/* Executive Verdict Quote Box */}
      <div className="border-l-3 border-[#111111] pl-6 sm:pl-8 py-2 relative">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-widest uppercase">
              EXECUTIVE VERDICT — 核心総評
            </span>
            <p className="font-serif-luxury text-2xl sm:text-3xl text-[#111111] font-bold leading-relaxed">
              “{brain.executive_verdict}”
            </p>
          </div>
          <button
            onClick={handleCopyVerdict}
            className="shrink-0 p-2.5 rounded-md border border-[#e9e9e9] hover:border-[#111111] bg-white hover:bg-[#111111] hover:text-white text-[#333333] transition-all cursor-pointer shadow-2xs"
            title="総評をコピー"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3 Pillar Strategic Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Pillar 1 */}
        <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
          <div className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
            PILLAR 01
          </div>
          <h4 className="text-lg font-bold text-[#111111]">
            ブランド感と反応獲得の乖離
          </h4>
          <p className="text-base text-[#444444] leading-relaxed">
            {brain.brand_vs_response_gap}
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
          <div className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
            PILLAR 02
          </div>
          <h4 className="text-lg font-bold text-[#111111]">
            顧客の心理的障壁・先送り理由
          </h4>
          <p className="text-base text-[#444444] leading-relaxed">
            {brain.psychological_barrier}
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
          <div className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
            PILLAR 03
          </div>
          <h4 className="text-lg font-bold text-[#111111]">
            Elixence式 成約アーキテクチャ
          </h4>
          <p className="text-base text-[#444444] leading-relaxed">
            {brain.conversion_architecture}
          </p>
        </div>
      </div>
    </section>
  );
};
