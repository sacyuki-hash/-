import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Allow large image uploads (base64)
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

// Cooldown state tracker for models hitting 429 rate limit or daily quota
const modelCooldowns: Record<string, number> = {};

function isModelCoolingDown(modelName: string): boolean {
  const until = modelCooldowns[modelName];
  if (!until) return false;
  if (Date.now() > until) {
    delete modelCooldowns[modelName];
    return false;
  }
  return true;
}

function markModelCooldown(modelName: string, durationMs: number = 60000) {
  modelCooldowns[modelName] = Date.now() + durationMs;
}

function extractErrorInfo(err: any): { message: string; isRateLimit: boolean; retryAfter: number } {
  const msg = err?.message || String(err);
  let isRateLimit = false;
  let retryAfter = 35;

  if (
    err?.status === 429 ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('quota') ||
    msg.includes('Quota exceeded')
  ) {
    isRateLimit = true;
    const match = msg.match(/retry in ([0-9.]+)s/i);
    if (match) {
      retryAfter = Math.ceil(parseFloat(match[1]));
    }
  }

  if (isRateLimit) {
    return {
      message: `Gemini APIの利用制限（Rate Limit）に達しました。約${retryAfter}秒後に自動または手動で再試行してください。`,
      isRateLimit: true,
      retryAfter,
    };
  }

  // Clean stringified JSON error if present
  let cleanMsg = msg;
  try {
    if (cleanMsg.includes('{') && cleanMsg.includes('}')) {
      const jsonStart = cleanMsg.indexOf('{');
      const jsonEnd = cleanMsg.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(cleanMsg.slice(jsonStart, jsonEnd + 1));
        if (parsed?.error?.message) {
          cleanMsg = parsed.error.message;
        }
      }
    }
  } catch {
    // Keep cleanMsg as is
  }

  return {
    message: cleanMsg.length > 250 ? cleanMsg.slice(0, 250) + '...' : cleanMsg,
    isRateLimit: false,
    retryAfter: 0,
  };
}

// Health and capability check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash / gemini-3.1-flash-lite',
  });
});

