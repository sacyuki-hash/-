import { AdPreset } from '../types/adDiagnosis';

// Preset 1: 恵比寿の隠れ家整体サロン看板（典型的な「雰囲気オシャレだが何屋か何階か不明な看板」）
const signSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a2725"/>
      <stop offset="100%" stop-color="#141312"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#aa820a"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="600" height="900" fill="url(#bg)"/>
  <rect x="25" y="25" width="550" height="850" fill="none" stroke="url(#gold)" stroke-width="2" rx="8"/>
  <rect x="35" y="35" width="530" height="830" fill="none" stroke="#443f3b" stroke-width="1" rx="4"/>
  
  <!-- Header / Minimalist French -->
  <text x="300" y="120" font-family="'Times New Roman', serif" font-size="16" fill="#aa820a" text-anchor="middle" letter-spacing="6">ESTHÉTIQUE &amp; RELAXATION</text>
  <line x1="200" y1="140" x2="400" y2="140" stroke="#aa820a" stroke-width="1"/>
  
  <!-- Brand Name in Cursive -->
  <text x="300" y="220" font-family="'Georgia', serif" font-style="italic" font-size="44" fill="#eedc9a" text-anchor="middle">Salon de Beauté</text>
  <text x="300" y="260" font-family="sans-serif" font-size="14" fill="#a09b95" text-anchor="middle" letter-spacing="4">E B I S U</text>
  
  <!-- Center Decorative Leaf / Abstract Art -->
  <g transform="translate(260, 320)">
    <circle cx="40" cy="40" r="38" fill="none" stroke="#aa820a" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M40,10 C55,25 65,45 65,65 C45,65 25,55 15,40 C15,25 25,15 40,10 Z" fill="#aa820a" opacity="0.6"/>
  </g>
  
  <!-- Vague Japanese Tagline -->
  <text x="300" y="450" font-family="'Noto Sans JP', sans-serif" font-size="18" fill="#e8e2d8" text-anchor="middle" font-weight="300">極上の癒しと、美しさをあなたに。</text>
  <text x="300" y="490" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#8f8983" text-anchor="middle">完全予約制・大人のプライベートサロン</text>

  <!-- Menu Preview (Vague) -->
  <rect x="80" y="540" width="440" height="150" fill="#201d1b" rx="6" stroke="#3b3734" stroke-width="1"/>
  <text x="120" y="580" font-family="sans-serif" font-size="15" fill="#d4af37">■ Body Care Course</text>
  <text x="470" y="580" font-family="sans-serif" font-size="15" fill="#eedc9a" text-anchor="end">¥12,000〜</text>
  <text x="120" y="620" font-family="sans-serif" font-size="15" fill="#d4af37">■ Facial Esthetic</text>
  <text x="470" y="620" font-family="sans-serif" font-size="15" fill="#eedc9a" text-anchor="end">¥9,800〜</text>
  <text x="120" y="660" font-family="sans-serif" font-size="15" fill="#d4af37">■ Special Osteopathy</text>
  <text x="470" y="660" font-family="sans-serif" font-size="15" fill="#eedc9a" text-anchor="end">¥15,000〜</text>

  <!-- Ambiguous Location & QR without instruction -->
  <rect x="250" y="730" width="100" height="100" fill="#ffffff" rx="4"/>
  <rect x="260" y="740" width="30" height="30" fill="#141312"/>
  <rect x="310" y="740" width="30" height="30" fill="#141312"/>
  <rect x="260" y="790" width="30" height="30" fill="#141312"/>
  <rect x="300" y="780" width="20" height="20" fill="#141312"/>
  <rect x="325" y="805" width="15" height="15" fill="#141312"/>
  
  <text x="300" y="860" font-family="sans-serif" font-size="12" fill="#75706a" text-anchor="middle">RESERVATION &amp; ACCESS</text>
