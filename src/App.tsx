import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  LayoutTemplate,
  FileText,
  Braces,
  Download,
  Copy,
  Check,
  AlertCircle,
  Brain,
  RefreshCw,
} from 'lucide-react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { MarketingBrainCard } from './components/MarketingBrainCard';
import { ThreeSecondAuditCard } from './components/ThreeSecondAuditCard';
import { DiagnosisView } from './components/DiagnosisView';
import { ConceptsView } from './components/ConceptsView';
import { CopyOfferCtaSection } from './components/CopyOfferCtaSection';
import { AiStudioModal } from './components/AiStudioModal';
import { ThreeSecondExplainerModal } from './components/ThreeSecondExplainerModal';
import { AdDiagnosisResult, SupplementaryInfo } from './types/adDiagnosis';
import { SAMPLE_PRESETS } from './utils/presets';

export default function App() {
  const [image, setImage] = useState<{ data: string; mimeType: string; name?: string } | null>(null);
  const [metadata, setMetadata] = useState<SupplementaryInfo>({
    mediaType: '',
    industryService: '',
    target: '',
    region: '',
    price: '',
    offer: '',
    reviews: '',
    credentials: '',
    storeLocation: '',
    distanceStation: '',
    businessHours: '',
    finalGoal: '',
  });

  const [result, setResult] = useState<AdDiagnosisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitSeconds, setRateLimitSeconds] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'concepts' | 'diagnosis' | 'copy_offer' | 'raw_json'>('concepts');

  const [showAiStudioModal, setShowAiStudioModal] = useState(false);
  const [showExplainerModal, setShowExplainerModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  useEffect(() => {
    if (rateLimitSeconds === null || rateLimitSeconds <= 0) return;
    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev === null || prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  // Trigger analysis call to server
  const handleAnalyze = async () => {
    if (!image) {
      setError('広告画像をアップロードするか、サンプルプリセットを選択してください。');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image,
          metadata,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        if (json.isRateLimit && json.retryAfter) {
          setRateLimitSeconds(json.retryAfter);
        }
        throw new Error(json.error || '広告診断の実行に失敗しました。');
      }

      setResult(json.data);
      setRateLimitSeconds(null);
      setActiveTab('concepts'); // Switch to results
    } catch (err: any) {
      console.error(err);
      setError(err.message || '通信エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elixence-ad-diagnosis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectPresetFromHeader = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setImage({
        data: preset.imageDataUrl,
        mimeType: 'image/svg+xml',
        name: preset.imageTitle,
      });
      setMetadata(preset.metadata);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-[#e0e2ec] flex flex-col font-['Plus_Jakarta_Sans','Noto_Sans_JP',sans-serif]">
      {/* Top Header */}
      <Header
        onOpenAiStudioModal={() => setShowAiStudioModal(true)}
        onOpenExplainerModal={() => setShowExplainerModal(true)}
        onSelectPreset={handleSelectPresetFromHeader}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs text-[#d4af37]">
            <span className="font-serif-luxury tracking-widest font-semibold text-[13px]">
              ELIXENCE MARKETING INTELLIGENCE
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/60">美意識と成約力の極限融合</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            広告の美意識を研ぎ澄まし、
            <br />
            <span className="gold-gradient-text">
              成約が鳴り止まないAIプロンプト
            </span>
            を生成
          </h2>

          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto leading-relaxed font-sans">
            「安っぽい煽りチラシは店を殺し、ただ綺麗なだけのアート広告は売上を殺す」——
            横山ユウキ式マーケティング脳が、広告の心理障壁を3秒ルールで看破。
            高単価店舗・サロンの品格を守りながら、予約・来店を最大化する3方向のAI画像生成プロンプトを出力します。
          </p>
        </div>

        {/* Upload & Setup Section */}
        <UploadSection
          image={image}
          onImageChange={setImage}
          metadata={metadata}
          onMetadataChange={setMetadata}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {/* Error notification */}
        {error && (
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-100">{error}</p>
                {rateLimitSeconds !== null && rateLimitSeconds > 0 && (
                  <p className="text-xs text-rose-300/80">
                    レートリミット待機中: 約 <span className="font-bold text-[#d4af37]">{rateLimitSeconds}</span> 秒後に自動または手動で再試行可能です
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => {
                  setError(null);
                  handleAnalyze();
                }}
                disabled={isAnalyzing}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#d4af37] text-black hover:bg-[#e2c159] transition-all flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{rateLimitSeconds ? `再試行 (${rateLimitSeconds}s)` : '再試行する'}</span>
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setRateLimitSeconds(null);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* Loading State Animation */}
        {isAnalyzing && (
          <div className="py-20 text-center space-y-5 rounded-3xl bg-[#10121a]/80 border border-[#d4af37]/25 shadow-2xl">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#d4af37] animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="font-serif-luxury text-lg font-bold text-white tracking-wide">
                Elixence マーケティング脳 診断中...
              </div>
              <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                画像の文字・構造を認識 &rarr; 美意識と成約の乖離を解析 &rarr; 顧客心理障壁を解体 &rarr; 3方向の画像生成用完成プロンプトを構築中
              </p>
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && !isAnalyzing && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Elixence Marketing Brain Card */}
            <MarketingBrainCard
              brain={result.elixence_marketing_brain}
              winningAngle={result.winning_angle}
            />

            {/* 3-Second Audit Card */}
            <ThreeSecondAuditCard
              audit={result.three_second_audit}
              winningAngle={result.winning_angle}
            />

            {/* View Mode Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('concepts')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif-luxury font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'concepts'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] shadow-lg shadow-[#d4af37]/15'
                      : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>3方向の完成プロンプト</span>
                </button>

                <button
                  onClick={() => setActiveTab('diagnosis')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif-luxury font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'diagnosis'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] shadow-lg shadow-[#d4af37]/15'
                      : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>広告診断 ＆ ボトルネック</span>
                </button>

                <button
                  onClick={() => setActiveTab('copy_offer')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif-luxury font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'copy_offer'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] shadow-lg shadow-[#d4af37]/15'
                      : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>推奨コピー・オファー・CTA</span>
                </button>

                <button
                  onClick={() => setActiveTab('raw_json')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif-luxury font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'raw_json'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] shadow-lg shadow-[#d4af37]/15'
                      : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                  }`}
                >
                  <Braces className="w-4 h-4" />
                  <span>生JSON出力</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/[0.03] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">JSONコピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/50" />
                      <span>JSONコピー</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/[0.03] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-white/50" />
                  <span className="hidden sm:inline">JSON保存</span>
                </button>
              </div>
            </div>

            {/* Active Tab Panel */}
            {activeTab === 'concepts' && (
              <ConceptsView concepts={result.concepts} finalPrompt={result.final_prompt} />
            )}

            {activeTab === 'diagnosis' && (
              <DiagnosisView
                detectedMedia={result.detected_media}
                adSummary={result.current_ad_summary}
                targetAudience={result.target_audience}
                diagnosis={result.diagnosis}
                removeOrReduce={result.remove_or_reduce}
                informationPriority={result.information_priority}
              />
            )}

            {activeTab === 'copy_offer' && (
              <CopyOfferCtaSection
                mainCopies={result.main_copy_options}
                offers={result.offer_options}
                ctas={result.cta_options}
                trustElements={result.trust_elements}
                notes={result.notes}
              />
            )}

            {activeTab === 'raw_json' && (
              <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
                      指定スキーマ準拠 完全JSONデータ
                    </h4>
                    <p className="text-xs text-white/50">
                      他のCRMやAIワークフローにそのまま連携可能です
                    </p>
                  </div>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-lg transition-colors text-xs"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> コピー完了
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 全文コピー
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 rounded-xl bg-[#090a0f] border border-white/[0.08] font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[600px]">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07080b] py-10 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-serif-luxury font-semibold text-white/70 tracking-wide text-sm">
            ELIXENCE · 横山ユウキ式 チラシ改善プロンプトメーカー
          </p>
          <p className="text-white/40 max-w-xl mx-auto text-xs">
            美意識と品格のブランドデザイン × ダイレクトレスポンスマーケティング成約脳 × AI画像生成プロンプト自動構築エンジン
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AiStudioModal isOpen={showAiStudioModal} onClose={() => setShowAiStudioModal(false)} />
      <ThreeSecondExplainerModal isOpen={showExplainerModal} onClose={() => setShowExplainerModal(false)} />
    </div>
  );
}
