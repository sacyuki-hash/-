import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert, Award, Clock } from 'lucide-react';
import { ThreeSecondAudit } from '../types/adDiagnosis';

interface ThreeSecondAuditCardProps {
  audit?: ThreeSecondAudit;
  winningAngle: string;
}

export const ThreeSecondAuditCard: React.FC<ThreeSecondAuditCardProps> = ({
  audit,
  winningAngle,
}) => {
  if (!audit) return null;

  const items = [
    { key: 'for_whom', title: '① 誰向けか分かるか？', item: audit.for_whom, hint: 'ターゲットの絞り込みと共感' },
    { key: 'what_service', title: '② 何の店・サービスか分かるか？', item: audit.what_service, hint: '専門性と業種の一瞬認知' },
    { key: 'credible', title: '③ 信用できるか？', item: audit.credible, hint: '実績・口コミ・国家資格などの証拠' },
    { key: 'reason_to_act', title: '④ 今行く理由があるか？', item: audit.reason_to_act, hint: '初回オファー・限定特典・安心保証' },
    { key: 'location_clear', title: '⑤ どこにあるか分かるか？', item: audit.location_clear, hint: '看板・店舗：ビル名・何階か・駅距離' },
    { key: 'next_action', title: '⑥ 次に何をすればいいか分かるか？', item: audit.next_action, hint: 'CTA・予約方法・極小アクション' },
  ];

  const passCount = items.filter((i) => i.item.pass).length;
  const isHighConversion = passCount >= 5;
  const isModerate = passCount >= 3 && passCount < 5;

  return (
    <div className="bg-[#10121a]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Background glow based on score */}
      <div
        className={`absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isHighConversion ? 'bg-emerald-500' : isModerate ? 'bg-[#d4af37]' : 'bg-rose-500'
        }`}
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-wider text-[#d4af37]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-serif-luxury font-semibold uppercase tracking-wider text-[11px]">3-SECOND EXECUTIVE AUDIT</span>
            <span className="text-white/20">·</span>
            <span className="text-white/60">通行人・閲覧者の「3秒の壁」監査</span>
          </div>
          <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white mt-1 tracking-wide">
            現状広告の「3秒ルール」クリア診断
          </h3>
        </div>

        {/* Score Display */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl">
          <div className="text-right">
            <div className="text-[11px] text-white/50">3秒関門 通過スコア</div>
            <div className="text-lg font-bold tracking-tight">
              <span className={isHighConversion ? 'text-emerald-400' : isModerate ? 'text-[#f7df94]' : 'text-rose-400'}>
                {passCount}
              </span>
              <span className="text-white/30 text-xs font-normal"> / 6項目</span>
            </div>
          </div>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider ${
              isHighConversion
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isModerate
                ? 'bg-[#d4af37]/20 text-[#f7df94] border border-[#d4af37]/35'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {isHighConversion ? 'PASS' : isModerate ? 'WARN' : 'NG'}
          </div>
        </div>
      </div>

      {/* Critical takeaway */}
      {passCount < 6 && (
        <div className="mt-4 p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-rose-300">Elixence マーケティング脳の警鐘：</span>
            「3秒の壁は1つでも関門が崩れると、来店・予約はゼロに近づきます。デザインがどんなに美しくても、以下の未達項目が顧客の心理ブレーキ（離脱）になっています。」
          </div>
        </div>
      )}

      {/* 6 Grid checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
        {items.map(({ key, title, item, hint }) => {
          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all ${
                item.pass
                  ? 'bg-white/[0.015] border-white/[0.08]'
                  : 'bg-rose-950/[0.12] border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-white/90">{title}</span>
                {item.pass ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> クリア
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400">
                    <XCircle className="w-3 h-3" /> 要改善
                  </span>
                )}
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{item.comment}</p>
            </div>
          );
        })}
      </div>

      {/* Winning angle highlight banner */}
      {winningAngle && (
        <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-[#1c1811] via-[#141310] to-[#1c1811] border border-[#d4af37]/35 shadow-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span className="font-serif-luxury text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              定 義 さ れ た 独 占 的 な 勝 ち 筋（PoSiTioNing）
            </span>
          </div>
          <p className="font-serif-luxury text-base sm:text-lg font-bold text-[#fff9e6] tracking-wide leading-relaxed">
            {winningAngle}
          </p>
        </div>
      )}
    </div>
  );
};
