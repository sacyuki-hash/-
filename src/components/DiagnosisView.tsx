import React from 'react';
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
    <div className="space-y-8">
      {/* Overview Card */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#e9e9e9] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
              ASSET ANALYSIS
            </span>
            <span className="text-[#cccccc]">/</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              現状広告の構造サマリー
            </h3>
          </div>
          <div className="text-sm font-medium text-[#555555]">
            媒体種別: <strong className="text-[#111111]">{detectedMedia || '広告媒体'}</strong>
          </div>
        </div>
        <p className="text-base sm:text-lg text-[#333333] leading-relaxed">{adSummary}</p>
      </section>

      {/* Target Audience Profile */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            TARGET AUDIENCE
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            顧客心理とペインの解像度
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
              PRIMARY TARGET
            </span>
            <p className="text-lg sm:text-xl font-bold text-[#111111]">
              {targetAudience.primary}
            </p>
            {targetAudience.secondary && (
              <div className="text-sm sm:text-base text-[#666666] pt-2 border-t border-[#e5e5e5]">
                <strong className="text-[#333333]">サブターゲット: </strong>
                {targetAudience.secondary}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-2">
              <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
                PAIN POINTS — 切実な悩み
              </span>
              <ul className="space-y-1.5 text-base text-[#444444]">
                {targetAudience.pain_points?.map((pain, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#111111] font-bold shrink-0">·</span>
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-2">
              <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
                DESIRED OUTCOMES — 理想の未来
              </span>
              <ul className="space-y-1.5 text-base text-[#444444]">
                {targetAudience.desired_outcomes?.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#111111] font-bold shrink-0">·</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Bottlenecks */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            STRENGTHS &amp; BOTTLENECKS
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            長所と致命的ボトルネック
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
              PRESERVED STRENGTHS — 活かすべき長所
            </span>
            <ul className="space-y-2 text-base text-[#333333]">
              {diagnosis.strengths?.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
              CRITICAL BOTTLENECKS — 離脱を引き起こす要因
            </span>
            <ul className="space-y-2 text-base text-[#333333]">
              {diagnosis.problems?.map((prob, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0">×</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Information Hierarchy & Elimination */}
      <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#e9e9e9] pb-4">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            HIERARCHY &amp; ELIMINATION
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            情報優先順位 ＆ 削除・縮小すべき要素
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
              PRIORITY ORDER — 視線誘導順序
            </span>
            <ol className="space-y-2 text-base text-[#333333]">
              {informationPriority?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-serif-luxury font-bold text-[#111111] shrink-0">
                    0{i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-6 rounded-md bg-[#fafafa] border border-[#e9e9e9] space-y-3">
            <span className="text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-wider uppercase">
              ELIMINATE / REDUCE — 削減すべきノイズ
            </span>
            <ul className="space-y-2 text-base text-[#444444]">
              {removeOrReduce?.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#888888] font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
