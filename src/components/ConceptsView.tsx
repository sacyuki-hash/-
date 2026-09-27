import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Concepts, FinalPrompt } from '../types/adDiagnosis';

interface ConceptsViewProps {
  concepts: Concepts;
  finalPrompt: FinalPrompt;
}

export const ConceptsView: React.FC<ConceptsViewProps> = ({ concepts, finalPrompt }) => {
  const [activeConcept, setActiveConcept] = useState<'direct_response' | 'brand_response' | 'minimal_sign'>(
    'direct_response'
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const conceptMetadata = {
    direct_response: {
      number: '01',
      title: 'DIRECT RESPONSE型',
      sub: '問い合わせ・予約直結（成約最優先）',
      tag: '反響最大化',
      description:
        'ターゲットの悩み訴求・口コミ客観証拠・初回限定オファー・強力なCTAを明確に配置。最も素早く予約・来店を獲得するための王道DRM構成。',
    },
    brand_response: {
      number: '02',
      title: 'BRAND × RESPONSE型',
      sub: '洗練の美意識 × 行動喚起の融合（Elixence真骨頂）',
      tag: '品格＆獲得',
      description:
        '高単価サロンやクリニックの品格・清潔感を損なわず、同時に3秒でベネフィットと予約導線が伝わる絶妙なハイブリッド構成。',
    },
    minimal_sign: {
      number: '03',
      title: 'MINIMAL SIGN型',
      sub: '3秒直感認知（店舗前看板・駅前ポスター特化）',
      tag: '看板・屋外特化',
      description:
        '街頭立て看板や駅ポスター向け。文字数を極限まで削り、「何屋か・何階か・初回価格・QR」を歩行者に一瞬で刻む構成。',
    },
  };

  const currentMeta = conceptMetadata[activeConcept];
  const currentDetail = concepts[activeConcept];
  const currentPromptText = finalPrompt[activeConcept];

  return (
    <div className="space-y-8">
      {/* 3 Direction Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(Object.keys(conceptMetadata) as Array<keyof typeof conceptMetadata>).map((key) => {
          const meta = conceptMetadata[key];
          const isSelected = activeConcept === key;
          return (
            <button
              key={key}
              onClick={() => setActiveConcept(key)}
              className={`p-6 sm:p-8 text-left rounded-md transition-all border cursor-pointer ${
                isSelected
                  ? 'border-[#111111] bg-white shadow-xs ring-1 ring-[#111111]'
                  : 'border-[#e9e9e9] bg-[#fafafa] hover:bg-white hover:border-[#cccccc]'
              }`}
            >
              <div className="flex items-center justify-between mb-3 text-xs font-serif-luxury tracking-widest text-[#888888]">
                <span>DIRECTION {meta.number}</span>
                <span className={isSelected ? 'text-[#111111] font-bold' : ''}>
                  {meta.tag}
                </span>
              </div>
              <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#111111]">
                {meta.title}
              </h4>
              <p className="text-sm text-[#555555] mt-2 line-clamp-2 leading-relaxed">
                {meta.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Direction Prompt Studio Card */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
        {/* Header information */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#e9e9e9] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
                PROMPT DIRECTION {currentMeta.number}
              </span>
              <span className="text-[#cccccc]">/</span>
              <span className="text-base text-[#555555] font-medium">{currentMeta.sub}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#111111]">
              {currentMeta.title}
            </h3>
            <p className="text-base text-[#555555] max-w-2xl leading-relaxed">
              {currentDetail?.summary || currentMeta.description}
            </p>
          </div>

          <button
            onClick={() => handleCopy(currentPromptText, `prompt-${activeConcept}`)}
            className="self-start lg:self-center shrink-0 flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md bg-[#111111] hover:bg-[#252525] text-white font-bold text-base transition-all shadow-xs cursor-pointer"
          >
            {copiedKey === `prompt-${activeConcept}` ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span>プロンプトをコピー完了</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>完成プロンプトをコピー</span>
              </>
            )}
          </button>
        </div>

        {/* High-Contrast Prompt Box (Large, readable, editorial) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#777777] font-mono">
            <span>// 100% COMPLETE JAPANESE PROMPT FOR AI IMAGE GENERATORS</span>
            <span>Midjourney / FLUX / Imagen 3 / Canva</span>
          </div>

          <div className="relative rounded-md bg-[#111111] text-[#f2f2f2] p-6 sm:p-8 lg:p-10 font-sans text-base sm:text-lg leading-[1.9] overflow-x-auto whitespace-pre-wrap selection:bg-white selection:text-black">
            {currentPromptText}
          </div>
        </div>

        {/* Component breakdown */}
        {currentDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e9e9e9]">
            {currentDetail.headline && (
              <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-2">
                <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
                  HEADLINE COPY
                </span>
                <p className="font-serif-luxury text-xl font-bold text-[#111111]">
                  {currentDetail.headline}
                </p>
              </div>
            )}

            {currentDetail.color_scheme && (
              <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-2">
                <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
                  COLOR SCHEME &amp; TEXTURE
                </span>
                <p className="text-base text-[#333333]">
                  {currentDetail.color_scheme}
                </p>
              </div>
            )}

            {currentDetail.layout && currentDetail.layout.length > 0 && (
              <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-2 md:col-span-2">
                <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
                  LAYOUT &amp; VISUAL HIERARCHY
                </span>
                <ul className="space-y-1.5 text-base text-[#444444]">
                  {currentDetail.layout.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#111111] font-bold shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
