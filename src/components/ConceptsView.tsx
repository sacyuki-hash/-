import React, { useState } from 'react';
import { Copy, Check, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-6">
      {/* 3 Direction Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(conceptMetadata) as Array<keyof typeof conceptMetadata>).map((key) => {
          const meta = conceptMetadata[key];
          const isSelected = activeConcept === key;
          return (
            <button
              key={key}
              onClick={() => setActiveConcept(key)}
              className={`p-4 sm:p-5 text-left rounded-xl transition-all duration-300 border cursor-pointer ${
                isSelected
                  ? 'bg-white/95 border-slate-900 shadow-sm ring-1 ring-slate-900/10'
                  : 'bg-white/60 hover:bg-white/85 border-white/80 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-serif-luxury tracking-widest text-slate-400">
                <span>DIRECTION {meta.number}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-900 text-white font-medium' : 'bg-slate-100 text-slate-600'}`}>
                  {meta.tag}
                </span>
              </div>
              <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-slate-900">
                {meta.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {meta.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Direction Prompt Studio Card */}
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
        {/* Header information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
                DIRECTION {currentMeta.number}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">{currentMeta.sub}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-900">
              {currentMeta.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {currentDetail?.summary || currentMeta.description}
            </p>
          </div>

          <button
            onClick={() => handleCopy(currentPromptText, `prompt-${activeConcept}`)}
            className="self-start sm:self-center shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
          >
            {copiedKey === `prompt-${activeConcept}` ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>コピー完了</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>完成プロンプトをコピー</span>
              </>
            )}
          </button>
        </div>

        {/* High-Contrast Prompt Box (Large, readable, editorial) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>// 100% COMPLETE JAPANESE PROMPT</span>
            <span>Midjourney / FLUX / Imagen 3 / Canva</span>
          </div>

          <div className="relative rounded-xl bg-slate-950 text-slate-100 p-5 sm:p-7 font-sans text-sm sm:text-base leading-[1.85] overflow-x-auto whitespace-pre-wrap selection:bg-white selection:text-black border border-slate-800/80 shadow-inner">
            {currentPromptText}
          </div>
        </div>

        {/* Component breakdown */}
        {currentDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            {currentDetail.headline && (
              <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
                  HEADLINE COPY
                </span>
                <p className="font-serif-luxury text-base sm:text-lg font-bold text-slate-900">
                  {currentDetail.headline}
                </p>
              </div>
            )}

            {currentDetail.color_scheme && (
              <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
                  COLOR SCHEME &amp; TEXTURE
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentDetail.color_scheme}
                </p>
              </div>
            )}

            {currentDetail.layout && currentDetail.layout.length > 0 && (
              <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-1 md:col-span-2">
                <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
                  LAYOUT &amp; VISUAL HIERARCHY
                </span>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-600">
                  {currentDetail.layout.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">·</span>
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
