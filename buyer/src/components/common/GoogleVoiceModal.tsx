"use client";
import React from "react";
import { Mic, X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface GoogleVoiceModalProps {
  isOpen: boolean;
  isListening: boolean;
  transcript: string;
  status: "listening" | "processing" | "found" | "not_found";
  foundCount: number | null;
  onClose: () => void;
  onRetry: () => void;
}

export default function GoogleVoiceModal({
  isOpen,
  isListening,
  transcript,
  status,
  foundCount,
  onClose,
  onRetry,
}: GoogleVoiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      <div className="relative w-[90%] max-w-lg overflow-hidden rounded-3xl bg-[#18181b] border border-white/10 p-8 text-center shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Central Voice Avatar with Pulsing Rings */}
        <div className="relative mx-auto my-6 flex items-center justify-center w-28 h-28">
          {status === "listening" && (
            <>
              <div className="absolute inset-0 rounded-full bg-blue/20 animate-ping" />
              <div className="absolute -inset-3 rounded-full bg-indigo-500/10 animate-pulse" />
            </>
          )}

          <div
            onClick={status === "not_found" ? onRetry : undefined}
            className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-500 shadow-xl ${
              status === "listening"
                ? "bg-gradient-to-tr from-blue to-indigo-600 shadow-blue/50 scale-105"
                : status === "processing"
                ? "bg-indigo-700"
                : status === "found"
                ? "bg-emerald-600 shadow-emerald-500/50"
                : "bg-red-600/80 cursor-pointer hover:scale-105"
            }`}
          >
            {status === "listening" ? (
              <Mic className="w-10 h-10 text-white animate-bounce" />
            ) : status === "processing" ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : status === "found" ? (
              <CheckCircle2 className="w-11 h-11 text-white" />
            ) : (
              <AlertCircle className="w-10 h-10 text-white" />
            )}
          </div>
        </div>

        {/* Status Text Header */}
        <h3 className="text-xl font-semibold text-white tracking-wide">
          {status === "listening"
            ? "Listening..."
            : status === "processing"
            ? "Searching properties..."
            : status === "found"
            ? `Found ${foundCount} ${foundCount === 1 ? 'Property' : 'Properties'}!`
            : "No properties found"}
        </h3>

        {/* Dynamic Spoken Transcript Box */}
        <div className="mt-4 min-h-[60px] rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4 text-center">
          {transcript ? (
            <p className="text-base text-gray-200 font-medium leading-relaxed">
              "{transcript}"
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Say something like "Flats in Gurugram"...
            </p>
          )}
        </div>

        {/* Status Subtitle / Action */}
        <div className="mt-6 flex flex-col items-center justify-center">
          {status === "listening" && (
            <div className="flex items-center gap-1.5 h-6">
              <span className="w-1 h-3 bg-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-6 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-4 bg-violet-400 rounded-full animate-bounce" />
              <span className="w-1 h-7 bg-blue rounded-full animate-bounce [animation-delay:-0.2s]" />
              <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" />
            </div>
          )}

          {status === "found" && (
            <p className="text-sm text-emerald-400 font-medium animate-pulse">
              Redirecting to property listing page...
            </p>
          )}

          {status === "not_found" && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-gray-400">
                We couldn't find matches for this query. Try again with broader terms.
              </p>
              <button
                onClick={onRetry}
                className="mt-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
              >
                Tap to try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}