import React from 'react';
import { Check, Trash2, X } from 'lucide-react';
import { Language, VisitorMessage } from '../types/portfolio';

interface MessagesDrawerProps {
  isOpen: boolean;
  messages: VisitorMessage[];
  lang: Language;
  onClose: () => void;
  onToggleRead: (id: string, isRead: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const MessagesDrawer: React.FC<MessagesDrawerProps> = ({
  isOpen,
  messages,
  lang,
  onClose,
  onToggleRead,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'uz' ? 'Kelgan xabarlar' : 'Visitor Messages'}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FAF9F6] dark:bg-[#111114] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div>
            <h2 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F4F5]">
              {lang === 'uz' ? 'Kelgan xabarlar' : 'Visitor Messages'}
            </h2>
            <p className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mt-0.5">
              {lang === 'uz'
                ? 'Saytingizdagi aloqa formasi orqali yuborilgan xabarlar'
                : 'Messages sent through your public portfolio form'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'uz' ? 'Yopish' : 'Close'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {messages.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#6B6A65] dark:text-[#A1A1AA]">
              {lang === 'uz' ? "Hozircha xabarlar yo'q." : 'No messages yet.'}
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 sm:p-5 rounded-xl border ${
                  msg.isRead
                    ? 'bg-white/60 dark:bg-[#09090B]/60 border-black/[0.07] dark:border-white/[0.07]'
                    : 'bg-white dark:bg-[#16161A] border-black/20 dark:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#141413] dark:text-[#F4F4F5]">
                      {msg.senderName}
                      {!msg.isRead && (
                        <span className="ml-2 text-xs font-medium text-[#D9381E]">
                          · {lang === 'uz' ? 'Yangi' : 'New'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono-tabular text-[#6B6A65] dark:text-[#A1A1AA] mt-0.5">
                      {msg.senderContact}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleRead(msg.id, !msg.isRead)}
                      title={msg.isRead ? 'O‘qilmagan qilish' : 'O‘qilgan deb belgilash'}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#575652] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F4F5] cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(msg.id)}
                      title={lang === 'uz' ? "O'chirish" : 'Delete'}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#D9381E] hover:bg-[#D9381E]/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#353430] dark:text-[#D4D4D8] whitespace-pre-line">
                  {msg.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
