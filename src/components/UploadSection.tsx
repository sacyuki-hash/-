import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  AlertCircle,
  Wand2,
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

  return (
    <div className="bg-[#10121a]/95 border border-[#d4af37]/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
      {/* Preset Quick Loader Buttons */}
      <div className="mb-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm font-semibold tracking-wider text-[#d4af37]">
              CASES &amp; PRESETS
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/70">
              典型的な改善事例（ワンクリック読込）
            </span>
          </div>
          <span className="text-[11px] text-white/40">
            画像と実店舗データが即座にセットされ、分析を実行できます
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className="p-4 text-left rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#d4af37]/50 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/50 group-hover:text-[#d4af37] font-medium">
                  {preset.category}
                </span>
                <span className="text-[#d4af37] group-hover:translate-x-0.5 transition-transform font-serif-luxury">
                  Load &rarr;
                </span>
              </div>
              <div className="text-xs font-semibold text-white mt-2 line-clamp-1">{preset.name}</div>
              <p className="text-[11px] text-white/50 mt-1 line-clamp-1">{preset.tagline}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Drop Zone & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Upload box */}
        <div className={image ? 'md:col-span-5' : 'md:col-span-12'}>
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
              className={`border border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-[#d4af37] bg-[#d4af37]/10'
                  : 'border-white/[0.15] hover:border-[#d4af37]/60 bg-white/[0.015] hover:bg-white/[0.03]'
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white tracking-wide">
                広告画像をアップロード または ドロップ
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-md mx-auto leading-relaxed">
                チラシ・看板・ポスター・SNS広告・LPファーストビュー（JPG, PNG, WEBP, SVG）
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/50">
                <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>文字とレイアウトの構造、オファー、成約導線をAIが精密解析</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#0b0c11] rounded-2xl border border-white/[0.1] p-4 relative group">
              <div className="max-h-80 overflow-hidden rounded-xl border border-white/[0.08] bg-[#141620] flex items-center justify-center">
                <img
                  src={image.data}
                  alt="Uploaded Ad"
                  className="max-h-80 w-auto object-contain mx-auto"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                <span className="truncate max-w-[200px] text-white/80 font-medium">
                  {image.name || 'アップロード画像'}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#d4af37] hover:text-[#f7df94] font-medium"
                  >
                    変更
                  </button>
                  <span className="text-white/20">|</span>
                  <button onClick={handleReset} className="text-rose-400 hover:text-rose-300">
                    解除
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metadata section (if image loaded, display side by side or below) */}
        {image && (
          <div className="md:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-[#d4af37]" />
                  <span>店舗・オファーの補足条件（任意）</span>
                </h4>
                <p className="text-xs text-white/50 mt-0.5">
                  未記入でも画像から自動解析。入力するほど横山ユウキ式の成約精度が極大化します
                </p>
              </div>
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:text-[#f7df94] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]"
              >
                {showMetadata ? (
                  <>
                    <span>閉じる</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>編集 ({Object.values(metadata).filter(Boolean).length}件)</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick summary badges if collapsed */}
            {!showMetadata && (
              <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-white/40">媒体:</span>{' '}
                    <span className="text-white/80 font-medium">{metadata.mediaType || '画像から判定'}</span>
                  </div>
                  <div>
                    <span className="text-white/40">業種:</span>{' '}
                    <span className="text-white/80 font-medium">{metadata.industryService || '画像から判定'}</span>
                  </div>
                  <div>
                    <span className="text-white/40">初回オファー:</span>{' '}
                    <span className="text-[#f7df94] font-medium">{metadata.offer || metadata.price || '未指定'}</span>
                  </div>
                  <div>
                    <span className="text-white/40">立地・階数:</span>{' '}
                    <span className="text-white/80 font-medium">{metadata.storeLocation || '未指定'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded fields */}
            {showMetadata && (
              <div className="space-y-3 p-4 rounded-xl bg-[#0c0d14] border border-white/[0.08] text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 font-medium mb-1">媒体種別</label>
                    <input
                      type="text"
                      value={metadata.mediaType}
                      onChange={(e) => handleInputChange('mediaType', e.target.value)}
                      placeholder="例: 街頭立て看板 / A4チラシ / Instagram広告"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 font-medium mb-1">業種・サービス内容</label>
                    <input
                      type="text"
                      value={metadata.industryService}
                      onChange={(e) => handleInputChange('industryService', e.target.value)}
                      placeholder="例: 女性専門の姿勢改善・骨盤矯正整体"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 font-medium mb-1">ターゲット層（悩み・属性）</label>
                  <input
                    type="text"
                    value={metadata.target}
                    onChange={(e) => handleInputChange('target', e.target.value)}
                    placeholder="例: 30代〜40代のデスクワークで首肩こり・猫背に悩む働く女性"
                    className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 font-medium mb-1">価格・通常料金</label>
                    <input
                      type="text"
                      value={metadata.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="例: 通常 1回 9,800円"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#f7df94] font-medium mb-1">
                      初回オファー・特典（心理障壁の破壊）
                    </label>
                    <input
                      type="text"
                      value={metadata.offer}
                      onChange={(e) => handleInputChange('offer', e.target.value)}
                      placeholder="例: 初回限定 3,980円（全額返金保証・1日3名限定）"
                      className="w-full bg-[#141622] border border-[#d4af37]/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 font-medium mb-1">Google口コミ・評価</label>
                    <input
                      type="text"
                      value={metadata.reviews}
                      onChange={(e) => handleInputChange('reviews', e.target.value)}
                      placeholder="例: Google口コミ ★4.9（142件）"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 font-medium mb-1">資格・実績（社会的証明）</label>
                    <input
                      type="text"
                      value={metadata.credentials}
                      onChange={(e) => handleInputChange('credentials', e.target.value)}
                      placeholder="例: 国家資格保有 / 施術実績 延べ18,000人"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#d4af37] font-medium mb-1">
                      ビル名・階数（看板の成約命）
                    </label>
                    <input
                      type="text"
                      value={metadata.storeLocation}
                      onChange={(e) => handleInputChange('storeLocation', e.target.value)}
                      placeholder="例: ○○ビル 4F (EVあり)"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 font-medium mb-1">駅からの距離・地域</label>
                    <input
                      type="text"
                      value={metadata.distanceStation}
                      onChange={(e) => handleInputChange('distanceStation', e.target.value)}
                      placeholder="例: 恵比寿駅 西口 徒歩2分"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 font-medium mb-1">最終目的 (CTA)</label>
                    <input
                      type="text"
                      value={metadata.finalGoal}
                      onChange={(e) => handleInputChange('finalGoal', e.target.value)}
                      placeholder="例: LINEから即時空き枠確認・予約"
                      className="w-full bg-[#141622] border border-white/[0.1] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Giant Submit Button */}
            <div className="pt-2">
              <button
                onClick={onAnalyze}
                disabled={isAnalyzing || !image}
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isAnalyzing
                    ? 'bg-[#b8942b] text-[#0c0d12] cursor-wait'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f3d98c] to-[#d4af37] text-[#0c0d12] hover:brightness-105 shadow-[#d4af37]/15'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0c0d12] border-t-transparent rounded-full animate-spin" />
                    <span>Elixence マーケティング脳で診断 ＆ プロンプト生成中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span className="font-serif-luxury tracking-wide">
                      Elixence 横山ユウキ式 3秒診断 ＆ 改善プロンプトを生成
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
