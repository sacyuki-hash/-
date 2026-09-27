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
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  image,
  onImageChange,
  metadata,
  onMetadataChange,
  onAnalyze,
  isAnalyzing,
}) => {
  const [showMetadata, setShowMetadata] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイル（PNG, JPG, WEBP等）を選択してください。');
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
    setShowMetadata(true);
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
    <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-10">
      {/* Preset Quick Loader */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#e9e9e9] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              CASE ARCHIVE
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
              改善事例プリセット（ワンクリック読込）
            </h3>
          </div>
          <span className="text-sm text-[#777777]">
            画像と店舗情報がセットされ、即座に診断可能です
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className="p-6 text-left rounded-md bg-white border border-[#e9e9e9] hover:border-[#111111] transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#888888] font-serif-luxury tracking-wider mb-2">
                <span>0{idx + 1} · {preset.category}</span>
                <span className="text-[#111111] group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <div className="text-lg font-bold text-[#111111] line-clamp-1">
                {preset.name}
              </div>
              <p className="text-sm text-[#666666] mt-2 line-clamp-2 leading-relaxed">
                {preset.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e9e9e9]" />

      {/* Main Upload Dropzone & Setup */}
      <div className="space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />

        {!image ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg p-10 sm:p-16 text-center cursor-pointer transition-all duration-200 ${
              dragOver
                ? 'border-[#111111] bg-[#f9f9f9]'
                : 'border-[#cccccc] hover:border-[#111111] bg-[#fafafa] hover:bg-white'
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#111111] text-white flex items-center justify-center mb-5">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
              広告画像をアップロード または ドロップ
            </h3>
            <p className="text-base sm:text-lg text-[#555555] mt-3 max-w-xl mx-auto leading-relaxed">
              チラシ · 看板 · ポスター · SNS広告 · バナー · LPファーストビュー
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-[#777777]">
              <span>対応形式: PNG / JPG / WEBP / SVG</span>
              <span>·</span>
              <span>クライアントサイド直接解析（画像は外部サーバーへ転送されません）</span>
            </div>
          </div>
        ) : (
          <div className="border border-[#e9e9e9] rounded-lg p-6 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e9e9e9] pb-4">
              <div>
                <span className="font-serif-luxury text-xs text-[#9e7d23] font-bold tracking-widest uppercase">
                  UPLOADED ASSET
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#111111] mt-0.5 truncate max-w-md">
                  {image.name || '解析対象の広告画像'}
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-semibold text-[#111111] hover:underline cursor-pointer"
                >
                  画像変更
                </button>
                <span className="text-[#cccccc]">/</span>
                <button
                  onClick={handleReset}
                  className="text-sm font-semibold text-rose-600 hover:underline cursor-pointer"
                >
                  リセット
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Preview */}
              <div className="lg:col-span-5 bg-[#fafafa] border border-[#e9e9e9] rounded-md p-4 flex items-center justify-center">
                <img
                  src={image.data}
                  alt="Uploaded Ad"
                  className="max-h-80 w-auto object-contain mx-auto"
                />
              </div>

              {/* Quick Settings & Trigger */}
              <div className="lg:col-span-7 space-y-6">
                <div className="border border-[#e9e9e9] rounded-md p-5 bg-[#fafafa] flex items-center justify-between">
                  <div>
                    <h5 className="text-base sm:text-lg font-bold text-[#111111]">
                      店舗・オファー補足情報（任意）
                    </h5>
                    <p className="text-sm text-[#666666] mt-0.5">
                      {filledCount > 0
                        ? `${filledCount} 項目が入力されています`
                        : '未記入でも画像から自動解析。入力するほど精度が向上します'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMetadata(!showMetadata)}
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 bg-white border border-[#222222] rounded-md hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
                  >
                    <span>{showMetadata ? '閉じる' : '条件を編集'}</span>
                    {showMetadata ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Form fields if expanded */}
                {showMetadata && (
                  <div className="border border-[#e9e9e9] rounded-md p-6 bg-white space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          広告媒体の種類
                        </label>
                        <select
                          value={metadata.mediaType}
                          onChange={(e) => handleInputChange('mediaType', e.target.value)}
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        >
                          <option value="">画像から自動判定</option>
                          <option value="ポスティング・折込チラシ">ポスティング・折込チラシ</option>
                          <option value="店舗前・街頭立て看板（A型看板等）">店舗前・街頭立て看板（A型看板等）</option>
                          <option value="駅前・ビル壁面ポスター">駅前・ビル壁面ポスター</option>
                          <option value="Instagram・Meta広告バナー">Instagram・Meta広告バナー</option>
                          <option value="LPファーストビュー">LPファーストビュー</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          業種・サービス
                        </label>
                        <input
                          type="text"
                          value={metadata.industryService}
                          onChange={(e) => handleInputChange('industryService', e.target.value)}
                          placeholder="例: 整体・小顔サロン / パーソナルジム"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          ターゲット顧客層
                        </label>
                        <input
                          type="text"
                          value={metadata.target}
                          onChange={(e) => handleInputChange('target', e.target.value)}
                          placeholder="例: 首肩こりに悩む30〜40代働く女性"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          対象地域・エリア
                        </label>
                        <input
                          type="text"
                          value={metadata.region}
                          onChange={(e) => handleInputChange('region', e.target.value)}
                          placeholder="例: 東京都 港区 麻布十番"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          通常価格 / 相場
                        </label>
                        <input
                          type="text"
                          value={metadata.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="例: 通常9,800円 (60分)"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          初回オファー・特典
                        </label>
                        <input
                          type="text"
                          value={metadata.offer}
                          onChange={(e) => handleInputChange('offer', e.target.value)}
                          placeholder="例: 初回限定 3,980円（全額返金保証付）"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          Google口コミ・客観証拠
                        </label>
                        <input
                          type="text"
                          value={metadata.reviews}
                          onChange={(e) => handleInputChange('reviews', e.target.value)}
                          placeholder="例: Google口コミ★4.9（142件）"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#222222] mb-1.5">
                          ビル名・階数（看板の最重要項目）
                        </label>
                        <input
                          type="text"
                          value={metadata.storeLocation}
                          onChange={(e) => handleInputChange('storeLocation', e.target.value)}
                          placeholder="例: 麻布ヒルズ 4F (エレベーター奥)"
                          className="w-full bg-white border border-[#d8d8d8] rounded-md px-3.5 py-2.5 text-base text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Primary CTA Button */}
                <button
                  onClick={onAnalyze}
                  disabled={isAnalyzing || !image}
                  className={`w-full py-4 sm:py-5 px-8 rounded-md font-bold text-lg sm:text-xl tracking-wide transition-all flex items-center justify-center gap-3 cursor-pointer ${
                    isAnalyzing
                      ? 'bg-[#333333] text-white cursor-wait'
                      : 'bg-[#111111] hover:bg-[#252525] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Elixence マーケティング脳で診断中...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-serif-luxury tracking-wide">
                        広告を解析し、3秒成約プロンプトを生成する
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
