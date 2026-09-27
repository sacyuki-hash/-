import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  X,
  Sliders,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';
import { SupplementaryInfo, AdPreset } from '../types/adDiagnosis';
import { SAMPLE_PRESETS } from '../utils/presets';

interface UploadSectionProps {
  image: { data: string; mimeType: string; name?: string } | null;
  onImageChange: (image: { data: string; mimeType: string; name?: string } | null) => void;
  metadata: SupplementaryInfo;
  onMetadataChange: (meta: SupplementaryInfo) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  rateLimitSeconds?: number | null;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  image,
  onImageChange,
  metadata,
  onMetadataChange,
  onAnalyze,
  isAnalyzing,
  rateLimitSeconds,
}) => {
  const [showMetadata, setShowMetadata] = useState(true);
  const [showPresets, setShowPresets] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイル（PNG, JPG, WEBP, SVG等）を選択してください。');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange({
        data: result,
        mimeType: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadPreset = (preset: AdPreset) => {
    onImageChange({
      data: preset.imageDataUrl,
      mimeType: 'image/svg+xml',
      name: preset.imageTitle,
    });
    onMetadataChange(preset.metadata);
    setShowPresets(false);
  };

  const handleInputChange = (field: keyof SupplementaryInfo, val: string) => {
    onMetadataChange({
      ...metadata,
      [field]: val,
    });
  };

  const handleReset = () => {
    onImageChange(null);
    onMetadataChange({
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
  };

  const filledCount = Object.values(metadata).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />

      {/* Preset Showcase Drawer */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
              CASE ARCHIVE
            </span>
            <span className="text-slate-300">·</span>
            <h4 className="text-sm font-bold text-slate-800 tracking-wide">
              改善事例プリセット
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer"
          >
            <span>{showPresets ? '閉じる' : '事例を選択'}</span>
            {showPresets ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          手元に画像がない場合も、サロン・整体・ジムの実例からワンクリックで即座にお試しいただけます。
        </p>

        {showPresets && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-3 border-t border-slate-100">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset)}
                className="p-3.5 text-left rounded-xl bg-white/80 border border-slate-200/80 hover:border-slate-400 hover:bg-white transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-serif-luxury tracking-wider mb-1">
                  <span>0{idx + 1} · {preset.category}</span>
                  <span className="text-slate-600 group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-slate-950">
                  {preset.name}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {preset.tagline}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= STEP 1: 画像をセット ================= */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-serif-luxury">
              1
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-wide">
                画像をセット
              </h3>
              <p className="text-xs text-slate-500">
                チラシ · 看板 · ポスター · SNS広告 · バナー · LP
              </p>
            </div>
          </div>
          {image && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                変更
              </button>
              <span className="text-slate-300">/</span>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
              >
                解除
              </button>
            </div>
          )}
        </div>

        {!image ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 ${
              dragOver
                ? 'border-slate-800 bg-slate-50/80 scale-[0.99]'
                : 'border-slate-200/90 hover:border-slate-400 bg-white/50 hover:bg-white/80'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/60 text-slate-700 flex items-center justify-center mb-3 shadow-2xs">
              <Upload className="w-5 h-5" />
            </div>
            <p className="font-serif-luxury text-lg font-bold text-slate-800">
              ここに広告画像をドロップ
            </p>
            <p className="text-xs text-slate-500 mt-1">
              またはクリックしてファイルを選択（PNG, JPG, WEBP, SVG）
            </p>
          </div>
        ) : (
          <div className="bg-white/60 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-36 h-36 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={image.data}
                alt="Selected Ad"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5 text-center sm:text-left">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" /> セット完了
              </span>
              <h5 className="text-sm font-bold text-slate-900 truncate">
                {image.name || '解析対象の広告画像'}
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                画像のテキスト・色彩・レイアウトをAIが認識し、3秒成約の観点から欠陥を解体します。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= STEP 2: 条件を補足 ================= */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-serif-luxury">
              2
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 tracking-wide">
                  条件を補足
                </h3>
                <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  任意・自動補正あり
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {filledCount > 0
                  ? `${filledCount} 項目設定中（入力するほどプロンプト精度が向上）`
                  : '未入力でも画像から自動解析。店舗やオファーの具体値を入れると劇的に向上'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowMetadata(!showMetadata)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            title={showMetadata ? '折りたたむ' : '展開する'}
          >
            {showMetadata ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showMetadata && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Row 1: Media & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  広告媒体の種類
                </label>
                <select
                  value={metadata.mediaType}
                  onChange={(e) => handleInputChange('mediaType', e.target.value)}
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                >
                  <option value="">画像から自動判定</option>
                  <option value="ポスティング・折込チラシ">ポスティング・折込チラシ</option>
                  <option value="店舗前・街頭立て看板（A型看板等）">店舗前・街頭立て看板（A型看板等）</option>
                  <option value="駅前・ビル壁面ポスター">駅前・ビル壁面ポスター</option>
                  <option value="Instagram・Meta広告バナー">Instagram・Meta広告バナー</option>
                  <option value="LPファーストビュー">LPファーストビュー</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-0.5 block">媒体に応じた視線誘導を設計</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  業種・サービス名
                </label>
                <input
                  type="text"
                  value={metadata.industryService}
                  onChange={(e) => handleInputChange('industryService', e.target.value)}
                  placeholder="例: 整体・小顔サロン / ジム"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">一瞬で何の店かわかる旗振り</span>
              </div>
            </div>

            {/* Row 2: Target & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ターゲット顧客層（ペイン）
                </label>
                <input
                  type="text"
                  value={metadata.target}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                  placeholder="例: 首肩こりに悩む30〜40代女性"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">「自分向けだ」と確信させる</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  店舗情報・ビル階数（重要）
                </label>
                <input
                  type="text"
                  value={metadata.storeLocation}
                  onChange={(e) => handleInputChange('storeLocation', e.target.value)}
                  placeholder="例: 麻布ビル4F（徒歩2分）"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">看板に必須の「何階か」を明記</span>
              </div>
            </div>

            {/* Row 3: Offer & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  初回限定オファー・特典
                </label>
                <input
                  type="text"
                  value={metadata.offer}
                  onChange={(e) => handleInputChange('offer', e.target.value)}
                  placeholder="例: 初回3,980円（全額返金保証）"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">先送り理由を断つオファー</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google口コミ・客観証拠
                </label>
                <input
                  type="text"
                  value={metadata.reviews}
                  onChange={(e) => handleInputChange('reviews', e.target.value)}
                  placeholder="例: Google口コミ★4.9（140件）"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">怪しさを消す客観的証明</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= STEP 3: プロンプト生成 ================= */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-serif-luxury">
            3
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-wide">
              プロンプト生成
            </h3>
            <p className="text-xs text-slate-500">
              Elixenceマーケティング脳を発動し、3秒成約プロンプトを構築
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing || (rateLimitSeconds !== null && rateLimitSeconds !== undefined && rateLimitSeconds > 0)}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg ${
            isAnalyzing
              ? 'bg-slate-700 text-slate-200 cursor-wait'
              : rateLimitSeconds && rateLimitSeconds > 0
              ? 'bg-slate-600/70 text-slate-200 cursor-not-allowed'
              : !image
              ? 'bg-slate-900/85 hover:bg-slate-900 text-white'
              : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white ring-1 ring-white/30'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
              <span className="tracking-wide">Elixence マーケティング脳 診断中...</span>
            </>
          ) : rateLimitSeconds && rateLimitSeconds > 0 ? (
            <>
              <span className="tracking-wide font-medium text-sm sm:text-base">
                AIフル稼働中（待機残り {rateLimitSeconds}秒）
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-serif-luxury text-lg tracking-wide">
                広告を解析し、3秒成約プロンプトを生成
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </>
          )}
        </button>

        {/* Client side notice */}
        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            クライアント直接解析 · 画像は安全に保持されます
          </span>
          <span className="text-slate-400">Elixence Intelligence</span>
        </div>
      </div>
    </div>
  );
};
