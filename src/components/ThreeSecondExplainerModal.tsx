import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Target, Zap, Clock } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e1017] border border-[#d4af37]/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] sticky top-0 bg-[#0f1118]/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <span className="font-serif-luxury font-semibold uppercase tracking-wider text-[11px]">
                ELIXENCE MARKETING CONSTITUTION
              </span>
              <span className="text-white/20">/</span>
              <span className="text-white/50 text-[11px]">横山ユウキ式 成約哲学</span>
            </div>
            <h2 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2 mt-0.5 tracking-wide">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              美意識とダイレクトレスポンスの融合原則
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-white/80">
          {/* Mission statement */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-[#211d14]/70 to-[#181611]/80 border border-[#d4af37]/35 text-[#fff9e6]">
            <p className="font-serif-luxury font-bold text-base text-[#f7df94] mb-1.5 tracking-wide">
              安っぽい煽りチラシは店を殺し、ただ綺麗なアート広告は売上を殺す。
            </p>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Elixenceの真髄は、<strong className="text-white font-semibold">「店舗の品格・ブランドの世界観を美しく保ちながら、問い合わせ・予約・来店などの具体的成約行動を極限まで最大化する」</strong>ことにあります。顧客の心にある「不安・疑念・めんどくささ」を3秒で解体し、確実に次の一歩へと導きます。
            </p>
          </div>

          {/* 6 criteria */}
          <div>
            <h3 className="font-serif-luxury text-base font-bold text-white mb-3 flex items-center gap-2 tracking-wide">
              <Target className="w-4 h-4 text-[#d4af37]" />
              3秒で顧客の脳内を貫く 6つの心理関門
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 01</span>
                <h4 className="font-bold text-white mt-1 text-sm">自分向けだと分かるか？</h4>
                <p className="text-xs text-white/60 mt-1">「女性向け」ではなく「長時間のPC作業で首肩が固まる働く女性」のように解像度を極限まで研ぎ澄ます。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 02</span>
                <h4 className="font-bold text-white mt-1 text-sm">何の店・サービスか分かるか？</h4>
                <p className="text-xs text-white/60 mt-1">「Salon de Beauté」のような読めない英字筆記体は即座にスルー。「働く女性のための整体×小顔」と日本語で直撃させる。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 03</span>
                <h4 className="font-bold text-white mt-1 text-sm">信用できる客観証拠があるか？</h4>
                <p className="text-xs text-white/60 mt-1">Google口コミ★4.9、延べ18,000人施術、国家資格など、不安を払拭する揺るぎない客観的事実の数字を明記する。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 04</span>
                <h4 className="font-bold text-white mt-1 text-sm">今行く・行動する理由があるか？</h4>
                <p className="text-xs text-white/60 mt-1">「通常9,800円 → 初回3,980円」「全額返金保証」「先着5名限定」など、心理的リスクをゼロにするオファーアーキテクチャ。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 05</span>
                <h4 className="font-bold text-white mt-1 text-sm">どこにあるか分かるか？（看板の命）</h4>
                <p className="text-xs text-white/60 mt-1">街頭看板で電話番号は誰も打たない。「このビル4F（エレベーター奥）」「右へ徒歩20m」の現在地と階数の物理的誘導が最重要。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <span className="font-serif-luxury text-xs font-bold text-[#d4af37]">GATE 06</span>
                <h4 className="font-bold text-white mt-1 text-sm">次に何をすればいいか分かるか？</h4>
                <p className="text-xs text-white/60 mt-1">「スマホをかざして空き状況確認」「公式LINEから24時間即時予約」など、極小の心理抵抗で指先を動かさせる。</p>
              </div>
            </div>
          </div>

          {/* 3 Directions */}
          <div className="border-t border-white/[0.08] pt-5">
            <h3 className="font-serif-luxury text-base font-bold text-white mb-3 flex items-center gap-2 tracking-wide">
              <Zap className="w-4 h-4 text-[#d4af37]" />
              生成される3方向コンセプトの戦略的役割
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <span className="font-serif-luxury text-xs font-bold text-rose-300">A. DIRECT RESPONSE型</span>
                <p className="text-xs text-white/70 mt-1 font-medium leading-relaxed">成約・予約を最速で最大化。悩み訴求、初回割引、口コミ、限定感、大きなCTAで直ちにコンバージョンを奪取。</p>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#1c1811] to-[#12131a] border border-[#d4af37]/35 shadow-sm">
                <span className="font-serif-luxury text-xs font-bold text-[#f7df94]">B. BRAND × RESPONSE型（Elixence本領）</span>
                <p className="text-xs text-white/80 mt-1 font-medium leading-relaxed">高単価サロンやクリニックの洗練された品格を守りながら、3秒で理解できる行動導線を融合した最高峰のハイブリッド構成。</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <span className="font-serif-luxury text-xs font-bold text-emerald-300">C. MINIMAL SIGN型</span>
                <p className="text-xs text-white/70 mt-1 font-medium leading-relaxed">街頭立て看板・駅ポスター特化。文字を極限まで削り「何屋か・何階か・初回体験価格・QR」を歩行者に3秒で刷り込む。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/[0.08] bg-[#0c0d12] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-xl transition-all hover:brightness-105 text-sm"
          >
            理解した（閉じる）
          </button>
        </div>
      </div>
    </div>
  );
};
