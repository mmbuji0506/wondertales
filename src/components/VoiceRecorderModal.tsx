import React, { useEffect, useRef, useState } from "react";
import { ChildrenStoryPage } from "../data/childrenStories";
import { playChimeSound, playSparkleSound, playFanfareSound } from "../services/soundEffects";

interface VoiceRecorderModalProps {
  page: ChildrenStoryPage;
  storyTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveRecording: (pageNumber: number, audioUrl: string) => void;
  existingAudioUrl?: string;
}

export const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({
  page,
  storyTitle,
  isOpen,
  onClose,
  onSaveRecording,
  existingAudioUrl,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(existingAudioUrl || null);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (existingAudioUrl) {
      setRecordedUrl(existingAudioUrl);
    }
  }, [existingAudioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  const startRecording = async () => {
    setErrorMsg(null);
    audioChunksRef.current = [];
    setRecordSeconds(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMsg("Microphone access is not supported by your current browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);
        playFanfareSound();
        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      playChimeSound(659);
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch (err: any) {
      console.warn("Recording error:", err);
      setErrorMsg("Please allow microphone permissions to record your own story voice!");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayRecording = () => {
    if (!recordedUrl) return;

    if (isPlaying && audioElRef.current) {
      audioElRef.current.pause();
      setIsPlaying(false);
      return;
    }

    playSparkleSound();
    const el = new Audio(recordedUrl);
    audioElRef.current = el;
    el.onended = () => setIsPlaying(false);
    el.onerror = () => setIsPlaying(false);
    el.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleApplyVoice = () => {
    if (!recordedUrl) return;
    playFanfareSound();
    onSaveRecording(page.pageNumber, recordedUrl);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] text-center"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎙️</span>
            <div className="text-left">
              <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#78350F]">
                Record Your Own Story Voice
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Parents or kids can record page {page.pageNumber}!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Read Prompt Script Box */}
        <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 mb-5 text-left max-h-48 overflow-y-auto shadow-inner">
          <span className="text-[10px] font-['Fredoka'] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Story Text to Read:
          </span>
          <p className="font-['EB_Garamond'] text-stone-900 text-base sm:text-lg leading-relaxed">
            {page.narrativeText}
          </p>
        </div>

        {/* Record Controls */}
        <div className="flex flex-col items-center justify-center gap-3 my-4">
          {isRecording ? (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg ring-4 ring-red-300 animate-pulse cursor-pointer transition-all active:scale-95 text-2xl"
              >
                ⏹️
              </button>
              <span className="font-['Fredoka'] font-bold text-red-600 text-sm animate-pulse">
                Recording... {recordSeconds}s (Tap to Finish)
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white flex items-center justify-center shadow-lg ring-4 ring-amber-300 cursor-pointer transition-all active:scale-95 text-3xl"
              >
                🎙️
              </button>
              <span className="font-['Fredoka'] font-bold text-amber-900 text-sm">
                Tap to Start Recording Voice
              </span>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs font-['Fredoka'] text-red-600 bg-red-50 p-2 rounded-xl border border-red-200">
              {errorMsg}
            </p>
          )}
        </div>

        {/* Playback & Save actions */}
        {recordedUrl && !isRecording && (
          <div className="mt-4 pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handlePlayRecording}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-['Fredoka'] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{isPlaying ? "⏸ Pause" : "▶ Listen to My Voice"}</span>
            </button>

            <button
              onClick={handleApplyVoice}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-green-600 hover:bg-green-700 active:scale-95 text-white font-['Fredoka'] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>⭐ Save As Story Voice</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
