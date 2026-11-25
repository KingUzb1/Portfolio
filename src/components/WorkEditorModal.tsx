import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { compressImageToDataUrl } from '../lib/imageUtils';
import { Language, PortfolioWork, WorkCategoryValue } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface WorkEditorModalProps {
  isOpen: boolean;
  editingWork: PortfolioWork | null;
  lang: Language;
  onClose: () => void;
  onSave: (
    payload: Omit<PortfolioWork, 'id' | 'ownerUid' | 'createdAt' | 'updatedAt'>,
    existingId?: string
  ) => Promise<void>;
}

const PRESET_COVERS = [
  {
    label: 'Oracle APEX',
    url: '/src/assets/images/work_oracle_apex_fincube_1795606043059.jpg',
  },
  {
    label: 'Telegram Bot',
    url: '/src/assets/images/work_viloyat_taxi_bot_1795605508416.jpg',
  },
  {
    label: 'iOS Ilova',
    url: '/src/assets/images/work_viloyat_taxi_ios_1795605509223.jpg',
  },
  {
    label: 'AI Avtomatizatsiya',
    url: '/src/assets/images/work_ai_automation_1795605510892.jpg',
  },
  {
    label: 'Ishlab chiqarish',
    url: '/src/assets/images/work_uzbekistan_manufacturing_1795607486044.jpg',
  },
];

