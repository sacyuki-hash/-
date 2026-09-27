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
    <div className="space-y-6">
      {/* Overview Card */}
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
              ASSET ANALYSIS
            </span>
            <span className="text-slate-300">·</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              現状広告の構造サマリー
            </h3>
          </div>
          <div className="text-xs font-medium text-slate-500">
            媒体種別: <strong className="text-slate-900">{detectedMedia || '広告媒体'}</strong>
          </div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{adSummary}</p>
      </section>

      {/* Target Audience Profile */}
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
            TARGET AUDIENCE
          </span>
          <span className="text-slate-300">·</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            顧客心理とペインの解像度
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/60 border border-slate-200/70 space-y-1.5">
            <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
              PRIMARY TARGET
            </span>
            <p className="text-sm font-bold text-slate-900">
              {targetAudience.primary}
            </p>
          </div>

          {targetAudience.secondary && (
            <div className="p-4 rounded-xl bg-white/60 border border-slate-200/70 space-y-1.5">
              <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
                SECONDARY TARGET
              </span>
              <p className="text-sm font-bold text-slate-900">
                {targetAudience.secondary}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Pain Points */}
          <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100/70 space-y-2">
            <span className="text-[11px] font-serif-luxury text-rose-800 font-bold tracking-wider uppercase">
              DEEP PAIN POINTS (悩み・痛み)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {targetAudience.pain_points?.map((pain, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">·</span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desired Outcomes */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/70 space-y-2">
            <span className="text-[11px] font-serif-luxury text-emerald-800 font-bold tracking-wider uppercase">
              DESIRED OUTCOMES (欲しい未来)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {targetAudience.desired_outcomes?.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">·</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Diagnosis: Strengths, Problems, Missing */}
      <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
            STRUCTURAL DIAGNOSIS
          </span>
          <span className="text-slate-300">·</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            現状の強みと成約ボトルネック
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
            <span className="text-[11px] font-serif-luxury text-emerald-700 font-bold tracking-wider uppercase">
              KEEP STRENGTHS (活かす強み)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.strengths?.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problems */}
          <div className="p-4 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
            <span className="text-[11px] font-serif-luxury text-rose-700 font-bold tracking-wider uppercase">
              BOTTLENECKS (成約の壁)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.problems?.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">·</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Elements */}
          <div className="p-4 rounded-xl bg-white/60 border border-slate-200/70 space-y-2">
            <span className="text-[11px] font-serif-luxury text-amber-700 font-bold tracking-wider uppercase">
              MISSING INGREDIENTS (不足要素)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {diagnosis.missing_elements?.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Remove/Reduce & Information Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-rose-700 uppercase">
              CUT &amp; TRIM
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              削るべき・小さくすべき要素
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {removeOrReduce?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-slate-700 uppercase">
              HIERARCHY
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              視覚的情報の優先順位（1〜5）
            </h4>
          </div>
          <ol className="space-y-1.5 text-xs text-slate-700">
            {informationPriority?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-serif-luxury font-bold text-slate-900 shrink-0">
                  {idx + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};