</svg>`;

// Preset 2: 武蔵小杉のパーソナルジムチラシ（典型的な「情報詰め込みすぎ・オファーが弱いチラシ」）
const flyerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="600" height="850">
  <rect width="600" height="850" fill="#f8fafc"/>
  
  <!-- Header Bar -->
  <rect width="600" height="90" fill="#0f172a"/>
  <text x="30" y="45" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#38bdf8" font-weight="bold">武蔵小杉駅北口徒歩3分 / 完全個室</text>
  <text x="30" y="75" font-family="sans-serif" font-size="28" fill="#ffffff" font-weight="900">BodyCraft FITNESS</text>
  
  <!-- Weak Catchphrase -->
  <rect x="30" y="110" width="540" height="60" fill="#e0f2fe" rx="6"/>
  <text x="300" y="145" font-family="'Noto Sans JP', sans-serif" font-size="20" fill="#0369a1" font-weight="800" text-anchor="middle">初心者から本格派まで！理想の身体づくりをサポート</text>
  
  <!-- Cluttered 3 Feature Blocks -->
  <g transform="translate(30, 190)">
    <rect width="170" height="180" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="85" y="35" font-family="'Noto Sans JP', sans-serif" font-size="15" fill="#0f172a" font-weight="bold" text-anchor="middle">特徴①</text>
    <text x="85" y="60" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2563eb" font-weight="bold" text-anchor="middle">完全オーダーメイド</text>
    <text x="15" y="90" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#475569">あなたの骨格と生活リズムに合わせたトレーニングメニューを提案。無理なく続けられます。</text>
    <rect x="35" y="135" width="100" height="30" fill="#f1f5f9" rx="4"/>
    <text x="85" y="155" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#64748b" text-anchor="middle">食事指導付き</text>
  </g>
  
  <g transform="translate(215, 190)">
    <rect width="170" height="180" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="85" y="35" font-family="'Noto Sans JP', sans-serif" font-size="15" fill="#0f172a" font-weight="bold" text-anchor="middle">特徴②</text>
    <text x="85" y="60" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2563eb" font-weight="bold" text-anchor="middle">最新トレーニングマシン</text>
    <text x="15" y="90" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#475569">国内外から厳選した高性能マシンを完備。初心者でも安全かつ効果的にトレーニング可能。</text>
    <rect x="35" y="135" width="100" height="30" fill="#f1f5f9" rx="4"/>
    <text x="85" y="155" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#64748b" text-anchor="middle">アメニティ完備</text>
  </g>
  
  <g transform="translate(400, 190)">
    <rect width="170" height="180" fill="#ffffff" stroke="#cbd5e1" rx="6"/>
    <text x="85" y="35" font-family="'Noto Sans JP', sans-serif" font-size="15" fill="#0f172a" font-weight="bold" text-anchor="middle">特徴③</text>
    <text x="85" y="60" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2563eb" font-weight="bold" text-anchor="middle">有資格トレーナー在籍</text>
    <text x="15" y="90" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#475569">NSCA資格等を持つプロが親切丁寧にサポート。モチベーション維持もお任せください。</text>
    <rect x="35" y="135" width="100" height="30" fill="#f1f5f9" rx="4"/>
    <text x="85" y="155" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#64748b" text-anchor="middle">手ぶらOK</text>
  </g>

  <!-- Overly Complicated Pricing Table -->
  <rect x="30" y="390" width="540" height="230" fill="#ffffff" stroke="#e2e8f0" rx="8"/>
  <text x="50" y="425" font-family="'Noto Sans JP', sans-serif" font-size="18" fill="#0f172a" font-weight="bold">■ 料金プラン一覧（税込）</text>
  <line x1="50" y1="440" x2="550" y2="440" stroke="#cbd5e1"/>
  
  <text x="60" y="475" font-family="sans-serif" font-size="14" fill="#334155">・入会金：¥33,000</text>
  <text x="60" y="505" font-family="sans-serif" font-size="14" fill="#334155">・月4回コース（50分）：¥44,000 / 月</text>
  <text x="60" y="535" font-family="sans-serif" font-size="14" fill="#334155">・月8回コース（50分）：¥80,000 / 月</text>
  <text x="60" y="565" font-family="sans-serif" font-size="14" fill="#334155">・短期集中2ヶ月コース（全16回）：¥198,000</text>
  <text x="60" y="595" font-family="sans-serif" font-size="11" fill="#94a3b8">※登録事務手数料3,300円が別途かかります。休会・退会規約はHPをご確認ください。</text>

  <!-- Small Weak Offer at bottom -->
  <rect x="30" y="640" width="540" height="90" fill="#fef2f2" stroke="#f87171" stroke-dasharray="4 4" rx="8"/>
  <text x="300" y="675" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#b91c1c" font-weight="bold" text-anchor="middle">【チラシ持参の方限定】体験レッスン 5,000円 → 3,000円！</text>
  <text x="300" y="705" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#7f1d1d" text-anchor="middle">有効期限：今月末まで / お電話でお伝えください</text>

  <!-- Generic Footer with Tiny Phone -->
  <rect x="0" y="750" width="600" height="100" fill="#1e293b"/>
  <text x="300" y="785" font-family="sans-serif" font-size="18" fill="#ffffff" font-weight="bold" text-anchor="middle">TEL: 03-XXXX-XXXX（受付 10:00〜21:00）</text>
  <text x="300" y="815" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">神奈川県川崎市中原区小杉町X-XX ○○ビル</text>
</svg>`;

