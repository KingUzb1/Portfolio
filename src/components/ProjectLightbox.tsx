import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Pencil, Trash2, X } from 'lucide-react';
import { CATEGORY_LABELS } from '../data/portfolioData';
import { Language, PortfolioWork } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectLightboxProps {
  work: PortfolioWork | null;
  lang: Language;
  isOwner: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onEdit: (work: PortfolioWork) => void;
  onDelete: (id: string) => Promise<void>;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  work,
  lang,
  isOwner,
  onClose,
  onPrev,
  onNext,
  onEdit,
  onDelete,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setConfirmDelete(false);
    setDeleting(false);
  }, [work?.id]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [work, onClose, onPrev, onNext]);

  if (!work) return null;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(work.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF9F6] dark:bg-[#111114] border border-black/10 dark:border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FAF9F6]/95 dark:bg-[#111114]/95 backdrop-blur-md border-b border-black/[0.07] dark:border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#575652] dark:text-[#A1A1AA] truncate">
            <span>{CATEGORY_LABELS[work.category][lang]}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{work.year}</span>
            {work.client && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{work.client}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              aria-label={lang === 'uz' ? 'Oldingi ish' : 'Previous work'}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={lang === 'uz' ? 'Keyingi ish' : 'Next work'}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'uz' ? 'Yopish' : 'Close'}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-[#141413] dark:bg-[#F4F4F5] text-white dark:text-[#09090B] hover:bg-[#D9381E] dark:hover:bg-[#D9381E] dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#E7E4DC] dark:bg-[#18181B]">
            <ResilientImage
              src={work.imageUrl}
              alt={work.title}
              fallbackTitle={work.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5]">
                {work.title}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#4A4945] dark:text-[#B4B4BC]">
                {work.summary}
              </p>

              {work.details && (
                <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <h3 className="text-sm font-semibold text-[#141413] dark:text-[#F4F4F5] mb-2">
                    {lang === 'uz' ? 'Loyiha tafsilotlari' : 'Project Notes'}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#575652] dark:text-[#A1A1AA] whitespace-pre-line">
                    {work.details}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-black/[0.08] dark:border-white/[0.08] lg:pl-6">
              {work.client && (
                <div>
                  <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1">
                    {lang === 'uz' ? 'Mijoz / Buyurtmachi' : 'Client'}
                  </div>
                  <div className="text-sm font-medium text-[#141413] dark:text-[#F4F4F5]">
                    {work.client}
                  </div>
                </div>
              )}

              {work.role && (
                <div>
                  <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1">
                    {lang === 'uz' ? 'Mening vazifam' : 'Role'}
                  </div>
                  <div className="text-sm font-medium text-[#141413] dark:text-[#F4F4F5]">
                    {work.role}
                  </div>
                </div>
              )}

              {work.tools.length > 0 && (
                <div>
                  <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1.5">
                    {lang === 'uz' ? 'Foydalanilgan vositalar' : 'Tools & Stack'}
                  </div>
                  <div className="text-sm text-[#141413] dark:text-[#F4F4F5] leading-relaxed">
                    {work.tools.join(' · ')}
                  </div>
                </div>
              )}

              {work.liveUrl && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#D9381E] hover:bg-[#B82D16] rounded-xl transition-colors"
                >
                  <span>
                    {work.liveUrl.includes('t.me/')
                      ? lang === 'uz'
                        ? 'Telegram botga kirish'
                        : 'Open Telegram Bot'
                      : lang === 'uz'
                        ? 'Loyihani ochish'
                        : 'Open Live Link'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {isOwner && !work.isStarter && (
                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEdit(work);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl border border-black/15 dark:border-white/15 text-[#141413] dark:text-[#F4F4F5] hover:border-[#D9381E] cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>{lang === 'uz' ? 'Ishni tahrirlash' : 'Edit Work'}</span>
                  </button>

                  {!confirmDelete ? (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl border border-[#D9381E]/30 text-[#D9381E] hover:bg-[#D9381E]/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{lang === 'uz' ? "Ishni o'chirish" : 'Delete Work'}</span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl border border-[#D9381E]/30 bg-[#D9381E]/5 space-y-2">
                      <p className="text-xs text-[#141413] dark:text-[#F4F4F5]">
                        {lang === 'uz'
                          ? "Rostdan ham ushbu ishni o'chirmoqchimisiz?"
                          : 'Delete this work permanently?'}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={deleting}
                          onClick={handleConfirmDelete}
                          className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#D9381E] text-white cursor-pointer disabled:opacity-50"
                        >
                          {deleting
                            ? lang === 'uz'
                              ? "O'chirilmoqda..."
                              : 'Deleting...'
                            : lang === 'uz'
                              ? "Ha, o'chirish"
                              : 'Confirm'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(false)}
                          className="flex-1 py-2 text-xs font-medium rounded-lg border border-black/10 dark:border-white/10 cursor-pointer"
                        >
                          {lang === 'uz' ? 'Bekor' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
