import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, ShieldCheck, ExternalLink, X, Check, Trash2, Sparkles } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, removeStoredApiKey } from '../utils/geminiClient';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: (key: string) => void;
  initialNotice?: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
  initialNotice,
}) => {
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [currentSavedKey, setCurrentSavedKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredApiKey();
      setKeyInput(stored);
      setCurrentSavedKey(stored);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      removeStoredApiKey();
      setCurrentSavedKey('');
      onKeySaved?.('');
      onClose();
      return;
    }

    setStoredApiKey(trimmed);
    setCurrentSavedKey(trimmed);
    setSavedSuccess(true);
    onKeySaved?.(trimmed);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleRemove = () => {
    removeStoredApiKey();
    setKeyInput('');
    setCurrentSavedKey('');
    onKeySaved?.('');
  };

  const hasKey = Boolean(currentSavedKey);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-slate-800 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 transition-colors cursor-pointer"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-100 to-amber-50 border border-amber-200/60 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
                BYOK SETTINGS
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">クライアント直接通信</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mt-0.5">
              Gemini APIキー設定
            </h3>
          </div>
        </div>

        {/* Notice if prompted by analysis trigger */}
        {initialNotice && (
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/70 text-amber-900 text-sm leading-relaxed flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{initialNotice}</span>
          </div>
        )}

        {/* Description */}
        <div className="text-sm text-slate-600 space-y-2 leading-relaxed bg-slate-50/70 border border-slate-100 rounded-xl p-4">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>完全ローカル＆プライベート設計</span>
          </div>
          <p className="text-xs text-slate-500">
            APIキーはお使いのブラウザ（<code>localStorage</code>）にのみ保存され、外部サーバーや第三者には一切送信されません。Netlify等への静的デプロイ時も完全動作します。
          </p>
        </div>

        {/* Input field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="gemini-key" className="font-bold text-slate-700">
              Gemini API Key
            </label>
            {hasKey ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                登録済み
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                未設定
              </span>
            )}
          </div>

          <div className="relative">
            <input
              id="gemini-key"
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-white/80 border border-slate-200 focus:border-slate-400 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded transition-colors cursor-pointer"
              title={showKey ? 'キーを隠す' : 'キーを表示'}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Key guide link */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              <span>Google AI Studio でAPIキーを無料取得</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            {hasKey && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>キーを削除</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white/80 border border-slate-200 hover:bg-slate-100/70 rounded-xl transition-all cursor-pointer"
            >
              閉じる
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>保存しました</span>
                </>
              ) : (
                <span>設定を保存</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