// Main Ad Analysis and Prompt Generation Endpoint
app.post('/api/analyze-ad', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in environment variables.',
      });
    }

    const { image, metadata } = req.body;
    if (!image || !image.data) {
      return res.status(400).json({ error: 'Ad image is required.' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `あなたは「Elixence 横山ユウキ式 チラシ改善プロンプト生成AI」です。
あなたの役割は、ユーザーがアップロードしたチラシ・看板・ポスター・SNS広告・LPファーストビューなどの広告画像を分析し、
【Elixence（エリクセンス）マーケティング脳】の観点から構造的な欠陥と成約機会を発見し、
その改善方針をもとに、AI画像生成ツール（Midjourney, FLUX, Imagen 3, Nano Banana等）でそのまま使える「広告改善用完成プロンプト」を自動生成することです。

【Elixence マーケティング脳の前提とコア哲学】
1. 「安っぽい煽りやダサいチラシ」は店舗のブランド価値を毀損し、客単価を下げる。
2. しかし「綺麗なだけの上品なアート作品」は、通行人に1秒でスルーされ売上ゼロで廃業する。
3. Elixenceの真髄は【上質・洗練されたブランドの世界観（美意識・高級感）を保ちながら、ダイレクトレスポンスマーケティング（DRM）の成約力・心理導線をミリ単位で融合させること】にある。
4. 顧客の心理障壁（不安・怪しさ・めんどくささ・痛みの先送り）を科学的に解体し、3秒で「私のための店だ」と確信させ、指先を動かさせる。

あなたは以下の専門家として振る舞ってください：
- Elixence式 ダイレクトレスポンスマーケティング (DRM)
- 高単価店舗（サロン・整体・クリニック・ジム・士業・スクール）の集客最適化
- 女性向け感情マーケティング・心理ライティング
- 高級感と反響率を両立するハイエンド情報設計 (Visual Hierarchy & Z/F Flow)
- 3秒看板導線（街頭通行人を即座にビル内・予約へ誘導する動線設計）
- コンバージョン最適化 (CVR) & オファーアーキテクチャ

【最重要目的】
目的は「きれいな広告を作ること」でも「単に派手な煽り広告を作ること」でもありません。
目的は【店舗の品格を高めながら、問い合わせ・予約・来店・高単価購入などの具体的行動を最大化すること】です。

常に以下を最優先で考えてください：
1. 誰向けか（ターゲットの解像度・悩みと潜在心理）
2. 何のサービスか（一瞬で理解できるか・専門性の旗振り）
3. どんな悩みを解決するのか（ペインと欲しい未来・ベネフィット）
4. なぜ信用できるのか（客観的証拠・Google口コミ・実績・有資格・清潔感）
5. なぜ今行動すべきか（初回オファー・限定感・全額返金保証などのリスクリバーサル）
6. 次に何をすればよいか（電話/LINE/Web予約/ビル階数・地図導線）

【最終判断基準（Elixence式 3秒ルール）】
「この広告を街頭やSNSで3秒見た人は、
- 自分向けだと分かるか？
- 何の店／サービスか分かるか？
- 信用できるか？（怪しさ・不安の解消）
- 今行く理由があるか？（オファーとリスク排除）
- どこにあるか分かるか？（看板ならビル名・階数）
- 次に何をすればいいか分かるか？（行動導線）」
この6基準を厳しく自己採点し、問題点を抉り出してください。

【3方向の改善コンセプト】
A. DIRECT RESPONSE型: 問い合わせ・予約を最優先。悩み訴求、口コミ、価格、特典、CTAを強める。
B. BRAND × RESPONSE型（Elixence本領）: ブランド感と反応獲得の極致。品格と信頼感を極めながら行動導線を明快にする。
C. MINIMAL SIGN型: 超シンプル看板向け。文字を最小限にし、3秒で伝わる構成にする（何階か、何屋か、オファー、矢印/QR）。

【最重要要件：画像生成用プロンプト（final_prompt内の全項目）は100%日本語で出力すること】
final_promptの全プロパティ（direct_response, brand_response, minimal_sign）は、例外なく【100%完全な日本語】で記述してください。
・英語での出力、英単語の混入、英語タグのカンマ区切り（例: "8k, photorealistic, cinematic lighting, aspect ratio 16:9, modern aesthetic" など）は【一切禁止】です。
・AI画像生成ツール（Midjourney, FLUX, Imagen 3, Nano Banana等）に日本語でそのまま入力できる形式、または広告制作デザイナー・クリエイティブチームにそのまま渡して完全再現できる、極めて具体的かつ詳細な「日本語の長文プロンプト」を作成してください。

プロンプト内には必ず以下の項目を日本語の見出しをつけて構造化し、詳細に描写してください：
1. 【全体の世界観・トーン＆マナー】：高単価・洗練・清潔感・信頼感の具体的な空気感、カラーパレット（メイン色・アクセント色の日本語指定）、照明・質感（安っぽい煽りやけばけばしい蛍光色は完全排除）。
2. 【レイアウト構造と視線誘導】：画面上部から下部への視線誘導（Zの法則 / Fの法則）に沿った配置設計。
3. 【コピー・文字要素（すべて日本語で具体的に指定）】：
   - メインキャッチコピー（具体的な日本語テキスト、フォントスタイル指定：洗練明朝体、力強いモダンゴシック体など）
   - サブコピー・ターゲット呼びかけ文言（具体的な日本語テキスト）
   - 初回限定オファー枠（具体的な価格、割引率、限定条件、返金保証の文言と枠デザイン）
   - 信頼要素（Google口コミ★4.9、施術実績数、有資格者バッジなどの日本語表記）
   - 行動喚起CTAボタン（具体的な日本語テキスト：「LINEから24時間即時予約」「今すぐ空き枠を確認する」等、ボタンの配色・階数・QRコード配置）
4. 【メインビジュアルの詳細描写（日本語）】：被写体の人物像（年齢層、表情、清潔感）、施術風景や利用シーン、背景のインテリア（高級サロン、清潔な個室等）、光の差し込み方などを日本語で詳細に描写。
5. 【ネガティブ指定・禁止事項（日本語）】：安っぽいチラシ感、けばけばしい原色、不自然な作り笑顔のストック写真、低解像度フォント、意味のない英語装飾、情報過多の排除。

【重要ルール】
- 画像内のテキストは可能な限り読み取り、構造的に把握する。
- デザインだけでなく、オファー・信頼・CTAの不足を優先して指摘する。
- 補足情報が不足している場合は、推測しすぎず「○○円」「○F」「徒歩○分」「○名限定」などのプレースホルダーまたは合理的な想定値として扱い、notesに整理する。
- Google口コミや資格などの事実情報は、ユーザーが提供したものだけ使う。捏造は厳禁。
- 看板の場合、電話番号よりも階数・方向・位置導線を優先してよい。
- 出力は必ず指定されたJSONフォーマットを遵守すること。`;

    const userPromptText = `以下の広告画像を分析し、横山ユウキ式ダイレクトマーケティングの観点から改善方針と画像生成用プロンプトを生成してください。

【ユーザー提供の補足情報】
- 媒体: ${metadata?.mediaType || '未指定（画像から判定してください）'}
- 業種・サービス: ${metadata?.industryService || '未指定（画像から判定してください）'}
- ターゲット: ${metadata?.target || '未指定（画像から推測してください）'}
- 地域: ${metadata?.region || '未指定'}
- 価格: ${metadata?.price || '未指定'}
- 初回オファー: ${metadata?.offer || '未指定'}
- Google口コミ: ${metadata?.reviews || '未指定'}
- 資格・実績: ${metadata?.credentials || '未指定'}
- 店舗情報（ビル名・階数など）: ${metadata?.storeLocation || '未指定'}
- 駅からの距離: ${metadata?.distanceStation || '未指定'}
- 営業時間: ${metadata?.businessHours || '未指定'}
- 最終目的: ${metadata?.finalGoal || '未指定（予約・来店・問い合わせなど）'}

【要望】
- ダイレクトマーケティングを強くしたい
- 反応率を上げたい
- AI画像生成ツールにそのまま使える改善プロンプトが欲しい（※最重要：final_prompt内の全項目を含め、英語は一切使わず、100%完全な日本語で出力してください。英単語タグやカンマ区切りの英語プロンプトは厳禁です）
- 3方向（DIRECT RESPONSE型 / BRAND × RESPONSE型 / MINIMAL SIGN型）の具体的提案を作成してください。`;

    // Extract base64 payload cleanly
    let base64Data = image.data;
    let mimeType = image.mimeType || 'image/jpeg';
    if (base64Data.includes(';base64,')) {
      const parts = base64Data.split(';base64,');
      mimeType = parts[0].replace('data:', '') || mimeType;
      base64Data = parts[1];
    }

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: userPromptText,
    };

    // Determine model cascade (prefer non-cooling-down models)
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let modelsToTry = candidateModels.filter((m) => !isModelCoolingDown(m));
    if (modelsToTry.length === 0) {
      // If both cooled down, use gemini-3.1-flash-lite as primary high-throughput model
      modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    }

    let lastError: any = null;
    let responseText: string | null = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`[AdAnalysis] Invoking Gemini model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts: [imagePart, textPart] },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  detected_media: {
                    type: Type.STRING,
                    description: '検出された広告媒体（チラシ、立て看板、壁面ポスター、SNS広告、LPファーストビューなど）',
                  },
                  current_ad_summary: {
                    type: Type.STRING,
                    description: '現状の広告の全体印象と現在の構成内容の要約',
                  },
                  target_audience: {
                    type: Type.OBJECT,
                    properties: {
                      primary: { type: Type.STRING, description: 'メインターゲット（年齢・性別・職業・生活シーン）' },
                      secondary: { type: Type.STRING, description: 'サブターゲット' },
                      pain_points: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'ターゲットが抱える切実な悩み・ペインポイント',
                      },
                      desired_outcomes: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'ターゲットが本当に手に入れたい未来・ベネフィット',
                      },
                    },
                    required: ['primary', 'pain_points', 'desired_outcomes'],
                  },
                  three_second_audit: {
                    type: Type.OBJECT,
                    properties: {
                      for_whom: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                      what_service: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                      credible: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                      reason_to_act: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                      location_clear: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                      next_action: {
                        type: Type.OBJECT,
                        properties: { pass: { type: Type.BOOLEAN }, score: { type: Type.INTEGER }, comment: { type: Type.STRING } },
                        required: ['pass', 'comment'],
                      },
                    },
                    required: ['for_whom', 'what_service', 'credible', 'reason_to_act', 'location_clear', 'next_action'],
                  },
                  diagnosis: {
                    type: Type.OBJECT,
                    properties: {
                      strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                      problems: { type: Type.ARRAY, items: { type: Type.STRING } },
                      missing_elements: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['strengths', 'problems', 'missing_elements'],
                  },
                  elixence_marketing_brain: {
                    type: Type.OBJECT,
                    properties: {
                      brand_vs_response_gap: {
                        type: Type.STRING,
                        description: 'ブランドの品格とダイレクトレスポンスの成約力の乖離（なぜスルーされるか、またはなぜ安っぽく見えるかの本質的看破）',
                      },
                      psychological_barrier: {
                        type: Type.STRING,
                        description: 'ターゲット顧客の最大の心理的障壁・先送り理由（不安、高そう、怪しい、効果への疑念など）',
                      },
                      conversion_architecture: {
                        type: Type.STRING,
                        description: 'Elixence式成約アーキテクチャ（どう感情を動かして予約ボタン/来店に導くか）',
                      },
                      executive_verdict: {
                        type: Type.STRING,
                        description: '横山ユウキ直伝の核心アドバイス・総評（1文の研ぎ澄まされた格言）',
                      },
                    },
                    required: ['brand_vs_response_gap', 'psychological_barrier', 'conversion_architecture', 'executive_verdict'],
                  },
                  winning_angle: {
                    type: Type.STRING,
                    description: '最も強く訴求すべき唯一無二の勝ち筋（ポジショニング）',
                  },
                  main_copy_options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '推奨メインキャッチコピー案（3案）',
                  },
                  offer_options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '推奨初回オファー・特典案',
                  },
                  cta_options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '推奨CTA（コール・トゥ・アクション）案（3案）',
                  },
                  trust_elements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '掲載すべき信用・安心要素（口コミ、実績、資格、写真など）',
                  },
                  remove_or_reduce: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '削るべきノイズ情報・装飾',
                  },
                  information_priority: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '情報の優先順位（1位〜5位）',
                  },
                  concepts: {
                    type: Type.OBJECT,
                    properties: {
                      direct_response: {
                        type: Type.OBJECT,
                        properties: {
                          summary: { type: Type.STRING },
                          layout: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['summary', 'layout'],
                      },
                      brand_response: {
                        type: Type.OBJECT,
                        properties: {
                          summary: { type: Type.STRING },
                          layout: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['summary', 'layout'],
                      },
                      minimal_sign: {
                        type: Type.OBJECT,
                        properties: {
                          summary: { type: Type.STRING },
                          layout: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ['summary', 'layout'],
                      },
                    },
                    required: ['direct_response', 'brand_response', 'minimal_sign'],
                  },
                  final_prompt: {
                    type: Type.OBJECT,
                    properties: {
                      direct_response: {
                        type: Type.STRING,
                        description:
                          'Direct Response型 画像生成用完成プロンプト。【最重要：100%完全な日本語】英語での出力や英単語タグの混入は一切禁止。詳細な情景・レイアウト・コピー・オファー・除外要素をすべて具体的な日本語で記述すること。',
                      },
                      brand_response: {
                        type: Type.STRING,
                        description:
                          'Brand x Response型 画像生成用完成プロンプト。【最重要：100%完全な日本語】英語での出力や英単語タグの混入は一切禁止。詳細な情景・レイアウト・コピー・オファー・除外要素をすべて具体的な日本語で記述すること。',
                      },
                      minimal_sign: {
                        type: Type.STRING,
                        description:
                          'Minimal Sign型 画像生成用完成プロンプト。【最重要：100%完全な日本語】英語での出力や英単語タグの混入は一切禁止。詳細な情景・レイアウト・コピー・オファー・除外要素をすべて具体的な日本語で記述すること。',
                      },
                    },
                    required: ['direct_response', 'brand_response', 'minimal_sign'],
                  },
                  notes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '補足メモ・不足情報の整理・実行時の注意点',
                  },
                },
                required: [
                  'detected_media',
                  'current_ad_summary',
                  'target_audience',
                  'diagnosis',
                  'winning_angle',
                  'main_copy_options',
                  'offer_options',
                  'cta_options',
                  'trust_elements',
                  'remove_or_reduce',
                  'information_priority',
                  'concepts',
                  'final_prompt',
                  'notes',
                ],
              },
            },
          });

          if (response.text) {
            responseText = response.text;
            console.log(`[AdAnalysis] Successfully generated diagnosis with ${modelName}`);
            break;
          }
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || String(err);
          const is429 =
            err?.status === 429 ||
            errMsg.includes('429') ||
            errMsg.includes('RESOURCE_EXHAUSTED') ||
            errMsg.includes('Quota exceeded');

          console.warn(`[AdAnalysis] Model ${modelName} failed (is429=${is429}):`, errMsg);

          if (is429) {
            // Mark cooldown and immediately skip to next candidate model
            const cooldownDuration = errMsg.includes('PerDay') ? 10 * 60 * 1000 : 40 * 1000;
            markModelCooldown(modelName, cooldownDuration);
            continue;
          }

          // For transient non-429 errors, try a single quick retry after 800ms
          try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            const retryResponse = await ai.models.generateContent({
              model: modelName,
              contents: { parts: [imagePart, textPart] },
              config: {
                systemInstruction,
                responseMimeType: 'application/json',
              },
            });
            if (retryResponse.text) {
              responseText = retryResponse.text;
              console.log(`[AdAnalysis] Succeeded on retry with ${modelName}`);
              break;
            }
          } catch (retryErr: any) {
            lastError = retryErr;
            console.warn(`[AdAnalysis] Retry on ${modelName} also failed:`, retryErr?.message || retryErr);
          }
        }
      }

      if (!responseText) {
        const errorInfo = extractErrorInfo(lastError);
        return res.status(errorInfo.isRateLimit ? 429 : 500).json({
          success: false,
          error: errorInfo.message,
          isRateLimit: errorInfo.isRateLimit,
          retryAfter: errorInfo.retryAfter,
        });
      }

      const parsedData = JSON.parse(responseText);
      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Error analyzing ad with Gemini:', error);
      const errorInfo = extractErrorInfo(error);
      return res.status(errorInfo.isRateLimit ? 429 : 500).json({
        success: false,
        error: errorInfo.message,
        isRateLimit: errorInfo.isRateLimit,
        retryAfter: errorInfo.retryAfter,
      });
    }
});

// Setup Vite in Dev or static serve in Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
