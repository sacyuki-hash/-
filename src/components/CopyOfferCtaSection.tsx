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
    <div className="space-y-8">
      {/* Main Copy Options */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            HEADLINE OPTIONS
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            メインキャッチコピー案（3方向）
          </h3>
        </div>

        <div className="space-y-4">
          {mainCopies?.map((copy, idx) => {
            const copyId = `copy-${idx}`;
            const isCopied = copiedIndex === copyId;
            return (
              <div
                key={idx}
                className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] hover:border-[#111111] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif-luxury font-bold text-lg text-[#111111] shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
                    {copy}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(copy, copyId)}
                  className="self-end sm:self-center shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md bg-white hover:bg-[#111111] text-[#222222] hover:text-white transition-all border border-[#222222] cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>コピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>コピー</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Offer & CTA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Offer Options */}
        <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              OFFER ARCHITECTURE
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
              推奨初回オファー（心理障壁の破壊）
            </h3>
          </div>

          <div className="space-y-3.5">
            {offers?.map((offer, idx) => {
              const offerId = `offer-${idx}`;
              const isCopied = copiedIndex === offerId;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-md bg-[#fafafa] border border-[#e9e9e9] flex items-center justify-between gap-3"
                >
                  <p className="text-base text-[#222222] font-semibold">{offer}</p>
                  <button
                    onClick={() => handleCopy(offer, offerId)}
                    className="shrink-0 p-2 text-[#666666] hover:text-[#111111] hover:bg-white rounded border border-transparent hover:border-[#cccccc] transition-colors cursor-pointer"
                    title="オファーをコピー"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Options */}
        <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              CTA TRIGGERS
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
              行動喚起ボタン・導線文言
            </h3>
          </div>

          <div className="space-y-3.5">
            {ctas?.map((cta, idx) => {
              const ctaId = `cta-${idx}`;
              const isCopied = copiedIndex === ctaId;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-md bg-[#fafafa] border border-[#e9e9e9] flex items-center justify-between gap-3"
                >
                  <p className="text-base text-[#222222] font-semibold">{cta}</p>
                  <button
                    onClick={() => handleCopy(cta, ctaId)}
                    className="shrink-0 p-2 text-[#666666] hover:text-[#111111] hover:bg-white rounded border border-transparent hover:border-[#cccccc] transition-colors cursor-pointer"
                    title="CTAをコピー"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Trust Elements & Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trust Elements */}
        <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              SOCIAL PROOF
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
              客観的信頼要素・証拠の掲載
            </h3>
          </div>

          <ul className="space-y-2 text-base text-[#444444]">
            {trustElements?.map((trust, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#111111] font-bold shrink-0">·</span>
                <span>{trust}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Implementation Notes */}
        <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              STRATEGIC NOTES
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
              制作・運用時の留意点
            </h3>
          </div>

          <ul className="space-y-2 text-base text-[#444444]">
            {notes?.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#111111] font-bold shrink-0">·</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
