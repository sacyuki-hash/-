import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
            HEADLINE OPTIONS
          </span>
          <span className="text-slate-300">·</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            メインキャッチコピー案（3方向）
          </h3>
        </div>

        <div className="space-y-3">
          {mainCopies?.map((copy, idx) => {
            const copyId = `copy-${idx}`;
            const isCopied = copiedIndex === copyId;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/60 border border-slate-200/80 hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="font-serif-luxury font-bold text-base text-slate-800 shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <p className="font-serif-luxury text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {copy}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(copy, copyId)}
                  className="self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white transition-all duration-300 border border-slate-200/80 cursor-pointer shadow-2xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>コピー済</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>コピー</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Offer Options & CTA Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer Options */}
        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
              OFFER ARCHITECTURE
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              初回限定オファー・特典案
            </h4>
          </div>

          <div className="space-y-2.5">
            {offers?.map((offer, idx) => {
              const offerId = `offer-${idx}`;
              const isCopied = copiedIndex === offerId;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/60 border border-slate-200/70 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-800"
                >
                  <span>{offer}</span>
                  <button
                    onClick={() => handleCopy(offer, offerId)}
                    className="p-1.5 rounded-md hover:bg-white text-slate-400 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="コピー"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Options */}
        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-slate-700 uppercase">
              CALL TO ACTION
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              行動喚起ボタン文言（導線設計）
            </h4>
          </div>

          <div className="space-y-2.5">
            {ctas?.map((cta, idx) => {
              const ctaId = `cta-${idx}`;
              const isCopied = copiedIndex === ctaId;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/60 border border-slate-200/70 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-800"
                >
                  <span className="font-medium text-slate-900">{cta}</span>
                  <button
                    onClick={() => handleCopy(cta, ctaId)}
                    className="p-1.5 rounded-md hover:bg-white text-slate-400 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="コピー"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Trust Elements & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trust Elements */}
        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
              CREDIBILITY
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              必須の信頼性要素（証拠・実績）
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {trustElements?.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Strategic Notes */}
        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-slate-600 uppercase">
              STRATEGY NOTES
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              制作・運用時の重要留意点
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {notes?.map((n, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold shrink-0">·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
