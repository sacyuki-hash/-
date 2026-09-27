import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  LayoutTemplate,
  Copy,
  Check,
  Terminal,
  Layers,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
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
      title: 'A. DIRECT RESPONSE型',
      sub: '問い合わせ・予約直結（成約最優先）',
      tag: 'CVR最大化',
      icon: Zap,
      borderColor: 'border-red-500/40',
      activeBorder: 'border-red-500',
      activeBg: 'bg-red-500/10 text-red-400',
      accentColor: 'text-red-400',
      badgeBg: 'bg-red-950/60 text-red-300 border-red-500/30',
      description:
        '悩み訴求・口コミ実績・初回割引オファー・強烈なCTAを前面配置。最も素早く反響・予約を獲得するための王道DRM構成。',
      targetTool: 'Midjourney v6 / FLUX.1 / Nano Banana',
    },
    brand_response: {
      title: 'B. BRAND × RESPONSE型',
      sub: '洗練の上品さ × 行動喚起のハイブリッド',
      tag: 'ブランド＆獲得',
      icon: Sparkles,
      borderColor: 'border-blue-500/40',
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-500/10 text-blue-400',
      accentColor: 'text-blue-400',
      badgeBg: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
      description:
        '高級感や清潔感、サロンのブランドイメージを損なわず、同時に3秒でベネフィットと予約導線が伝わる絶妙なバランス。',
      targetTool: 'Midjourney v6 / FLUX.1 / Imagen 3',
    },
    minimal_sign: {
      title: 'C. MINIMAL SIGN型',
      sub: '3秒で直感理解（超シンプル看板・ポスター）',
      tag: '看板・屋外特化',
      icon: LayoutTemplate,
      borderColor: 'border-emerald-500/40',
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-500/10 text-emerald-400',
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      description:
        '街頭立て看板や駅ポスター向け。文字を極限まで削り、「何屋か・何階か・初回価格・QR」を歩きながら一瞥で脳に刻む構成。',
      targetTool: 'Midjourney v6 / FLUX.1 / Imagen 3',
    },
  };

  const currentMeta = conceptMetadata[activeConcept];
  const currentDetail = concepts[activeConcept];
  const currentPromptText = finalPrompt[activeConcept];

  return (
    <div className="space-y-6">
      {/* Direction selector tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.keys(conceptMetadata) as Array<keyof typeof conceptMetadata>).map((key) => {
          const meta = conceptMetadata[key];
          const Icon = meta.icon;
          const isSelected = activeConcept === key;
          return (
            <button
              key={key}
              onClick={() => setActiveConcept(key)}
              className={`p-5 rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'border-[#d4af37] bg-[#141622] shadow-xl ring-1 ring-[#d4af37]/50'
                  : 'border-white/[0.08] bg-[#0f1118]/80 hover:bg-[#141620] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wider text-[#d4af37]">
                  {meta.tag}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#d4af37]' : 'text-white/40'}`} />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
                {meta.title}
              </h4>
              <p className="text-xs text-white/50 mt-1 line-clamp-2">{meta.sub}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Concept Deep Dive Card */}
      <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Concept Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <span className="font-serif-luxury font-semibold uppercase tracking-wider text-[11px]">
                {currentMeta.title}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-white/60">{currentMeta.sub}</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1.5 tracking-wide">
              {currentDetail?.summary || currentMeta.description}
            </h3>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => handleCopy(currentPromptText, `prompt-${activeConcept}`)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold text-sm transition-all hover:brightness-105 shadow-lg shadow-[#d4af37]/15"
            >
              {copiedKey === `prompt-${activeConcept}` ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>日本語プロンプトをコピー済</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>日本語プロンプトをコピー</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Layout Breakdown & Visual Zones */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-5 gap-7">
          {/* Left: Layout steps breakdown */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d4af37]" />
              <span>Elixence式 広告レイアウト構造（視線誘導 ＆ 成約心理）</span>
            </h4>
            <div className="space-y-3">
              {currentDetail?.layout?.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] flex items-start gap-3.5 hover:border-white/[0.12] transition-colors"
                >
                  <span className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.1] text-[#d4af37] text-xs font-serif-luxury font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Structural Mockup Preview */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2 mb-4">
              <LayoutTemplate className="w-4 h-4 text-[#d4af37]" />
              <span>構造モックアップ概略</span>
            </h4>
            <div className="p-5 rounded-2xl bg-[#0b0c11] border border-white/[0.08] flex flex-col space-y-3 text-xs">
              {/* Header Zone */}
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[10px] text-[#d4af37] font-semibold tracking-wider uppercase block">
                  TOP: ターゲット呼びかけ ＆ 悩み直撃
                </span>
                <span className="text-white/80 text-xs font-medium">
                  「誰のための店か」を1秒で直撃
                </span>
              </div>

              {/* Main Visual Zone */}
              <div className="p-7 rounded-xl bg-white/[0.015] border border-dashed border-white/[0.15] text-center flex flex-col items-center justify-center space-y-1.5">
                <span className="text-[10px] text-white/40 font-medium">
                  CENTER: メインビジュアル ＆ 施術/Before-After
                </span>
                <span className="font-serif-luxury text-white font-bold text-sm">
                  {activeConcept === 'minimal_sign' ? '大きな階数指示 ＆ サロンロゴ' : '洗練された専門施術シーン'}
                </span>
                <span className="text-[11px] text-white/40">※ 安っぽい煽りや過剰な装飾は徹底排除</span>
              </div>

              {/* Offer & Trust Zone */}
              <div className="p-3 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 text-center">
                <span className="text-[10px] text-[#d4af37] font-semibold tracking-wider uppercase block">
                  OFFER: 初回限定体験 ＆ Google★4.9
                </span>
                <span className="text-[#fff2cc] font-serif-luxury font-bold text-xs">
                  価格明示・全額返金保証・客観的証拠
                </span>
              </div>

              {/* CTA Zone */}
              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block">
                  BOTTOM: 行動喚起 (CTA) ＆ 導線
                </span>
                <span className="text-emerald-200 font-bold text-xs block">
                  {activeConcept === 'minimal_sign' ? '「このビル○F / QRで空き状況確認」' : '「LINEから24時間即時予約（空き枠確認）」'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Image Generation Prompt Box */}
        <div className="mt-8 pt-7 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Terminal className="w-4 h-4 text-[#d4af37]" />
              <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
                AI画像生成・広告改善用 完成プロンプト
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d4af37]/15 text-[#f3d98c] border border-[#d4af37]/30">
                日本語
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40 hidden sm:inline">
                画像生成AIや制作現場にそのまま渡せる日本語プロンプト
              </span>
              <button
                onClick={() => handleCopy(currentPromptText, `prompt-btn-${activeConcept}`)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors border border-white/[0.08]"
              >
                {copiedKey === `prompt-btn-${activeConcept}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">コピー完了</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/60" />
                    <span>日本語プロンプトをコピー</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="p-5 rounded-2xl bg-[#0a0b10] border border-white/[0.08] font-mono text-xs text-[#f5de99]/90 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-[#d4af37]/30">
              {currentPromptText}
            </pre>
          </div>

          {/* Negative prompt / Avoidance tip */}
          <div className="mt-4 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.07] flex items-start gap-3 text-xs text-white/60">
            <ShieldAlert className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-white/80 font-medium">生成時の禁止指定（自動適用済）：</span>
              「情報過多、AI特有の不自然な笑顔ストック写真、大量の葉っぱや安っぽい英語装飾、小さすぎる文字、安売りを強調しすぎる赤黄色チラシ」を抑制し、高単価店舗に相応しい洗練美を保証します。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
