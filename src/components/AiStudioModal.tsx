import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Braces, Sparkles, Terminal } from 'lucide-react';
import {
  AI_STUDIO_SYSTEM_INSTRUCTION,
  AI_STUDIO_JSON_SCHEMA_STRING,
  AI_STUDIO_USER_PROMPT_TEMPLATE,
} from '../utils/aiStudioExport';

interface AiStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiStudioModal: React.FC<AiStudioModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'instruction' | 'schema' | 'userPrompt' | 'code'>(
    'instruction'
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const nodeCodeExample = `import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: [
    {
      inlineData: {
        data: base64AdImage,
        mimeType: "image/jpeg"
      }
    },
    {
      text: "広告画像を分析し、横山ユウキ式DRM改善案と画像生成用プロンプトを生成してください。"
    }
  ],
  config: {
    systemInstruction: \`${AI_STUDIO_SYSTEM_INSTRUCTION.replace(/`/g, '\\`')}\`,
    responseMimeType: "application/json",
    // responseSchema: ... (See JSON Schema tab)
  }
});

console.log(response.text);`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f1118] border border-white/[0.1] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#12141e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center">
              <FileCode className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af37]">
                <span className="font-serif-luxury font-semibold uppercase tracking-wider text-[11px]">
                  AI STUDIO SYSTEM SPECIFICATION
                </span>
              </div>
              <h2 className="font-serif-luxury text-base sm:text-lg font-bold text-white tracking-wide">
                Google AI Studio 連携用 指示文＆JSONスキーマ
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-white/[0.08] bg-[#0c0d12] px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('instruction')}
            className={`px-4 py-2.5 text-xs font-serif-luxury font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'instruction'
                ? 'border-[#d4af37] text-[#f7df94] bg-[#0f1118]'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            ① System Instructions (Elixence完成版)
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2.5 text-xs font-serif-luxury font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'schema'
                ? 'border-[#d4af37] text-[#f7df94] bg-[#0f1118]'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <Braces className="w-3.5 h-3.5" />
            ② JSON Schema (Structured Output)
          </button>
          <button
            onClick={() => setActiveTab('userPrompt')}
            className={`px-4 py-2.5 text-xs font-serif-luxury font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'userPrompt'
                ? 'border-[#d4af37] text-[#f7df94] bg-[#0f1118]'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            ③ ユーザー入力テンプレート
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs font-serif-luxury font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'code'
                ? 'border-[#d4af37] text-[#f7df94] bg-[#0f1118]'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            ④ Node.js / TypeScript実装
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#090a0f] font-mono text-xs">
          {activeTab === 'instruction' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 font-sans text-xs">
                  AI Studioの「System Instructions」欄に貼り付けます
                </span>
                <button
                  onClick={() => handleCopy(AI_STUDIO_SYSTEM_INSTRUCTION, 'instruction')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-lg transition-colors text-xs font-sans shadow"
                >
                  {copiedKey === 'instruction' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> 指示文をコピー
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-xl bg-[#0e1017] border border-white/[0.08] text-white/80 whitespace-pre-wrap leading-relaxed">
                {AI_STUDIO_SYSTEM_INSTRUCTION}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 font-sans text-xs">
                  AI Studioの「Structured Output (JSON Schema)」に貼り付けます
                </span>
                <button
                  onClick={() => handleCopy(AI_STUDIO_JSON_SCHEMA_STRING, 'schema')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-lg transition-colors text-xs font-sans shadow"
                >
                  {copiedKey === 'schema' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> スキーマJSONをコピー
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-xl bg-[#0e1017] border border-white/[0.08] text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {AI_STUDIO_JSON_SCHEMA_STRING}
              </pre>
            </div>
          )}

          {activeTab === 'userPrompt' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 font-sans text-xs">
                  画像と共に送信する補足情報の入力フォーマットです
                </span>
                <button
                  onClick={() => handleCopy(AI_STUDIO_USER_PROMPT_TEMPLATE, 'userPrompt')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-lg transition-colors text-xs font-sans shadow"
                >
                  {copiedKey === 'userPrompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> テンプレートをコピー
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-xl bg-[#0e1017] border border-white/[0.08] text-[#f7df94] whitespace-pre-wrap leading-relaxed">
                {AI_STUDIO_USER_PROMPT_TEMPLATE}
              </pre>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 font-sans text-xs">
                  @google/genai TypeScript SDK による呼び出しコード例
                </span>
                <button
                  onClick={() => handleCopy(nodeCodeExample, 'code')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3d98c] text-[#0c0d12] font-serif-luxury font-bold rounded-lg transition-colors text-xs font-sans shadow"
                >
                  {copiedKey === 'code' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> コードをコピー
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-xl bg-[#0e1017] border border-white/[0.08] text-sky-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {nodeCodeExample}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0c0d12] flex justify-between items-center text-xs text-white/40">
          <span>モデル推奨：gemini-flash-latest / gemini-3.8-flash（速度・マルチモーダル対応に最適）</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 font-medium rounded-lg transition-colors font-sans border border-white/[0.08]"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
