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
    <section className="bg-white border border-[#e9e9e9] rounded-lg p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#e9e9e9] pb-5">
        <div className="flex items-center gap-3">
          <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#9e7d23] uppercase">
            3-SECOND RULE AUDIT
          </span>
          <span className="text-[#cccccc]">/</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            街頭・SNSでの「3秒の壁」関門診断
          </h3>
        </div>

        {/* Score Display (Clean typography, no candy badge) */}
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium text-[#777777]">通過スコア:</span>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            <span className={isHighConversion ? 'text-[#111111]' : 'text-rose-600'}>{passCount}</span>
            <span className="text-[#888888] text-base font-normal"> / 6 項目</span>
          </span>
          <span className="text-sm font-semibold text-[#555555]">
            {isHighConversion ? '（合格水準）' : '（要テコ入れ）'}
          </span>
        </div>
      </div>

      {/* Advisory Note */}
      {passCount < 6 && (
        <div className="border-l-2 border-amber-600 pl-5 py-2 text-[#444444] text-base leading-relaxed">
          <strong className="text-[#111111] font-bold">Elixence 診断アドバイス：</strong>
          「3秒の壁は、どれか1つでも関門が崩れると通行人はスルーします。デザインの美しさを保ちながら、未達となった項目をAIプロンプトで補強してください。」
        </div>
      )}

      {/* 6 Grid checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ key, title, item }) => (
          <div
            key={key}
            className={`p-6 rounded-md border transition-all ${
              item.pass
                ? 'bg-white border-[#e9e9e9]'
                : 'bg-[#fafafa] border-[#d8d8d8]'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3 border-b border-[#f0f0f0] pb-2.5">
              <span className="text-base font-bold text-[#111111]">{title}</span>
              <span
                className={`text-sm font-bold flex items-center gap-1 ${
                  item.pass ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {item.pass ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>クリア</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span>未達</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
              {item.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