// Preset 3: 渋谷のセルフホワイトニングSNS広告（雰囲気重視で安心要素・価格・ベネフィット欠如）
const snsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="pastel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfeff"/>
      <stop offset="100%" stop-color="#cffafe"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#pastel)"/>
  
  <!-- Clean Aesthetic Glow -->
  <circle cx="300" cy="220" r="160" fill="#ffffff" opacity="0.8"/>
  <circle cx="300" cy="220" r="130" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 6"/>
  
  <!-- Tooth / Smile Illustration -->
  <path d="M260,190 C260,160 340,160 340,190 C340,230 330,270 315,270 C305,270 300,240 295,240 C290,240 285,270 275,270 C260,270 260,230 260,190 Z" fill="#38bdf8" opacity="0.25"/>
  <text x="300" y="235" font-family="'Georgia', serif" font-size="32" fill="#0284c7" font-weight="bold" text-anchor="middle">PureWhite</text>
  <text x="300" y="260" font-family="sans-serif" font-size="11" fill="#0891b2" letter-spacing="4" text-anchor="middle">WHITENING STUDIO</text>
  
  <!-- Ambiguous Catchphrase -->
  <text x="300" y="380" font-family="'Noto Sans JP', sans-serif" font-size="26" fill="#0e7490" font-weight="800" text-anchor="middle">白い歯で、もっと笑顔に自信を。</text>
  <text x="300" y="420" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#155e75" text-anchor="middle">痛くない・しみない・最短30分のセルフケア</text>

  <!-- Tag Badges -->
  <g transform="translate(140, 455)">
    <rect width="90" height="30" fill="#ffffff" rx="15" stroke="#67e8f9"/>
    <text x="45" y="20" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#0891b2" text-anchor="middle">渋谷駅すぐ</text>
  </g>
  <g transform="translate(255, 455)">
    <rect width="90" height="30" fill="#ffffff" rx="15" stroke="#67e8f9"/>
    <text x="45" y="20" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#0891b2" text-anchor="middle">ペア利用可</text>
  </g>
  <g transform="translate(370, 455)">
    <rect width="90" height="30" fill="#ffffff" rx="15" stroke="#67e8f9"/>
    <text x="45" y="20" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#0891b2" text-anchor="middle">当日予約◎</text>
  </g>

  <!-- Click Button without Offer -->
  <rect x="180" y="515" width="240" height="50" fill="#0891b2" rx="25"/>
  <text x="300" y="546" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#ffffff" font-weight="bold" text-anchor="middle">詳しくはこちら &gt;</text>