export const WorkEditorModal: React.FC<WorkEditorModalProps> = ({
  isOpen,
  editingWork,
  lang,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(editingWork?.title || '');
  const [category, setCategory] = useState<WorkCategoryValue>(editingWork?.category || 'apex');
  const [year, setYear] = useState(editingWork?.year || String(new Date().getFullYear()));
  const [client, setClient] = useState(editingWork?.client || '');
  const [role, setRole] = useState(editingWork?.role || '');
  const [summary, setSummary] = useState(editingWork?.summary || '');
  const [details, setDetails] = useState(editingWork?.details || '');
  const [toolsText, setToolsText] = useState(editingWork?.tools.join(', ') || '');
  const [liveUrl, setLiveUrl] = useState(editingWork?.liveUrl || '');
  const [imageUrl, setImageUrl] = useState(editingWork?.imageUrl || PRESET_COVERS[0].url);
  const [featured, setFeatured] = useState(editingWork?.featured ?? false);
  const [isPublished, setIsPublished] = useState(editingWork?.isPublished ?? true);
  const [compressing, setCompressing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setCompressing(true);
    try {
      const compressed = await compressImageToDataUrl(file);
      setImageUrl(compressed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rasmni yuklashda xatolik');
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 2) {
      setError(lang === 'uz' ? 'Ish nomini kiriting (kamida 2 belgi).' : 'Title is required.');
      return;
    }
    if (summary.trim().length < 4) {
      setError(
        lang === 'uz'
          ? 'Qisqacha tavsif kiriting (kamida 4 belgi).'
          : 'Please enter a short summary.'
      );
      return;
    }
    if (!/^[0-9]{4}(-[0-9]{4})?$/.test(year.trim())) {
      setError(
        lang === 'uz'
          ? 'Yilni to‘g‘ri formatda kiriting (masalan: 2026).'
          : 'Year must be 4 digits (e.g. 2026).'
      );
      return;
    }

    const tools = toolsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);

    setError('');
    setSaving(true);
    try {
      await onSave(
        {
          title: title.trim(),
          category,
          year: year.trim(),
          client: client.trim(),
          role: role.trim(),
          summary: summary.trim(),
          details: details.trim(),
          imageUrl: imageUrl.trim() || PRESET_COVERS[0].url,
          liveUrl: liveUrl.trim(),
          tools,
          featured,
          isPublished,
        },
        editingWork?.id
      );
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : lang === 'uz'
            ? 'Saqlashda xatolik yuz berdi.'
            : 'Failed to save work.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={editingWork ? 'Ishni tahrirlash' : 'Yangi ish joylash'}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF9F6] dark:bg-[#111114] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <h2 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F4F5]">
            {editingWork
              ? lang === 'uz'
                ? 'Ishni tahrirlash'
                : 'Edit Work'
              : lang === 'uz'
                ? 'Yangi ish joylash'
                : 'Post New Work'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'uz' ? 'Yopish' : 'Close'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Loyiha / Ish nomi *' : 'Work Title *'}
              </label>
              <input
                type="text"
                maxLength={140}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'uz' ? 'Masalan, Toshkent Arxitektura Sayti' : 'e.g. Studio Showcase'}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Toifa' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkCategoryValue)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              >
                <option value="apex">Oracle APEX</option>
                <option value="bot">Telegram Bot</option>
                <option value="mobile">{lang === 'uz' ? 'Mobil / iOS' : 'Mobile / iOS'}</option>
                <option value="ai">{lang === 'uz' ? 'AI Avtomatizatsiya' : 'AI Automation'}</option>
                <option value="web">{lang === 'uz' ? 'Veb-sayt' : 'Website'}</option>
                <option value="other">{lang === 'uz' ? 'Boshqa' : 'Other'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Yil *' : 'Year *'}
              </label>
              <input
                type="text"
                maxLength={12}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3.5 py-2.5 text-sm font-mono-tabular rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Mijoz / Brend' : 'Client / Brand'}
              </label>
              <input
                type="text"
                maxLength={100}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder={lang === 'uz' ? 'Shaxsiy yoki mijoz nomi' : 'Client or Personal'}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Vazifangiz' : 'Your Role'}
              </label>
              <input
                type="text"
                maxLength={100}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={lang === 'uz' ? 'Dizayn va Dasturlash' : 'Design & Dev'}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA]">
              {lang === 'uz' ? 'Loyiha rasmi (yuklang yoki havola kiriting)' : 'Cover Image'}
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-[#09090B] text-[#141413] dark:text-[#F4F4F5] hover:border-[#D9381E] cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {compressing
                    ? lang === 'uz'
                      ? 'Tayyorlanmoqda...'
                      : 'Processing...'
                    : lang === 'uz'
                      ? 'Qurilmadan yuklash'
                      : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {PRESET_COVERS.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`px-2.5 py-1.5 text-xs rounded-lg border cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-[#D9381E] text-[#D9381E]'
                      : 'border-black/10 dark:border-white/10 text-[#575652] dark:text-[#A1A1AA]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8">
                <input
                  type="text"
                  value={imageUrl.startsWith('data:') ? '' : imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={
                    imageUrl.startsWith('data:')
                      ? lang === 'uz'
                        ? 'Yuklangan rasm tanlandi (yoki yangi URL kiriting)'
                        : 'Uploaded image selected (or paste URL)'
                      : 'https://...'
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
                />
              </div>
              <div className="sm:col-span-4 h-20 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                <ResilientImage src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
              {lang === 'uz' ? 'Qisqacha tavsif *' : 'Short Summary *'}
            </label>
            <textarea
              rows={2}
              maxLength={500}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={
                lang === 'uz'
                  ? "Kartochkada ko'rinadigan 1-2 gaplik qisqa ta'rif..."
                  : 'Concise 1-2 sentence overview...'
              }
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
              {lang === 'uz' ? 'Batafsil ma‘lumot (ixtiyoriy)' : 'Detailed Notes (optional)'}
            </label>
            <textarea
              rows={3}
              maxLength={2500}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                lang === 'uz'
                  ? "Loyiha maqsadi, qanday yechim qilganingiz va natijalar..."
                  : 'Challenges, architecture, and results...'
              }
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz'
                  ? 'Vositalar (vergul bilan, max 8)'
                  : 'Tools (comma-separated, max 8)'}
              </label>
              <input
                type="text"
                value={toolsText}
                onChange={(e) => setToolsText(e.target.value)}
                placeholder="React, Figma, TypeScript"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Loyiha havolasi (ixtiyoriy)' : 'Live / Behance URL (optional)'}
              </label>
              <input
                type="url"
                maxLength={300}
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-[#141413] dark:text-[#F4F4F5] cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#D9381E]"
              />
              <span>{lang === 'uz' ? "Asosiy (katta) kartochka" : 'Featured wide card'}</span>
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-[#141413] dark:text-[#F4F4F5] cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 accent-[#D9381E]"
              />
              <span>{lang === 'uz' ? "Hamma uchun ochiq (nashr)" : 'Published publicly'}</span>
            </label>
          </div>

          {error && <p className="text-xs font-medium text-[#D9381E]">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium rounded-xl border border-black/10 dark:border-white/10 text-[#575652] dark:text-[#A1A1AA] cursor-pointer"
            >
              {lang === 'uz' ? 'Bekor qilish' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={saving || compressing}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#D9381E] text-white hover:bg-[#B82D16] cursor-pointer disabled:opacity-50"
            >
              {saving
                ? lang === 'uz'
                  ? 'Saqlanmoqda...'
                  : 'Saving...'
                : editingWork
                  ? lang === 'uz'
                    ? "O'zgarishlarni saqlash"
                    : 'Save Changes'
                  : lang === 'uz'
                    ? 'Portfoliyoga joylash'
                    : 'Publish Work'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
