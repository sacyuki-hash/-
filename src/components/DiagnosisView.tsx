import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trash2,
  ListOrdered,
  Users,
  Target,
  FileSearch,
} from 'lucide-react';
import { TargetAudience, Diagnosis } from '../types/adDiagnosis';

interface DiagnosisViewProps {
  detectedMedia: string;
  adSummary: string;
  targetAudience: TargetAudience;
  diagnosis: Diagnosis;
  removeOrReduce: string[];
  informationPriority: string[];
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({
  detectedMedia,
  adSummary,
  targetAudience,
  diagnosis,
  removeOrReduce,
  informationPriority,
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-[#d4af37]" />
            <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
              画像解析 ＆ 現状広告サマリー
            </h4>
          </div>
          <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#f7df94] w-fit font-serif-luxury">
            判定媒体：{detectedMedia || '広告媒体'}
          </span>
        </div>
        <p className="text-sm text-white/80 leading-relaxed font-sans">{adSummary}</p>
      </div>

      {/* Target Audience Profile */}
      <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4">
          <Users className="w-5 h-5 text-[#d4af37]" />
          <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide">
            ターゲット心理と解像度の整理
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-xs font-semibold text-[#f7df94] uppercase tracking-wider">
              メインターゲット
            </span>
            <p className="text-sm font-semibold text-white mt-1.5 leading-snug">
              {targetAudience.primary}
            </p>
            {targetAudience.secondary && (
              <div className="mt-3 pt-3 border-t border-white/[0.08] text-xs text-white/50">
                <span className="font-medium text-white/70">サブターゲット: </span>
                {targetAudience.secondary}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-rose-950/[0.12] border border-rose-500/20">
              <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                ターゲットの切実な悩み・ペインポイント
              </span>
              <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                {targetAudience.pain_points?.map((pain, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold shrink-0">•</span>
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/[0.12] border border-emerald-500/20">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                本当に手に入れたい未来・理想（ベネフィット）
              </span>
              <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                {targetAudience.desired_outcomes?.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Diagnostic breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strengths */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              現状の良い点・ブランド資産
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-white/70">
            {diagnosis.strengths?.length > 0 ? (
              diagnosis.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <li className="text-white/40">特になし</li>
            )}
          </ul>
        </div>

        {/* Problems */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              成約阻害要因・反響ボトルネック
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-white/70">
            {diagnosis.problems?.map((prob, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-rose-500/20">
                <span className="text-rose-400 font-bold shrink-0">⚠</span>
                <span>{prob}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing elements */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <HelpCircle className="w-4 h-4 text-[#d4af37]" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              欠落している決断・成約要素
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-white/70">
            {diagnosis.missing_elements?.map((miss, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-[#d4af37]/20">
                <span className="text-[#d4af37] font-bold shrink-0">+</span>
                <span>{miss}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Remove Noise vs Information Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remove or reduce */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <Trash2 className="w-4 h-4 text-white/50" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              削るべきノイズ情報・装飾（過剰デザインの排除）
            </h4>
          </div>
          <p className="text-xs text-white/50 mb-3">
            顧客の視線を散らし、決定を鈍らせる装飾や自己満足の英語を排除します。
          </p>
          <ul className="space-y-2 text-xs text-white/70">
            {removeOrReduce?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Information priority */}
        <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.08]">
            <ListOrdered className="w-4 h-4 text-[#d4af37]" />
            <h4 className="font-serif-luxury text-sm font-bold text-white tracking-wide">
              視線誘導・情報の優先順位（Zの法則）
            </h4>
          </div>
          <p className="text-xs text-white/50 mb-3">
            閲覧者の脳内心理プロセスに沿った、視線と情報の自然な着地順序です。
          </p>
          <ol className="space-y-2 text-xs text-white/80">
            {informationPriority?.map((priority, idx) => (
              <li key={idx} className="flex items-center gap-2.5 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
                <span className="w-5 h-5 rounded-md bg-white/[0.06] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center font-serif-luxury font-bold text-xs shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium">{priority}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
