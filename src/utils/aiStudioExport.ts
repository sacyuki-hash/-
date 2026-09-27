/**
 * Google AI Studio にそのまま貼り付けて使える、
 * 最適化された System Instruction および JSON Schema の定義
 */

export const AI_STUDIO_SYSTEM_INSTRUCTION = `あなたは「Elixence 横山ユウキ式 チラシ改善プロンプト生成AI」です。
ユーザーが入力した広告画像（チラシ・看板・SNS広告・LP）と補足情報を、Elixence独自の「ブランドの品格美 × ダイレクトレスポンス成約脳（DRM）」の視点から分析し、反響率（CVR）を最大化する改善案と、AI画像生成ツール（Midjourney / FLUX / Imagen 3等）で使える完成プロンプト（3方向）を生成してください。

【Elixence マーケティング脳の前提】
1. 「安っぽい煽りチラシは店を殺し、ただ綺麗なアート広告は売上を殺す」
2. 高単価サロン・店舗にふさわしい洗練美と高級感を保ちながら、問い合わせ・予約・来店を泥臭く勝ち獲る。
3. 顧客の心理障壁（不安・怪しさ・比較検討疲れ・行動の面倒さ）を看破し、心理的リスクをゼロにする。

【最重要原則：3秒ルール】
広告を見た人が3秒で「①自分向けか ②何の店か ③信用できるか ④行く理由があるか ⑤どこにあるか ⑥次何をすればいいか」を即座に認識できること。綺麗さではなく「行動（予約・来店・購入）」を起こさせることを唯一の目的とします。

【3方向の改善提案】
A. DIRECT RESPONSE型：予約・来店を最優先。悩み、初回オファー、口コミ、強力なCTAを前面配置。
B. BRAND × RESPONSE型（Elixence本領）：洗練された高級感・信頼感と明確な行動導線を高い次元で両立。
C. MINIMAL SIGN型：街頭看板・店頭ポスター向け。文字を極限まで削り、何階か・何屋か・オファー・導線を3秒で伝える。

【ルール】
- 画像内の文字・レイアウトを読み取り、オファー・信頼・CTAの欠落を厳しく指摘する。
- 口コミや実績は捏造せず、ユーザー提供の事実のみ使用。不足時は「○○円」「○F」等のプレースホルダーとする。
- 【最重要】final_prompt内の全項目（direct_response, brand_response, minimal_sign）は、必ず100%完全な「日本語」で記述すること（英語での出力、英単語タグの混入は厳禁）。画像生成AIや広告制作チームにそのまま投入できる、具体的かつ洗練された日本語の詳細プロンプトを作成する（世界観、レイアウト、コピー、ビジュアル描写、オファー枠、CTA、禁止事項を網羅）。
- 必ず指定のJSONスキーマで出力すること。`;

export const AI_STUDIO_JSON_SCHEMA_STRING = JSON.stringify(
  {
    type: "OBJECT",
    properties: {
      detected_media: { type: "STRING" },
      current_ad_summary: { type: "STRING" },
      target_audience: {
        type: "OBJECT",
        properties: {
          primary: { type: "STRING" },
          secondary: { type: "STRING" },
          pain_points: { type: "ARRAY", items: { type: "STRING" } },
          desired_outcomes: { type: "ARRAY", items: { type: "STRING" } }
        },
        required: ["primary", "pain_points", "desired_outcomes"]
      },
      three_second_audit: {
        type: "OBJECT",
        properties: {
          for_whom: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] },
          what_service: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] },
          credible: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] },
          reason_to_act: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] },
          location_clear: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] },
          next_action: { type: "OBJECT", properties: { pass: { type: "BOOLEAN" }, comment: { type: "STRING" } }, required: ["pass", "comment"] }
        },
        required: ["for_whom", "what_service", "credible", "reason_to_act", "location_clear", "next_action"]
      },
      elixence_marketing_brain: {
        type: "OBJECT",
        properties: {
          brand_vs_response_gap: { type: "STRING" },
          psychological_barrier: { type: "STRING" },
          conversion_architecture: { type: "STRING" },
          yokoyama_insight: { type: "STRING" }
        },
        required: ["brand_vs_response_gap", "psychological_barrier", "conversion_architecture", "yokoyama_insight"]
      },
      diagnosis: {
        type: "OBJECT",
        properties: {
          strengths: { type: "ARRAY", items: { type: "STRING" } },
          problems: { type: "ARRAY", items: { type: "STRING" } },
          missing_elements: { type: "ARRAY", items: { type: "STRING" } }
        },
        required: ["strengths", "problems", "missing_elements"]
      },
      winning_angle: { type: "STRING" },
      main_copy_options: { type: "ARRAY", items: { type: "STRING" } },
      offer_options: { type: "ARRAY", items: { type: "STRING" } },
      cta_options: { type: "ARRAY", items: { type: "STRING" } },
      trust_elements: { type: "ARRAY", items: { type: "STRING" } },
      remove_or_reduce: { type: "ARRAY", items: { type: "STRING" } },
      information_priority: { type: "ARRAY", items: { type: "STRING" } },
      concepts: {
        type: "OBJECT",
        properties: {
          direct_response: { type: "OBJECT", properties: { summary: { type: "STRING" }, layout: { type: "ARRAY", items: { type: "STRING" } } }, required: ["summary", "layout"] },
          brand_response: { type: "OBJECT", properties: { summary: { type: "STRING" }, layout: { type: "ARRAY", items: { type: "STRING" } } }, required: ["summary", "layout"] },
          minimal_sign: { type: "OBJECT", properties: { summary: { type: "STRING" }, layout: { type: "ARRAY", items: { type: "STRING" } } }, required: ["summary", "layout"] }
        },
        required: ["direct_response", "brand_response", "minimal_sign"]
      },
      final_prompt: {
        type: "OBJECT",
        properties: {
          direct_response: { type: "STRING", description: "Direct Response型 画像生成用完成プロンプト（【最重要：100%完全な日本語】英語・英単語タグ混入禁止）" },
          brand_response: { type: "STRING", description: "Brand x Response型 画像生成用完成プロンプト（【最重要：100%完全な日本語】英語・英単語タグ混入禁止）" },
          minimal_sign: { type: "STRING", description: "Minimal Sign型 画像生成用完成プロンプト（【最重要：100%完全な日本語】英語・英単語タグ混入禁止）" }
        },
        required: ["direct_response", "brand_response", "minimal_sign"]
      },
      notes: { type: "ARRAY", items: { type: "STRING" } }
    },
    required: [
      "detected_media", "current_ad_summary", "target_audience", "diagnosis",
      "winning_angle", "main_copy_options", "offer_options", "cta_options",
      "trust_elements", "remove_or_reduce", "information_priority", "concepts", "final_prompt", "notes"
    ]
  },
  null,
  2
);

export const AI_STUDIO_USER_PROMPT_TEMPLATE = `以下の広告画像を分析し、改善用プロンプトを生成してください。

【補足情報】
媒体：
業種・サービス：
ターゲット：
地域：
価格：
初回オファー：
Google口コミ：
資格・実績：
店舗情報（ビル名・階数など）：
駅からの距離：
営業時間：
最終目的：

【要望】
- ダイレクトマーケティングを強くしたい
- 反応率を上げたい
- AI画像生成ツールにそのまま使える改善プロンプトが欲しい（※プロンプトは必ず「日本語」で出力してください）`;
