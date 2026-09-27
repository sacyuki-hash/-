import React, { useState } from 'react';
import { Copy, Check, Sparkles, Gift, MousePointerClick, ShieldCheck, StickyNote } from 'lucide-react';

interface CopyOfferCtaSectionProps {
  mainCopies: string[];
  offers: string[];
  ctas: string[];
  trustElements: string[];
  notes: string[];
}

export const CopyOfferCtaSection: React.FC<CopyOfferCtaSectionProps> = ({
  mainCopies,
  offers,
  ctas,
  trustElements,
  notes,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Main Copy Options */}
      <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-5">
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-white tracking-wide">
              Elixence 推奨メインキャッチコピー案（3方向）
            </h4>
            <p className="text-xs text-white/50">
              3秒で「誰の何の悩みをどう解決するか」を直撃させるヘッドラインです
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {mainCopies?.map((copy, idx) => {
            const copyId = `copy-${idx}`;
            const isCopied = copiedIndex === copyId;
            return (
              <div
                key={idx}
                className="group p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#d4af37]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#d4af37] font-serif-luxury font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="font-serif-luxury text-base sm:text-lg font-bold text-[#fff9e6] tracking-wide leading-snug">
                    {copy}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(copy, copyId)}
                  className="self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors border border-white/[0.08]"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">コピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/50" />
                      <span>コピー</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offer Options & CTA Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer Options */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4">
            <Gift className="w-5 h-5 text-[#f7df94]" />
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
                推奨オファー・特典案（リスクリバーサル）
              </h4>
              <p className="text-xs text-white/50">
                行動障壁を消す「限定性・お試し価格・返金保証」の設計
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {offers?.map((offer, idx) => {
              const offerId = `offer-${idx}`;
              const isCopied = copiedIndex === offerId;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/[0.06] text-[#d4af37] text-xs font-serif-luxury font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">{offer}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(offer, offerId)}
                    className="p-1.5 text-white/40 hover:text-white rounded transition-colors shrink-0"
                    title="コピー"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Options */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4">
            <MousePointerClick className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
                推奨CTA（行動喚起）案
              </h4>
              <p className="text-xs text-white/50">
                看板なら階数導線、チラシ・SNSなら極小抵抗のアクション
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ctas?.map((cta, idx) => {
              const ctaId = `cta-${idx}`;
              const isCopied = copiedIndex === ctaId;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-serif-luxury font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">{cta}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(cta, ctaId)}
                    className="p-1.5 text-white/40 hover:text-white rounded transition-colors shrink-0"
                    title="コピー"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Elements */}
      <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
              掲載すべき信用・安心要素（社会的証明）
            </h4>
            <p className="text-xs text-white/50">
              怪しさ・不安を払拭する客観的な数字や事実（Google口コミ、実績、保有資格）
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {trustElements?.map((trust, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-xs text-white/80"
            >
              <span className="text-[#d4af37] font-bold shrink-0">★</span>
              <span>{trust}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes / Caveats */}
      {notes && notes.length > 0 && (
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <StickyNote className="w-4 h-4 text-[#d4af37]" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              補足メモ・不足項目と実行時の注意点
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-white/60">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
