'use client';

import React from 'react';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  confirmText = 'Sil',
  cancelText = 'İptal',
  isDeleting = false,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#e8e4da] space-y-5 animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Icon */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-5 top-5 p-1.5 rounded-full text-[#718771] hover:text-[#1c2a1c] hover:bg-[#f3f0e8] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-red-100/80 text-red-600 flex items-center justify-center shadow-xs">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#1c2a1c] tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-[#5d725d] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-[#d8d2c4] hover:bg-[#f6f4ee] text-[#3d503d] text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Siliniyor...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
