import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { ThreeSecondAudit } from '../types/adDiagnosis';

interface ThreeSecondAuditCardProps {
  audit?: ThreeSecondAudit;
  winningAngle: string;
}

export const ThreeSecondAuditCard: React.FC<ThreeSecondAuditCardProps> = ({
  audit,
}) => {
  if (!audit) return null;

  const items = [
    { key: 'for_whom', title: '01. 誰向けか分かるか？', item: audit.for_whom, hint: 'ターゲットの絞り込みと共感' },
    { key: 'what_service', title: '02. 何の店・サービスか分かるか？', item: audit.what_service, hint: '専門性と業種の一瞬認知' },
    { key: 'credible', title: '03. 信用できるか？', item: audit.credible, hint: '実績・口コミ・国家資格などの証拠' },
    { key: 'reason_to_act', title: '04. 今行く理由があるか？', item: audit.reason_to_act, hint: '初回オファー・限定特典・安心保証' },
    { key: 'location_clear', title: '05. どこにあるか分かるか？', item: audit.location_clear, hint: '看板・店舗：ビル名・何階か・駅距離' },
    { key: 'next_action', title: '06. 次に何をすればいいか分かるか？', item: audit.next_action, hint: 'CTA・予約方法・極小アクション' },
  ];

  const passCount = items.filter((i) => i.item.pass).length;
  const isHighConversion = passCount >= 5;

  return (
    <section className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
            3-SECOND RULE AUDIT
          </span>
          <span className="text-slate-300">·</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            街頭・SNSでの「3秒の壁」関門診断
          </h3>
        </div>

        {/* Score Display (Clean typography, no candy badge) */}
        <div className="flex items-baseline gap-2.5">
          <span className="text-xs font-medium text-slate-500">通過スコア:</span>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            <span className={isHighConversion ? 'text-emerald-700' : 'text-amber-700'}>{passCount}</span>
            <span className="text-slate-400 text-sm font-normal"> / 6 項目</span>
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {isHighConversion ? '（合格基準）' : '（要テコ入れ）'}
          </span>
        </div>
      </div>

      {/* Advisory Note */}
      {passCount < 6 && (
        <div className="rounded-xl bg-amber-50/60 border border-amber-200/60 p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-bold">Elixence 診断アドバイス：</strong>
          「3秒の壁は、どれか1つでも関門が崩れると通行人はスルーします。未達となった項目は、生成されたAIプロンプトで自動的に補強・是正されています。」
        </div>
      )}

      {/* 6 Grid checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ key, title, item }) => (
          <div
            key={key}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              item.pass
                ? 'bg-white/70 border-slate-200/70'
                : 'bg-slate-50/70 border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900">{title}</span>
              <span
                className={`text-xs font-bold flex items-center gap-1 ${
                  item.pass ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {item.pass ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>合格</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" />
                    <span>要改善</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