</svg>`;

export const SAMPLE_PRESETS: AdPreset[] = [
  {
    id: 'sign-ebisu',
    name: '【街頭看板】恵比寿の隠れ家整体サロン',
    category: '看板・屋外広告',
    tagline: '英語と雰囲気重視で「何屋か何階か」が通行人に伝わっていない看板',
    imageTitle: 'Salon de Beauté 街頭看板 (恵比寿)',
    imageDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(signSvg)}`,
    metadata: {
      mediaType: '立て看板（A型看板 / ビル入口）',
      industryService: '働く女性向け美容整体・骨盤矯正・小顔サロン',
      target: '20代後半〜40代の恵比寿周辺で働くデスクワーク女性（首肩こり・猫背・顔のむくみ）',
      region: '東京都渋谷区恵比寿',
      price: '通常 1回 9,800円',
      offer: '【初回限定】骨盤矯正×首肩ケア体験 3,980円（全額返金保証・1日3名限定）',
      reviews: 'Google口コミ 4.9（142件）「1回で首の痛みが消えた」「姿勢が良くなった」',
      credentials: '国家資格保有者監修 / 施術実績 延べ18,000人 / モデル・アナウンサー多数来院',
      storeLocation: '恵比寿サニービル 4F（エレベーターあり・1階はカフェ）',
      distanceStation: 'JR恵比寿駅 西口 徒歩2分',
      businessHours: '11:00〜21:30（土日祝も営業・最終受付20:30）',
      finalGoal: '看板のQRからLINE予約（当日予約・即時空き状況確認）',
    },
  },
  {
    id: 'flyer-musashikosugi',
    name: '【ポスティングチラシ】地域密着パーソナルジム',
    category: 'チラシ・ポスティング',
    tagline: '文字が多くオファーが埋もれ、「初心者向け」が伝わっていないチラシ',
    imageTitle: 'BodyCraft FITNESS ポスティングチラシ (武蔵小杉)',
    imageDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(flyerSvg)}`,
    metadata: {
      mediaType: 'ポスト投函チラシ（A4片面）',
      industryService: '運動初心者・産後ママ専門のマンツーマンパーソナルジム',
      target: '30代〜50代の「運動が苦手」「ジムに通ったが続かなかった」武蔵小杉の主婦・会社員',
      region: '神奈川県川崎市武蔵小杉',
      price: '月額 33,000円〜（月4回コース）',
      offer: '【チラシ限定・先着10名】体験トレーニング＋体組成カウンセリング 通常5,000円 → 1,000円（入会金無料特典付き）',
      reviews: 'Google口コミ 4.8（86件）「運動が嫌いだった私でも1年続いた」',
      credentials: '運動指導歴12年 / NESTA認定トレーナー在籍 / 30代〜50代継続率92%',
      storeLocation: 'グランツ武蔵小杉 2F（専用個室・ベビーカー持ち込みOK）',
      distanceStation: '武蔵小杉駅 北口 徒歩3分',
      businessHours: '8:00〜22:00（完全予約制）',
      finalGoal: 'Web予約または公式LINEからの無料カウンセリング予約',
    },
  },
  {
    id: 'sns-whitening',
    name: '【SNS広告】セルフホワイトニング専門店',
    category: 'SNS広告・Instagram',
    tagline: '写真はきれいだが、価格・安心要素・来店理由がなく離脱が多いSNS広告',
    imageTitle: 'PureWhite セルフホワイトニング Instagramフィード広告',
    imageDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(snsSvg)}`,
    metadata: {
      mediaType: 'SNSフィード広告（Instagram / 1:1正方形）',
      industryService: '歯科医監修 痛くないセルフホワイトニングサロン',
      target: '20代〜30代の接客業・婚活中・結婚式を控えた女性および営業職の男性',
      region: '東京都渋谷区（宮下パーク近く）',
      price: '通常 1回 6,600円',
      offer: '【初回限定・Web予約のみ】お試しホワイトニング 1回 2,980円（白さを実感できなければ全額返金）',
      reviews: 'Google口コミ 4.9（210件）「痛みが全くないのに2トーン明るくなった」',
      credentials: '現役歯科医師監修ジェル使用 / 累計来客数 25,000人突破',
      storeLocation: '宮下パーク前 プラザビル 3F',
      distanceStation: 'JR渋谷駅 ハチ公口 徒歩4分',
      businessHours: '10:00〜21:00（年中無休）',
      finalGoal: 'Instagram広告経由のWeb即時予約（空き時間選択カレンダー）',
    },
  },
];
