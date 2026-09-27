import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface ThreeSecondExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreeSecondExplainerModal: React.FC<ThreeSecondExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif-luxury text-amber-700 font-bold tracking-widest uppercase">
              <span>ELIXENCE PHILOSOPHY</span>
              <span className="text-slate-300">·</span>
              <span>横山祐樹式 成約哲学</span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              美意識とダイレクトレスポンスの融合原則
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Mission statement */}
          <div className="rounded-xl bg-gradient-to-r from-amber-50/60 via-white/80 to-purple-50/40 border border-amber-200/50 p-5">
            <p className="font-serif-luxury font-bold text-lg sm:text-xl text-slate-900 mb-1.5">
              安っぽい煽りチラシは店を殺し、ただ綺麗なアート広告は売上を殺す。
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Elixenceの真髄は、<strong className="text-slate-900 font-bold">「店舗の品格・ブランドの世界観を美しく保ちながら、問い合わせ・予約・来店などの具体的成約行動を極限まで最大化する」</strong>ことにあります。顧客の心にある「不安・疑念・めんどくささ」を3秒で解体し、確実に次の一歩へと導きます。
            </p>
          </div>

          {/* 6 criteria */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-slate-900">
              3秒で顧客の脳内を貫く 6つの心理関門
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 01
                </span>
                <h4 className="font-bold text-slate-900 text-sm">自分向けだと分かるか？</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  「女性向け」ではなく「デスクワークで首肩が固まる働く女性」のように解像度を研ぎ澄ます。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 02
                </span>
                <h4 className="font-bold text-slate-900 text-sm">何の店・サービスか分かるか？</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  読めない英字筆記体は即座にスルー。「働く女性のための整体×小顔」と日本語で直撃させる。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 03
                </span>
                <h4 className="font-bold text-slate-900 text-sm">信用できる客観証拠があるか？</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google口コミ★4.9、延べ18,000人施術、国家資格など、不安を払拭する客観的数字を明記する。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 04
                </span>
                <h4 className="font-bold text-slate-900 text-sm">今行く理由があるか？</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  「通常9,800円 → 初回3,980円」「全額返金保証」など、心理的リスクをゼロにするオファー。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 05
                </span>
                <h4 className="font-bold text-slate-900 text-sm">どこにあるか分かるか？（看板の命）</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  看板なら「○ビル 3F（エレベーター奥）」「駅西口 徒歩2分」。場所が分からなければ客は消滅する。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-slate-200/70 space-y-1">
                <span className="font-serif-luxury text-[11px] font-bold text-amber-700 tracking-widest">
                  GATE 06
                </span>
                <h4 className="font-bold text-slate-900 text-sm">次に何をすればいいか分かるか？</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  「QRからLINEで空き枠確認」「24時間即時予約」など、今すぐできる極小アクションを提示。
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
