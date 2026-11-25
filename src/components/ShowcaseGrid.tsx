import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Inbox, Pencil, Plus, Search, Settings2, Sparkles } from 'lucide-react';
import { CATEGORY_LABELS } from '../data/portfolioData';
import { Language, PortfolioWork, WorkCategory } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface ShowcaseGridProps {
  works: PortfolioWork[];
  lang: Language;
  isOwner: boolean;
  isLoading: boolean;
  hasFirestoreWorks: boolean;
  unreadMessagesCount: number;
  onSelectWork: (work: PortfolioWork) => void;
  onCreateWork: () => void;
  onEditWork: (work: PortfolioWork) => void;
  onOpenProfileEditor: () => void;
  onOpenMessages: () => void;
  onImportStarters: () => Promise<void>;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({
  works,
  lang,
  isOwner,
  isLoading,
  hasFirestoreWorks,
  unreadMessagesCount,
  onSelectWork,
  onCreateWork,
  onEditWork,
  onOpenProfileEditor,
  onOpenMessages,
  onImportStarters,
}) => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [importing, setImporting] = useState(false);

  const categories: { id: WorkCategory; label: string }[] =
    lang === 'uz'
      ? [
          { id: 'all', label: 'Barchasi' },
          { id: 'apex', label: 'Oracle APEX' },
          { id: 'bot', label: 'Telegram Botlar' },
          { id: 'mobile', label: 'Mobil / iOS' },
          { id: 'ai', label: 'AI Avtomatizatsiya' },
          { id: 'other', label: 'Yangiliklar / Boshqa' },
        ]
      : [
          { id: 'all', label: 'All' },
          { id: 'apex', label: 'Oracle APEX' },
          { id: 'bot', label: 'Telegram Bots' },
          { id: 'mobile', label: 'Mobile / iOS' },
          { id: 'ai', label: 'AI Automation' },
          { id: 'other', label: 'Upcoming / Other' },
        ];

  const filteredWorks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return works.filter((w) => {
      if (activeCategory !== 'all' && w.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = `${w.title} ${w.client} ${w.summary} ${w.tools.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [works, activeCategory, searchQuery]);

  const handleImport = async () => {
    setImporting(true);
    try {
      await onImportStarters();
    } finally {
      setImporting(false);
    }
  };

  return (
    <section id="ishlar" className="py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Owner Management Toolbar (Visible only when verified owner is signed in) */}
        {isOwner && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#F3F1EC] dark:bg-[#131316] border border-black/[0.08] dark:border-white/[0.1] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#D9381E] mb-1">
                {lang === 'uz' ? 'Muallif boshqaruv paneli' : 'Owner Studio Controls'}
              </p>
              <p className="text-sm text-[#4A4945] dark:text-[#B4B4BC]">
                {hasFirestoreWorks
                  ? lang === 'uz'
                    ? "Yangi ishlarni joylang, mavjudlarini tahrirlang yoki kelgan xabarlarni o'qing."
                    : 'Publish new works, edit existing entries, or check visitor messages.'
                  : lang === 'uz'
                    ? "Hozircha bazangiz bo'sh (namuna ishlar ko'rsatilmoqda). O'z ishingizni qo'shing yoki namunalarni bazaga saqlang."
                    : 'Your database is currently empty (starter examples shown). Post your first work or import starters.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onCreateWork}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#D9381E] hover:bg-[#B82D16] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'uz' ? 'Yangi ish joylash' : 'Post New Work'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenProfileEditor}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#09090B] text-[#141413] dark:text-[#F4F4F5] hover:border-[#D9381E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Settings2 className="w-4 h-4" />
                <span>{lang === 'uz' ? 'Profil' : 'Profile'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenMessages}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#09090B] text-[#141413] dark:text-[#F4F4F5] hover:border-[#D9381E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Inbox className="w-4 h-4" />
                <span className="font-mono-tabular">
                  {lang === 'uz' ? `Xabarlar (${unreadMessagesCount})` : `Inbox (${unreadMessagesCount})`}
                </span>
              </button>

              {!hasFirestoreWorks && (
                <button
                  type="button"
                  disabled={importing}
                  onClick={handleImport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-black/15 dark:border-white/15 text-[#575652] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {importing
                      ? lang === 'uz'
                        ? 'Yuklanmoqda...'
                        : 'Importing...'
                      : lang === 'uz'
                        ? 'Namunalarni saqlash'
                        : 'Save Starters'}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Section Heading + Filters & Search */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-[#D9381E] mb-2">
                {lang === 'uz' ? 'Portfoliyo va Loyihalar' : 'Portfolio Showcase'}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5]"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'uz'
                  ? 'Bajarilgan ishlar va joriy loyihalar'
                  : 'Completed works & active projects'}
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                className="w-4 h-4 text-[#6B6A65] dark:text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'uz' ? "Ish yoki vosita bo'yicha qidirish..." : 'Search works or tools...'}
                aria-label={lang === 'uz' ? "Ishlarni qidirish" : 'Search works'}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#F3F1EC] dark:bg-[#131316] border border-black/[0.08] dark:border-white/[0.1] text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label={lang === 'uz' ? 'Ish toifalari' : 'Work categories'}
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFECE5] dark:bg-[#141417] rounded-xl border border-black/[0.06] dark:border-white/[0.08]"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-[#27272A] text-[#141413] dark:text-[#F4F4F5] shadow-xs'
                        : 'text-[#575652] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F4F5]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono-tabular text-xs text-[#6B6A65] dark:text-[#A1A1AA]">
              {lang === 'uz'
                ? `${filteredWorks.length} ta ish ko'rsatilmoqda`
                : `Showing ${filteredWorks.length} works`}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl overflow-hidden bg-[#F3F1EC] dark:bg-[#131316] border border-black/[0.07] dark:border-white/[0.08] animate-pulse"
              >
                <div className="aspect-[4/3] bg-black/5 dark:bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-32 bg-black/10 dark:bg-white/10 rounded" />
                  <div className="h-6 w-3/4 bg-black/10 dark:bg-white/10 rounded" />
                  <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#F3F1EC] dark:bg-[#111114]">
            <p className="text-base font-medium text-[#141413] dark:text-[#F4F4F5] mb-3">
              {lang === 'uz'
                ? "Ushbu bo'lim yoki so'rov bo'yicha ish topilmadi."
                : 'No works match your current filter or search.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-sm font-medium text-[#D9381E] hover:underline cursor-pointer"
            >
              {lang === 'uz' ? "Filtrni tozalash" : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work, index) => {
              const isHeroTile =
                activeCategory === 'all' &&
                !searchQuery.trim() &&
                index === 0 &&
                (work.featured || filteredWorks.length >= 3);

              return (
                <article
                  key={work.id}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[#F3F1EC] dark:bg-[#131316] border border-black/[0.07] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-colors duration-200 ${
                    isHeroTile ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectWork(work)}
                    className="text-left w-full flex flex-col flex-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9381E]"
                  >
                    <div
                      className={`w-full overflow-hidden bg-[#E7E4DC] dark:bg-[#18181B] ${
                        isHeroTile ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={work.imageUrl}
                        alt={work.title}
                        fallbackTitle={work.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-2">
                          <span>{CATEGORY_LABELS[work.category][lang]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{work.year}</span>
                          {work.client && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="truncate max-w-[180px]">{work.client}</span>
                            </>
                          )}
                          {!work.isPublished && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#D9381E] font-medium">
                                {lang === 'uz' ? 'Qoralama' : 'Draft'}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#141413] dark:text-[#F4F4F5] group-hover:text-[#D9381E] transition-colors duration-150">
                            {work.title}
                          </h3>
                          <ArrowUpRight
                            className="w-5 h-5 text-[#6B6A65] dark:text-[#A1A1AA] group-hover:text-[#D9381E] shrink-0 mt-1 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="mt-2.5 text-sm leading-relaxed text-[#575652] dark:text-[#A1A1AA] line-clamp-2">
                          {work.summary}
                        </p>
                      </div>
                    </div>
                  </button>

                  {(work.tools.length > 0 || work.liveUrl) && (
                    <div className="px-6 pb-5 pt-3 border-t border-black/[0.06] dark:border-white/[0.07] flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#6B6A65] dark:text-[#A1A1AA] truncate">
                        {work.tools.join(' · ')}
                      </span>

                      {work.liveUrl && (
                        <a
                          href={work.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#D9381E] hover:underline whitespace-nowrap shrink-0"
                        >
                          <span>
                            {work.liveUrl.includes('t.me/')
                              ? lang === 'uz'
                                ? 'Telegram botga kirish'
                                : 'Open Telegram Bot'
                              : lang === 'uz'
                                ? 'Ochish'
                                : 'Open'}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}

                  {isOwner && !work.isStarter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditWork(work);
                      }}
                      aria-label={lang === 'uz' ? `${work.title} ni tahrirlash` : `Edit ${work.title}`}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF9F6]/95 dark:bg-[#09090B]/95 text-[#141413] dark:text-[#F4F4F5] border border-black/15 dark:border-white/15 hover:border-[#D9381E] hover:text-[#D9381E] transition-colors cursor-pointer shadow-sm"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>{lang === 'uz' ? 'Tahrirlash' : 'Edit'}</span>
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
