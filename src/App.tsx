import React, { useState, useEffect } from 'react';
import {
  Zap,
  FileText,
  Braces,
  Download,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Layers,
  ShieldCheck,
  Compass,
  Clock,
  Info,
  X,
} from 'lucide-react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { MarketingBrainCard } from './components/MarketingBrainCard';
import { ThreeSecondAuditCard } from './components/ThreeSecondAuditCard';
import { DiagnosisView } from './components/DiagnosisView';
import { ConceptsView } from './components/ConceptsView';
import { CopyOfferCtaSection } from './components/CopyOfferCtaSection';
import { ThreeSecondExplainerModal } from './components/ThreeSecondExplainerModal';
import { AdDiagnosisResult, SupplementaryInfo } from './types/adDiagnosis';
import { analyzeAdClientSide, RateLimitError } from './utils/geminiClient';

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
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [rateLimitSeconds, setRateLimitSeconds] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'concepts' | 'marketing_brain' | 'diagnosis' | 'copy_offer' | 'raw_json'>('concepts');

  const [showExplainerModal, setShowExplainerModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Handle countdown for rate limits (1 minute = 60 seconds)
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

  // Client-side direct call to Gemini API using import.meta.env.VITE_GEMINI_API_KEY
  const handleAnalyze = async () => {
    if (rateLimitSeconds && rateLimitSeconds > 0) {
      return;
    }

    if (!image) {
      setGeneralError('広告画像をアップロードするか、事例プリセットを選択してください。');
      return;
    }

    setIsAnalyzing(true);
    setGeneralError(null);

    try {
      const diagnosisResult = await analyzeAdClientSide({
        imageData: image.data,
        mimeType: image.mimeType,
        metadata,
      });

      setResult(diagnosisResult);
      setRateLimitSeconds(null);
      setActiveTab('concepts'); // Switch to prompt concepts tab
    } catch (err: any) {
      console.warn('Analysis caught exception:', err);
      const isRate =
        err instanceof RateLimitError ||
        err?.isRateLimit ||
        String(err?.message || '').includes('アクセスが集中') ||
        String(err?.message || '').includes('429') ||
        String(err?.message || '').includes('RESOURCE_EXHAUSTED') ||
        String(err?.message || '').includes('quota') ||
        String(err?.message || '').includes('Too Many Requests');

      if (isRate) {
        // Set elegant 60-second rate limit wait without harsh red errors
        setRateLimitSeconds(60);
        setGeneralError(null);
      } else {
        const msg = err?.message || '通信環境をご確認の上、再度お試しください。';
        setGeneralError(msg);
      }
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

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-pink-50/70 via-purple-50/50 to-cyan-50/70 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans','Noto_Sans_JP',sans-serif]">
      {/* Ambient glowing background orbs for delicate aurora feel */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <Header
        onOpenExplainerModal={() => setShowExplainerModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-6 sm:py-10 space-y-8">
        {/* Hero Section — Transparent Aurora Editorial Tone */}
        <section className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 p-6 sm:p-10 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.03)] space-y-4">
          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-serif-luxury tracking-[0.25em] text-amber-700 font-bold uppercase">
              <span>ELIXENCE MARKETING INTELLIGENCE</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">DIRECT RESPONSE × AESTHETICS</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.2]">
              仕組みで数字を。<br />
              共鳴で心を。
            </h1>

            <p className="text-base sm:text-xl text-slate-700 font-serif-luxury leading-relaxed">
              戦略はロジックで組み、共鳴はデザインで仕掛ける。
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              安っぽい煽りチラシは店を殺し、ただ綺麗なだけのアート広告は売上を殺す——。
              横山祐樹式マーケティング脳が、広告の心理障壁を「3秒ルール」で解体。
              高単価店舗・サロンの品格を守りながら成約率を最大化するAI画像生成用プロンプトを、直接構築します。
            </p>
          </div>
        </section>

        {/* Elegant Rate Limit Calm Notice (No harsh red warning) */}
        {rateLimitSeconds !== null && rateLimitSeconds > 0 && (
          <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/80 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(245,158,11,0.08)] text-slate-800 space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-200/60 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
                      ACCESS QUEUE
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-medium">リクエスト順次処理中</span>
                  </div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900">
                    現在アクセスが集中しております
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    AIがフル稼働中のため、約1分ほどお待ちいただいてから再度生成ボタンを押してください。
                  </p>
                </div>
              </div>

              {/* Countdown badge */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto bg-amber-50/70 border border-amber-200/70 px-4 py-2.5 rounded-2xl">
                <div className="text-right">
                  <span className="text-[10px] text-amber-800 font-semibold block uppercase tracking-wider">
                    RETRY IN
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-900 font-mono tabular-nums">
                    {rateLimitSeconds} <span className="text-xs font-normal text-amber-700">秒</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle progress indicator */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${Math.max(0, Math.min(100, ((60 - rateLimitSeconds) / 60) * 100))}%` }}
              />
            </div>
          </div>
        )}

        {/* Calm Non-Rate-Limit Error Notice (Subtle, tranquil design, no red warning) */}
        {generalError && (
          <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 p-4 sm:p-5 text-slate-700 flex items-center justify-between gap-4 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <Info className="w-5 h-5 text-slate-500 shrink-0" />
              <span>{generalError}</span>
            </div>
            <button
              onClick={() => setGeneralError(null)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="閉じる"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= 2-COLUMN SPLIT WORKFLOW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: 3-Step Input & Setup Panel */}
          <div className="lg:col-span-5">
            <UploadSection
              image={image}
              onImageChange={setImage}
              metadata={metadata}
              onMetadataChange={setMetadata}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              rateLimitSeconds={rateLimitSeconds}
            />
          </div>

          {/* RIGHT COLUMN: Output & Prompt Studio Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* STATE 1: Analyzing Loading Indicator */}
            {isAnalyzing && (
              <div className="py-16 px-6 text-center space-y-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.03)]">
                <div className="w-12 h-12 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-2">
                  <div className="font-serif-luxury text-2xl font-bold text-slate-900">
                    Elixence マーケティング脳 診断中...
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    画像のテキスト・色彩・構造を解読 &rarr; 顧客心理障壁を解体 &rarr; 3方向の画像生成用完成プロンプトを構築しています
                  </p>
                </div>
              </div>
            )}

            {/* STATE 2: Empty / Ready State (Before Analysis) */}
            {!result && !isAnalyzing && (
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 p-6 sm:p-10 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.03)] space-y-6 text-slate-700">
                <div className="space-y-2 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2 text-xs font-serif-luxury text-amber-700 font-bold tracking-[0.2em] uppercase">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>PROMPT STUDIO &amp; AUDIT</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900">
                    完成プロンプトと診断結果がここに表示されます
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    左側のステップに従って広告画像をセットするか「事例プリセット」を選択し、生成ボタンを押してください。
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/50 border border-slate-200/60 space-y-1.5">
                    <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-wider">
                      OUTPUT 01
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">3方向の完成プロンプト</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      AI画像生成（Midjourney, FLUX等）にそのまま使える100%日本語の詳細プロンプト。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/50 border border-slate-200/60 space-y-1.5">
                    <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-wider">
                      OUTPUT 02
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">3秒の壁 関門診断</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      街頭・SNSで通行人をスルーさせない6つの心理関門を厳格に自己採点。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/50 border border-slate-200/60 space-y-1.5">
                    <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-wider">
                      OUTPUT 03
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">成約アーキテクチャ</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      高単価店舗の品格と客を惹きつけるオファー・導線の融合プランを提案。
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    完全クライアントサイド実行 · 画像データはお使いのブラウザ内メモリでのみ処理されます。
                  </span>
                </div>
              </div>
            )}

            {/* STATE 3: Full Results Studio (After Analysis) */}
            {result && !isAnalyzing && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* View Mode Navigation Tabs */}
                <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setActiveTab('concepts')}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === 'concepts'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      3方向の完成プロンプト
                    </button>

                    <button
                      onClick={() => setActiveTab('marketing_brain')}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === 'marketing_brain'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      統合診断＆3秒の壁
                    </button>

                    <button
                      onClick={() => setActiveTab('diagnosis')}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === 'diagnosis'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      現状分析＆ボトルネック
                    </button>

                    <button
                      onClick={() => setActiveTab('copy_offer')}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === 'copy_offer'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      コピー・オファー・CTA
                    </button>

                    <button
                      onClick={() => setActiveTab('raw_json')}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        activeTab === 'raw_json'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      JSON
                    </button>
                  </div>

                  {/* Actions: Copy & Download JSON */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/80 hover:bg-white border border-slate-200 hover:border-slate-300 text-slate-700 transition-all cursor-pointer shadow-2xs"
                      title="JSONをクリップボードにコピー"
                    >
                      {copiedJson ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>コピー済</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>JSON</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownloadJson}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/80 hover:bg-white border border-slate-200 hover:border-slate-300 text-slate-700 transition-all cursor-pointer shadow-2xs"
                      title="JSONをダウンロード"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>保存</span>
                    </button>
                  </div>
                </div>

                {/* Active Tab Panel Content */}
                {activeTab === 'concepts' && (
                  <ConceptsView concepts={result.concepts} finalPrompt={result.final_prompt} />
                )}

                {activeTab === 'marketing_brain' && (
                  <div className="space-y-6">
                    <MarketingBrainCard
                      brain={result.elixence_marketing_brain}
                      winningAngle={result.winning_angle}
                    />
                    <ThreeSecondAuditCard
                      audit={result.three_second_audit}
                      winningAngle={result.winning_angle}
                    />
                  </div>
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
                  <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-serif-luxury text-base font-bold text-slate-900">
                          構造化 JSONデータ
                        </h4>
                        <p className="text-xs text-slate-500">
                          CRMや外部デザインツール連携用の生データです
                        </p>
                      </div>
                      <button
                        onClick={handleCopyJson}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-xs cursor-pointer shadow-2xs"
                      >
                        {copiedJson ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> コピー完了
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> 全文コピー
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto max-h-[500px]">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/50 backdrop-blur-md py-10 text-center text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif-luxury font-bold text-slate-900 tracking-wide text-base">
              Elixence — アーティスティック経営コンサル 横山祐樹
            </span>
          </div>
          <p className="text-slate-600 max-w-xl mx-auto text-xs leading-relaxed">
            戦略はロジックで組み、共鳴はデザインで仕掛ける。<br className="hidden sm:inline" />
            Branding × Marketing × AI × System × Content × PR を束ね、成約に接続する。
          </p>
          <div className="pt-2">
            <a
              href="https://www.elixence.work/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:underline"
            >
              <span>Elixence 公式サイト（elixence.work）</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>

      {/* Explainer Modal */}
      <ThreeSecondExplainerModal
        isOpen={showExplainerModal}
        onClose={() => setShowExplainerModal(false)}
      />
    </div>
  );
}
