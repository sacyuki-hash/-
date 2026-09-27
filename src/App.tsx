import React, { useState, useEffect } from 'react';
import {
  Zap,
  FileText,
  Braces,
  Download,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Sparkles,
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
import { analyzeAdClientSide } from './utils/geminiClient';

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

  // Client-side direct call to Gemini API
  const handleAnalyze = async () => {
    if (!image) {
      setError('広告画像をアップロードするか、事例プリセットを選択してください。');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // フロントエンド（React/Vite側）から直接 Gemini API を呼び出し
      const diagnosisResult = await analyzeAdClientSide({
        imageData: image.data,
        mimeType: image.mimeType,
        metadata,
      });

      setResult(diagnosisResult);
      setRateLimitSeconds(null);
      setActiveTab('concepts'); // Switch to prompt concepts tab
    } catch (err: any) {
      console.error('Analysis failed:', err);
      const msg = err?.message || String(err);
      if (msg.includes('Rate Limit') || msg.includes('429')) {
        setRateLimitSeconds(35);
      }
      setError(msg || '通信エラーが発生しました。もう一度お試しください。');
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
    <div className="min-h-screen bg-white text-[#222222] flex flex-col font-['Plus_Jakarta_Sans','Noto_Sans_JP',sans-serif]">
      {/* Top Header */}
      <Header onOpenExplainerModal={() => setShowExplainerModal(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-8 sm:py-14 space-y-12">
        {/* Hero Section — Elixence Editorial Tone */}
        <section className="py-4 sm:py-8 border-b border-[#e9e9e9] space-y-6">
          <div className="max-w-4xl space-y-4">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.25em] text-[#9e7d23] uppercase block">
              ELIXENCE MARKETING INTELLIGENCE
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tight leading-[1.15]">
              仕組みで数字を。<br />
              共鳴で心を。
            </h1>
            <p className="text-xl sm:text-2xl text-[#333333] font-serif-luxury leading-relaxed pt-1">
              戦略はロジックで組み、共鳴はデザインで仕掛ける。
            </p>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-3xl">
              安っぽい煽りチラシは店を殺し、ただ綺麗なだけのアート広告は売上を殺す——。
              横山祐樹式マーケティング脳が、広告の心理障壁を「3秒ルール」で解体。
              高単価店舗・サロンの品格を守りながら成約率を最大化するAI画像生成用プロンプトを、クライアントサイドで直接構築します。
            </p>
          </div>
        </section>

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
          <div className="p-6 rounded-md bg-rose-50 border border-rose-300 text-rose-950 text-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p className="font-bold text-rose-900 text-base sm:text-lg">{error}</p>
                {rateLimitSeconds !== null && rateLimitSeconds > 0 && (
                  <p className="text-sm text-rose-700">
                    レートリミット待機中: 約 <span className="font-bold">{rateLimitSeconds}</span> 秒後に再試行可能です
                  </p>
                )}
                {!import.meta.env.VITE_GEMINI_API_KEY && (
                  <p className="text-sm text-rose-800">
                    ヒント: Netlify管理画面の「Site configuration &gt; Environment variables」にて、キー名「<code>VITE_GEMINI_API_KEY</code>」でGemini APIキーを登録し、再デプロイしてください。
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <button
                onClick={() => {
                  setError(null);
                  handleAnalyze();
                }}
                disabled={isAnalyzing}
                className="text-sm font-bold px-4 py-2 rounded-md bg-[#111111] text-white hover:bg-[#252525] transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{rateLimitSeconds ? `再試行 (${rateLimitSeconds}s)` : '再試行する'}</span>
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setRateLimitSeconds(null);
                }}
                className="text-sm font-bold px-4 py-2 rounded-md bg-white border border-[#d0d0d0] hover:bg-[#f0f0f0] text-[#333333] transition-colors cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* Loading State Animation */}
        {isAnalyzing && (
          <div className="py-20 text-center space-y-6 rounded-md bg-white border border-[#e9e9e9] shadow-xs">
            <div className="w-12 h-12 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#111111]">
                Elixence マーケティング脳 診断中...
              </div>
              <p className="text-base text-[#666666] max-w-lg mx-auto leading-relaxed">
                画像の文字・構造を認識 &rarr; 美意識と成約の乖離を解析 &rarr; 顧客心理障壁を解体 &rarr; 3方向の画像生成用完成プロンプトを構築中
              </p>
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && !isAnalyzing && (
          <div className="space-y-10 animate-in fade-in duration-300">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e9e9e9] pb-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('concepts')}
                  className={`px-5 py-3 rounded-md text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    activeTab === 'concepts'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#fafafa]'
                  }`}
                >
                  3方向の完成プロンプト
                </button>

                <button
                  onClick={() => setActiveTab('diagnosis')}
                  className={`px-5 py-3 rounded-md text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    activeTab === 'diagnosis'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#fafafa]'
                  }`}
                >
                  広告診断 ＆ ボトルネック
                </button>

                <button
                  onClick={() => setActiveTab('copy_offer')}
                  className={`px-5 py-3 rounded-md text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    activeTab === 'copy_offer'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#fafafa]'
                  }`}
                >
                  推奨コピー・オファー・CTA
                </button>

                <button
                  onClick={() => setActiveTab('raw_json')}
                  className={`px-5 py-3 rounded-md text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    activeTab === 'raw_json'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#fafafa]'
                  }`}
                >
                  生JSONデータ
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-white border border-[#222222] text-[#222222] hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>コピー完了</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>JSONコピー</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-white border border-[#222222] text-[#222222] hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON保存</span>
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
              <div className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-4">
                  <div>
                    <h4 className="font-serif-luxury text-lg font-bold text-[#111111]">
                      完全構造化 JSONデータ
                    </h4>
                    <p className="text-sm text-[#666666] mt-0.5">
                      CRMや他のワークフローにそのまま連携可能です
                    </p>
                  </div>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#252525] text-white font-bold rounded-md transition-colors text-sm cursor-pointer"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" /> コピー完了
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> 全文コピー
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] font-mono text-sm sm:text-base text-[#111111] whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[600px]">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e9e9e9] bg-white py-12 text-center text-sm text-[#666666] mt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif-luxury font-bold text-[#111111] tracking-wide text-lg sm:text-xl">
              Elixence — アーティスティック経営コンサル 横山祐樹
            </span>
          </div>
          <p className="text-[#555555] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            戦略はロジックで組み、共鳴は音で仕掛ける。<br className="hidden sm:inline" />
            Branding × Marketing × AI × System × Content × PR を束ね、成果に接続する。
          </p>
          <div className="pt-2">
            <a
              href="https://www.elixence.work/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:underline"
            >
              <span>Elixence 公式サイト（elixence.work）へ</span>
              <ExternalLink className="w-4 h-4 text-[#888888]" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ThreeSecondExplainerModal isOpen={showExplainerModal} onClose={() => setShowExplainerModal(false)} />
    </div>
  );
}
