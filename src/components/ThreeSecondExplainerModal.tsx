import React from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#e9e9e9] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#e9e9e9] sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif-luxury text-[#9e7d23] font-bold tracking-widest uppercase">
              <span>ELIXENCE CONSTITUTION</span>
              <span className="text-[#cccccc]">/</span>
              <span>横山祐樹式 成約哲学</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#111111] mt-1">
              美意識とダイレクトレスポンスの融合原則
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777777] hover:text-[#111111] hover:bg-[#f0f0f0] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 text-base text-[#333333]">
          {/* Mission statement */}
          <div className="border-l-3 border-[#111111] pl-6 py-2">
            <p className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#111111] mb-2">
              安っぽい煽りチラシは店を殺し、ただ綺麗なアート広告は売上を殺す。
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              Elixenceの真髄は、<strong className="text-[#111111] font-bold">「店舗の品格・ブランドの世界観を美しく保ちながら、問い合わせ・予約・来店などの具体的成約行動を極限まで最大化する」</strong>ことにあります。顧客の心にある「不安・疑念・めんどくささ」を3秒で解体し、確実に次の一歩へと導きます。
            </p>
          </div>

          {/* 6 criteria */}
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#111111]">
              3秒で顧客の脳内を貫く 6つの心理関門
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 01
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">自分向けだと分かるか？</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  「女性向け」ではなく「デスクワークで首肩が固まる働く女性」のように解像度を極限まで研ぎ澄ます。
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 02
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">何の店・サービスか分かるか？</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  読めない英字筆記体は即座にスルー。「働く女性のための整体×小顔」と日本語で直撃させる。
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 03
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">信用できる客観証拠があるか？</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  Google口コミ★4.9、延べ18,000人施術、国家資格など、不安を払拭する揺るぎない客観的数字を明記する。
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 04
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">今行く理由があるか？</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  「通常9,800円 → 初回3,980円」「全額返金保証」「先着5名限定」など、心理的リスクをゼロにするオファー。
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 05
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">どこにあるか分かるか？（看板の命）</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  街頭看板で電話番号は誰も打たない。「このビル4F（エレベーター奥）」の物理的誘導が最重要。
                </p>
              </div>

              <div className="p-5 rounded-md bg-[#fafafa] border border-[#e9e9e9]">
                <span className="font-serif-luxury text-xs font-bold text-[#9e7d23] tracking-widest">
                  GATE 06
                </span>
                <h4 className="font-bold text-[#111111] mt-1 text-base sm:text-lg">次に何をすればいいか分かるか？</h4>
                <p className="text-sm sm:text-base text-[#555555] mt-1.5 leading-relaxed">
                  「LINEから即時空き枠確認」「WEB予約24時間受付」など、一歩目を極小化するCTAを設置する。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e9e9e9] flex justify-end bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-md bg-[#111111] text-white hover:bg-[#252525] font-bold text-sm transition-all cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
